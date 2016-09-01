import React, {PropTypes} from 'react';
import {insertDataBlock} from "megadraft";
import {ModalDialog} from 'react-modal-dialog';
import ModalContainer from './SmokeModalContainer';

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

    handleClick = (e) => {
        this.addData(this.textarea.value);
        this.handleClose(e);

    }

    handleClose = (e) => {
        this.setState({isShowingModal: false})
        this.props.closeModal(e);
    }

    render() {
        return <div onClick={this.handleClick}>
            {
                this.state.isShowingModal &&
                <ModalContainer onClose={this.handleClose}>
                    <ModalDialog onClose={this.handleClose}>
                        <h3 className="modal-title">Embeber Twitter</h3>
                        <textarea placeholder="Pegá acá el código de inserción de Twitter" className="form-control form-text" ref={(ref) => this.textarea = ref} rows="15" cols="75" />
                        <div className="form-actions">
                            <button className="btn btn-primary form-submit" onClick={this.handleClick}>Aceptar</button>
                        </div>
                    </ModalDialog>
                </ModalContainer>
            }
        </div>;
    }
}