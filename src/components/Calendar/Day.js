import React from 'react';
import PropTypes from 'prop-types'
import './Day.css'
export default class Day extends React.Component {
    render() {
        return (
            <ul className="day">
                <li className="meal-time breakfast">
                    <a href="/">
                        {this.props.data.breakfast.map((item => <em key={item} className="meal-name">{item}</em>))}
                    </a>
                </li>
                <li className="meal-time lunch">
                    <a href="/">
                        {this.props.data.lunch.map((item => <em key={item} className="meal-name">{item}</em>))}
                    </a>
                </li>
                <li className="meal-time dinner">
                    <a href="/">
                        {this.props.data.dinner.map((item => <em key={item} className="meal-name">{item}</em>))}
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