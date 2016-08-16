import React, {Component} from "react";

export default class StyleButton extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.props.plugin.style;
        this.label = this.props.plugin.label;
    }

    toggleStyle = (e) => {
        e.preventDefault();
        this.props.onClick(this.style);
    }

    render() {
        return (
            <span className="RichEditor-styleButton" onMouseDown={this.toggleStyle}>{this.label}</span>
        );
    }

}