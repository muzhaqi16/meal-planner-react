import React from 'react';
import PropTypes from 'prop-types'
import './Day.css'
export default class Day extends React.Component {
    render() {
        return (
            <ul className="day">
                <li className="meal-time breakfast">
                    <a href="/">
                        <em className="meal-name">{this.props.meal}</em>
                    </a>
                </li>
                <li className="meal-time lunch">
                    <a href="/">
                        <em className="meal-name">{this.props.meal}</em>
                    </a>
                    <a href="/">
                        <em className="meal-name">{this.props.meal}</em>
                    </a>
                    <a href="/">
                        <em className="meal-name">{this.props.meal}</em>
                    </a>
                </li>
                <li className="meal-time dinner">
                    <a href="/">
                        <em className="meal-name">{this.props.meal}</em>
                    </a>
                </li>
            </ul>
        )
    }
}
Day.propTypes = {
    meal: PropTypes.string,
    day: PropTypes.string
}
Day.defaultProps = {
    meal: 'Meal Name',
    day: 'Monday'
}