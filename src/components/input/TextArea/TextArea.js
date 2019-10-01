import React from 'react';
import PropTypes from 'prop-types';
import './TextArea.css'
export default class TextArea extends React.Component {
    render() {
        return (
            <div className="input">
                <label htmlFor={this.props.inputId}>{this.props.label}</label>
                <textarea
                    placeholder={this.props.placeholder}
                    name={this.props.inputId}
                    defaultValue={this.props.defaultValue}
                    id={this.props.id}
                    required={this.props.required}
                    onChange={this.props.onChange} />
            </div>
        )
    }
}
TextArea.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string
}
TextArea.defaultProps = {
    label: 'Label',
    id: 'defaultInput',
    type: 'text',
    placeholder: '',
    defaultValue: '',
    required: false,
    onChange: () => { }
}