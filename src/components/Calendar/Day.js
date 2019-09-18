import React from 'react';
import PropTypes from 'prop-types'
import './Day.css'
export default class Day extends React.Component {
    render() {
        return (
            <ul className="day">
                <li className="meal-time">
                    <span className="breakfast">Breakfast</span> <span>{this.props.data.breakfast.map((item => <em key={item} className="meal-name">{item}</em>))}</span>
                </li>
                <li className="meal-time">
                    <span className="lunch"> Lunch  </span> <span>{this.props.data.lunch.map((item => <em key={item} className="meal-name">{item}</em>))}</span>
                </li>
                <li className="meal-time">
                    <span className="dinner">Dinner </span> <span>{this.props.data.dinner.map((item => <em key={item} className="meal-name">{item}</em>))}</span>

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