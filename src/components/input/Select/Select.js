import React from 'react';
import PropTypes from 'prop-types';
import './Select.css'
export default class TextInput extends React.Component {
    render() {
        const options = this.props.options;
        let result = options.map(option => {
            return <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.substring(1)}</option>
        })
        return (
            <div className="select">
                <label htmlFor={this.props.inputId}>{this.props.label}</label>
                <select id={this.props.id}>
                    {result}
                </select>
            </div>
        )
    }
}
TextInput.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    options: PropTypes.array
}
TextInput.defaultProps = {
    label: 'Label',
    id: 'defaultInput',
    options: ['Option 1']
}