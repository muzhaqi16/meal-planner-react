import React from 'react';
import PropTypes from 'prop-types'
import './Day.css'
export default class Day extends React.Component {
    render() {
        return (
            <ul className="day">
                <li className="meal-time">
                    <span className="breakfast">Breakfast</span>
                    {this.props.data.breakfast &&
                        <span>{this.props.data.breakfast.map((item =>
                            <em key={item.id} className="meal-name">{item.name}</em>
                        ))}
                        </span>
                    }
                    {!this.props.data.breakfast && <span></span>}
                </li>
                <li className="meal-time">
                    <span className="lunch"> Lunch  </span>
                    {this.props.data.lunch &&
                        <span>{this.props.data.lunch.map((item =>
                            <em key={item.id} className="meal-name">{item.name}</em>
                        ))}
                        </span>
                    }
                    {/* this fixes the problem with layout when there is no data for lunch */}
                    {!this.props.data.lunch && <span></span>}
                </li>
                <li className="meal-time last">
                    <span className="dinner">Dinner </span>
                    {this.props.data.dinner &&
                        <span>{this.props.data.dinner.map((item =>
                            <em key={item.id} className="meal-name">{item.name}</em>
                        ))}
                        </span>
                    }
                    {!this.props.data.dinner && <span></span>}
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
    day: 'Monday',
    data: {
        breakfast: [],
        lunch: [],
        dinner: []
    }
}