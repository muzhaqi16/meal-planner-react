import React from 'react';
import PropTypes from 'prop-types';
import './TextInput.css'
export default class TextInput extends React.Component {
    render() {
        return (
            <div className="input">
                <label for={this.props.inputId}>{this.props.label}</label>
                <input type={this.props.type} placeholder={this.props.placeholder} name={this.props.inputId} id={this.props.inputId}></input>
            </div>
        )
    }
}
TextInput.propTypes = {
    label: PropTypes.string,
    inputId: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string
}
TextInput.defaultProps = {
    label: 'Label',
    inputId: 'defaultInput',
    type: 'text',
    placeholder: ''
}