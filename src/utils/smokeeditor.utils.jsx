import React from 'react'
import ReactDOM from 'react-dom'
import SmokeEditor from '../SmokeEditor.jsx'
import plugins from '../plugins/default.jsx'

// Export component as function
function SmokeEditorRender(element, config) {

    // @todo: validar ACA -> ver "playControls" (hudson/js/components)
    var textarea = element.querySelector('textarea');
    var defaultValue = (typeof textarea.value === 'undefined') ? '' : textarea.value ;
    ReactDOM.render(
        <SmokeEditor
            config={config}
            plugins={plugins}
            targetElement={element}
            defaultValue={defaultValue}
        />,
        element
    );
}
window.SmokeEditorRender = SmokeEditorRender;



