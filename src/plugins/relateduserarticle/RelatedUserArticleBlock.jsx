import React, {Component} from 'react';
import { Modifier, EditorState, convertToRaw, RichUtils, SelectionState } from 'draft-js';
import ImageBlock from '../image/ImageBlock';
import RelatedUserArticleVideo from './RelatedUserArticleVideo';

/**
 * Related UserArticle block for the editor.
 * If the article has an image, it will be shown.
 * Otherwise, if it contains a video, a placeholder will be displayed.
 */
export default class RelatedUserArticleBlock extends Component {

    render() {
        const article = this.props.data.article;

        return (
            <div className="related-userarticle-block" style={{position: 'relative'}}>
                <div className="related-userarticle-block-indicator">
                    Contenido de nota de TN y la Gente (#{ article.nid })
                </div>
                {
                    article.image ?
                        <ImageBlock {...this.props} data={{src: article.image}} /> :
                        <RelatedUserArticleVideo {...this.props} />
                }
            </div>
        );
    }
}