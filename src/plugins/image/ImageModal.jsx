import React, {PropTypes} from 'react';
import {insertDataBlock} from "megadraft";
import {ModalDialog, ModalContainer} from 'react-modal-dialog';
import ReactResumableJs from 'react-resumable-js'


export default class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingModal: this.props.isShowingModal,
            message: {status: 'info', text: 'Seleccioná una imágen'},
            file:{}
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isShowingModal: nextProps.isShowingModal
        });
    }

    addData = (dataObj) => {
        const data = {filename: dataObj.data, type: dataObj.type, dataType: dataObj.type, src:'http://localhost:3000/tmp/' +dataObj.data};
        this.props.onChange(insertDataBlock(this.props.editorState, data));
    };

    saveData = (e) => {
        const file = this.state.file;
        let data = {data:file.fileName , type: 'image'};
        if (this.state.message.status == 'success') {
            this.addData(data);
            this.handleClose(e);
        }
    };

    handleClose = (e) => {
        this.setState({isShowingModal: false});
        this.setState({message: {status: 'info', text: 'Seleccioná una imágen'}});
        this.props.closeModal(e);
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
                        <ReactResumableJs
                            uploaderID="image-upload"
                            dropTargetID="myDropTarget"
                            filetypes={["jpg", "JPG", "png", "PNG"]}
                            maxFileSize={512000000}
                            fileAccept="*/*"
                            fileAddedMessage="Started!"
                            completedMessage="Complete!"
                            service="http://localhost:3000/upload"
                            disableDragAndDrop={true}
                            onFileSuccess={(file, message) => {
                                this.setState({message: {status: 'success',text: 'Imagen seleccionada: <b>' + file.file.name + '</b>'}});
                                this.setState({file: file});
                            }}
                            onFileAdded={(file, resumable) => {
                                resumable.upload();
                            }}
                            onFileRemoved={(file) => {
                                this.setState({message: {status: 'info', text: 'Seleccioná una imágen'}});
                            }}
                            onMaxFileSizeErrorCallback={(file, errorCount) => {
                                console.log('Error! Max file size reached: ', file);
                                console.log('errorCount: ', errorCount);
                            }}
                            fileNameServer="file"
                            tmpDir="http://localhost:3000/tmp/"
                            maxFiles={1}
                        />
                        <div className="form-actions">
                            <button className="btn btn-primary form-submit" onClick={this.saveData}>Aceptar</button>
                        </div>
                    </ModalDialog>
                </ModalContainer>
            }
        </div>;
    }
}