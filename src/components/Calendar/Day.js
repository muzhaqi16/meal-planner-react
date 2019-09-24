import React from 'react';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import config from '../../config'
import TokenService from '../../services/token-service'
import './Day.css'
export default class Day extends React.Component {
    handleDelete = (id, data) => {
        fetch(config.API_ENDPOINT + '/meal/' + id, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
        this.props.deleteMeal(data);
    }
    render() {
        const mealTimes = ['breakfast', 'lunch', 'dinner'];
        const mealViews = mealTimes.map(time =>
            <li className="meal-time" key={time}>
                <span className={time}>{time}</span>
                {this.props.data[time] &&
                    <span>{this.props.data[time].map(((item, index) =>
                        <em key={item.id} className="meal-name">{item.name}  <FontAwesomeIcon icon={faTimes} className="delete-meal" onClick={() => this.handleDelete(item.id, { date: this.props.data[time][index], i: index })} /></em>
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