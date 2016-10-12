import React, {PropTypes} from 'react';
import {insertDataBlock} from "megadraft";
import {ModalDialog, ModalContainer} from 'react-modal-dialog';
import socialEmbed from '../../Helpers/SocialEmbed';


export default class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingModal: this.props.isShowingModal,
            message: {status: 'info', text: 'Inserte código del embebido'}
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
        if (this.state.message.status == 'success') {
            this.addData(socialEmbed.createDataObject(this.textarea.value));
            this.handleClose(e);
        }
    };

    handleClose = (e) => {
        this.setState({isShowingModal: false});
        this.setState({message: {status: 'info', text: 'Inserte código del embebido'}});
        this.props.closeModal(e);
    };

    handleChange = (e) => {
        this.validate();
    };

    validate = () => {
        if (this.textarea.value != '') {
            this.setState({message: socialEmbed.socialEmbedValidator(this.textarea.value)})
        } else {
            this.setState({message:{status: 'info', text: 'Inserte código del embebido'}})
        }
    }

    render() {
        return <div className="modal-wrapper">
            {
                this.state.isShowingModal &&
                <ModalContainer onClose={this.handleClose}>
                    <ModalDialog className="modal-dialog" onClose={this.handleClose}>
                        <div className={'alert alert-' + this.state.message.status} role="alert"
                             dangerouslySetInnerHTML={{__html: this.state.message.text}}>
                        </div>
                        <textarea onChange={this.handleChange}
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