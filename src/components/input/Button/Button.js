import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'
export default class Button extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="button">
                <button type={this.props.type}>{this.props.text}</button>
            </div>
        )
    }
}
Button.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string
}
Button.defaultProps = {
    text: 'Button',
    type: 'submit'
}