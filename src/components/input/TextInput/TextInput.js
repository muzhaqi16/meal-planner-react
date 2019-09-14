import React from 'react';
import PropTypes from 'prop-types';
import './TextInput.css'
export default class TextInput extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="input">
                <label for={this.props.inputId}>{this.props.label}</label>
                <input type={this.props.type} name={this.props.inputId} id={this.props.inputId}></input>
            </div>
        )
    }
}
TextInput.propTypes = {
    label: PropTypes.string,
    inputId: PropTypes.string,
    type: PropTypes.string
}
TextInput.defaultProps = {
    label: 'Label',
    inputId: 'defaultInput',
    type: 'text'
}