import React from 'react';
import PropTypes from 'prop-types';
import './TextInput.css'
export default class TextInput extends React.Component {
    render() {
        return (
            <div className="input">
                <label htmlFor={this.props.inputId}>{this.props.label}</label>
                <input type={this.props.type} placeholder={this.props.placeholder} name={this.props.inputId} id={this.props.id}></input>
            </div>
        )
    }
}
TextInput.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string
}
TextInput.defaultProps = {
    label: 'Label',
    id: 'defaultInput',
    type: 'text',
    placeholder: ''
}