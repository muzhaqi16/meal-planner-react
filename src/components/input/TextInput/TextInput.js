import React from 'react';
import PropTypes from 'prop-types';
import './TextInput.css'
export default class TextInput extends React.Component {
    render() {
        const options = {};
        this.props.value !== undefined ? options["value"] = this.props.value : options["defaultValue"] = this.props.defaultValue;
        if (this.props.min) {
            options['min'] = this.props.min
        }
        return (
            <div className="input">
                <label htmlFor={this.props.inputId}>{this.props.label}</label>
                <input
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    name={this.props.inputId}
                    id={this.props.id}
                    {...options}
                    required={this.props.required}
                    onChange={this.props.onChange} />

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
    defaultValue: '',
    required: false,
    onChange: () => { }
}