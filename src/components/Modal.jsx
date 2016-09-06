import React, {PropTypes} from 'react';
import {insertDataBlock} from "megadraft";
import {ModalDialog} from 'react-modal-dialog';
import ModalContainer from './SmokeModalContainer';
import socialEmbed from '../Helpers/socialEmbed';

export default class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingModal: this.props.isShowingModal
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isShowingModal: nextProps.isShowingModal
        });
    }

    addData = (content) => {
        const data = {content: content, type: "twitter", display: "small"};
        this.props.onChange(insertDataBlock(this.props.editorState, data));

    }

    saveData = (e) => {
        this.addData(this.textarea.value);
        this.handleClose(e);
    }

    handleClose = (e) => {
        this.setState({isShowingModal: false})
        this.props.closeModal(e);
    }

    handleChange = (e) =>{
        //console.log('this ->', this.textarea.value);
        socialEmbed.matchSocialEmbed(this.textarea.value);
        // @todo: set the "type" with the matched embed
    }

    render() {
        return <div className="modal-wrapper">
            {
                this.state.isShowingModal &&
                <ModalContainer onClose={this.handleClose}>
                    <ModalDialog onClose={this.handleClose}>
                        <h3 className="modal-title">{this.props.title}</h3>
                        <textarea onChange={this.handleChange} placeholder="Pegá acá el código de inserción de Twitter" className="form-control form-text" ref={(ref) => this.textarea = ref} rows="15" cols="75" />
                        <div className="form-actions">
                            <button className="btn btn-primary form-submit" onClick={this.saveData}>Aceptar</button>
                        </div>
                    </ModalDialog>
                </ModalContainer>
            }
        </div>;
    }
}