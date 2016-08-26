import React from 'react';
import Modal from 'tg-modal';

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            answer: 'GIMME',
            isOpen: true
        };
    }

    static open = () => {
       <App isOpen={true} />
    }

    onConfirm = () => {
        this.setState({
            answer: 'GIMME',
            isOpen: false
        });
    };

    onCancel = () => {
        this.setState({
            answer: 'DO NOT WANT',
            isOpen: false
        });
    };

    render() {
        return (
            <Modal isOpen={true} title={this.props.title} onCancel={this.onCancel} onConfirm={this.onConfirm} isStatic>
                <textarea>
                    hola mundo
                </textarea>
            </Modal>
        )
    }
}
