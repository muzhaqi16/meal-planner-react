import React from 'react';
import PropTypes from 'prop-types'
import './Day.css'
export default class Day extends React.Component {
    render() {
        console.log(this.props.data.breakfast);
        return (
            <ul className="day">
                <li className="meal-time breakfast">
                    <a href="/">
                        {this.props.data.breakfast.map((item => <em className="meal-name">{item}</em>))}
                    </a>
                </li>
                <li className="meal-time lunch">
                    <a href="/">
                        <em className="meal-name">{this.props.data.lunch}</em>
                    </a>
                </li>
                <li className="meal-time dinner">
                    <a href="/">
                        <em className="meal-name">{this.props.data.dinner}</em>
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