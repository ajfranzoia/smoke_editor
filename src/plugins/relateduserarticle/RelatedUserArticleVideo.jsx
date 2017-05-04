import React from 'react';
import { MegadraftPlugin } from 'megadraft';
import icons from '../../icons/icons';

/**
 * Dummy component that shows a Kaltura video placeholder
 */
export default function RelatedUserArticleVideo(props) {
    const actions = [
        {
            'key': 'delete',
            'icon': icons.DeleteIcon,
            'action': props.container.remove
        }
    ];

    return (
        <MegadraftPlugin.CommonBlock {...props} actions={actions}>
            <div className="smoke-block smoke-kaltura" />
        </MegadraftPlugin.CommonBlock>
    );
}