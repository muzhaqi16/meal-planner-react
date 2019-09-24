import React from 'react';
import PropTypes from 'prop-types'
import './Day.css'
export default class Day extends React.Component {
    render() {
        const mealTimes = ['breakfast', 'lunch', 'dinner'];
        const mealViews = mealTimes.map(time =>
            <li className="meal-time" key={time}>
                <span className={time}>{time}</span>
                {this.props.data[time] &&
                    <span>{this.props.data[time].map((item =>
                        <em key={item.id} className="meal-name">{item.name}</em>
                    ))}
                    </span>
                }
                {!this.props.data[time] && <span></span>}
            </li>
        );
        return (
            <ul className="day">
                {mealViews}
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
    day: 'Monday',
    data: {
        breakfast: [],
        lunch: [],
        dinner: []
    }
}