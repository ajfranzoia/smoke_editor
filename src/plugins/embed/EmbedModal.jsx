import React, {PropTypes} from 'react';
import {insertDataBlock} from "megadraft";
import {ModalDialog, ModalContainer} from 'react-modal-dialog';
import SocialEmbed from '../../Helpers/SocialEmbed';
import Errors from '../../Helpers/ErrorMessages';


export default class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingModal: this.props.isShowingModal,
            isFocused: false,
            message: {status: 'info', text: Errors.message.embed.info}
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isShowingModal: nextProps.isShowingModal
        });
    }

    addData = (dataObj) => {
        const data = {data: dataObj.data, type: 'embed', dataType: dataObj.type};
        this.props.onChange(insertDataBlock(this.props.editorState, data));
    };

    saveData = (e) => {
        if (this.state.message.status === 'success' || 'warning' ) {
            this.addData(SocialEmbed.createDataObject(this.textarea.value));
            this.handleClose(e);
        }
    };

    handleClose = () => {
        this.setState({isShowingModal: false});
        this.setState({message: {status: 'info', text: Errors.message.embed.info}});
        this.props.closeModal();
        this.setState({isFocused: false});
    };

    handleChange = (e) => {
        this.validate();
    };

    validate = () => {
        if (this.textarea.value !== '') {
            this.setState({message: SocialEmbed.socialEmbedValidator(this.textarea.value)})
        } else {
            this.setState({message:{status: 'info', text: Errors.message.embed.info}})
        }
    };

    componentDidUpdate(){
        if(this.state.isShowingModal && this.state.isFocused === false) {
            this.setFocus();
        }
    }

    setFocus = () => {
        this.textarea.focus();
        this.textarea.select();
        this.setState({isFocused: true});
    };

    handleBlur = (e) => {
        this.setState({isFocused: true});
    };

    render() {
        return <div className="modal-wrapper">
            {
                this.state.isShowingModal &&
                <ModalContainer onClose={this.handleClose}>
                    <ModalDialog className="modal-dialog" onClose={this.handleClose}>
                        <div className={'alert alert-' + this.state.message.status} role="alert"
                             dangerouslySetInnerHTML={{__html: this.state.message.text}}>
                        </div>
                        <textarea onChange={this.handleChange} onBlur={this.handleBlur}
                                  className="form-control form-text" ref={(ref) => this.textarea = ref} rows="10"
                                  cols="60"/>
                        <div className="form-actions">
                            <button className="btn btn-primary form-submit" onClick={this.saveData}>Aceptar</button>
                        </div>
                    </ModalDialog>
                </ModalContainer>
            }
        </div>;
    }
}