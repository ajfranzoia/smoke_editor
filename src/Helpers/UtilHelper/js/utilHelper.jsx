/**
 * Created by Gonzalo Rubino - ( gonzalo_rubino@artear.com ) on 13/06/16.
 */

/*
 * Different helpers for the project.
 *
 * */
import _ from 'lodash'


export default class UtilsHelper {
  /* Test if the constructor gets what it need
  *
  * @param {Object} element The dom element to test
  * @param {Array} required the required elements to test against the element
  * @param {Function} a callback to call, when the assert is correct
  * */
  static constructAssert (element, required, callback){

    // The promise that will be returned

    try {
      // Does have an element, and this is HTML ?
      if(element && element.nodeType == 1){
        var arr = [];
        var assertArr = [];

        // Get all the attributes of the element
        _.each(element.attributes,function(e){
          arr.push(e.name)});

        // Check which elements of "required" are in "attributes" array
        _.each(required,function(e){
          if (arr.indexOf(e) > -1){
            assertArr.push(e)
          }
        });

        // if everything is right, required and assert will have the same length
        if (required.length == assertArr.length){
          callback()
        } else {
          throw element + " it doesn't have what is required to construct his Class"
        }
      } else {
        throw element + " is empty or is not an DOM element"
      }
    } catch (e) {
      Bugsnag.notify(e);
      throw new Error(e);
    }

  };

};