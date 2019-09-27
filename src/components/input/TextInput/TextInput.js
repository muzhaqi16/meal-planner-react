import React from 'react';
import PropTypes from 'prop-types';
import './TextInput.css'
export default class TextInput extends React.Component {
    render() {
        let value = this.props.value !== '' ? <input
            type={this.props.type}
            placeholder={this.props.placeholder}
            name={this.props.inputId} value={this.props.value}
            id={this.props.id}
            onChange={this.props.onChange} />
            : <input
                type={this.props.type}
                placeholder={this.props.placeholder}
                name={this.props.inputId} defaultValue={this.props.defaultValue}
                id={this.props.id}
                onChange={this.props.onChange} />


        return (
            <div className="input">
                <label htmlFor={this.props.inputId}>{this.props.label}</label>
                {value}
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
    placeholder: '',
    value: '',
    defaultValue: '',
    onChange: () => { }
}