/**
 * Created by Gonzalo Rubino - ( gonzalo_rubino@artear.com ) on 1/6/16.
 */

/*
* Library to encapsulate the Async load of resources
*
* */

import axios from 'axios'

export default class AsyncHelper {

    /*
    * Load file as async
    *
    * @param url {String} The url that will be requested
    * @param callback {Function} The function to use as a callback (when promise is completed)
    *
    * @returns {Promise} returns a promise. Use a .then as a callback
    *
    * */
    static loadFile (url) {
        // We will cache the url's already loaded in window object
        if (window.AsyncCache === undefined){
            window.AsyncCache = [];
        }
        // Already there?
        if (window.AsyncCache.indexOf(url) >= 0) {
            return Promise.resolve('already cached');
        }

        axios.interceptors.response.use(function (response) {
            var scriptTag = document.createElement('script');

            // Cache the URL called
            window.AsyncCache.push(response.responseURL);

            // Create the script tag, with the response in there
            scriptTag.type = 'text/javascript';
            scriptTag.textContent = response.data.toString();
            document.getElementsByTagName('head')[0].appendChild(scriptTag);

            // Return a promise, so we can use a Then
            return Promise.resolve(response);

        }, function (error) {
            if (error instanceof Error){
                // Oh my... CORS is not supported on remote site, maybe... Let's return a Promise anyway
                var fallback = new Promise(function(resolve, reject) {

                    var expire = new Date().getTime() + 90000; // 20 seconds

                    // Call Fallback
                    AsyncHelper.fallbackScript(url);

                    // Let's check that script is loaded
                    function lookForSymbol() {
                        if (window.AsyncCache.indexOf(url) >= 0) {
                            // There's the url loaded, we're done
                            resolve();
                        } else if (new Date().getTime() > expire) { // We ran out of time
                            // Timed out, tell the callback
                            console.log('fallback fail')
                            reject();
                        } else {
                            // Schedule the next check
                            setTimeout(lookForSymbol, 100);
                            }
                    }

                    setTimeout(lookForSymbol, 0);

                });
                return fallback;
            }
        });

        return axios.get(url, {responseType: 'text'});
    };

    /*
    *  Fallback for async load
    *  
    *  @param url {String} the url to hit with the fallback
    *  @return a Promise
    * */
    static fallbackScript (url) {
        var script;

        // Load the script
        script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        // when it's loaded, just push the url, so we can fire an event or promise
        script.onload = function() { window.AsyncCache.push(url); };

        document.body.appendChild(script);
    };
}