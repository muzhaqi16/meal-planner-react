import React from 'react';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPen } from '@fortawesome/free-solid-svg-icons'
import config from '../../config'
import TokenService from '../../services/token-service'
import PlannerContext from '../../PlannerContext';
import './Day.css'
export default class Day extends React.Component {
    state = {
        edit: false,
        value: ""
    }
    static contextType = PlannerContext;
    handleEdit = (e, id, data) => {
        const newValue = e.currentTarget.value;
        fetch(config.API_ENDPOINT + '/meal/' + id, {
            method: 'PATCH',
            body: JSON.stringify({ "name": newValue }),
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
        this.context.editMeal(newValue, data);
        this.setState({ edit: false })
    }
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
        this.context.deleteMeal(data);
    }
    render() {
        const mealTimes = ['breakfast', 'lunch', 'dinner'];
        const mealViews = mealTimes.map(time =>
            <li className="meal-time" key={time}>
                <span className={time}>{time}</span>
                {this.props.data[time] &&
                    <span>{this.props.data[time].map(((item, index) => {
                        if (this.state.edit && this.state.id === item.id) {
                            return <input className="edit-field"
                                autoFocus
                                key={item.id}
                                type="text"
                                defaultValue={item.name}
                                onKeyUp={(e) => (e.keyCode === 13) ? this.handleEdit(e, item.id, { date: this.props.data[time][index], i: index }) : false}
                                onBlur={(e) => this.handleEdit(e, item.id, { date: this.props.data[time][index], i: index })} />
                        }
                        return (<em key={item.id} className="meal-name">{item.name}
                            <FontAwesomeIcon icon={faPen} className="edit-meal" title="Edit" onClick={() => this.setState({ edit: true, id: item.id })} />
                            <FontAwesomeIcon icon={faTimes} title="Delete" className="delete-meal" onClick={() => { let r = window.confirm('Are you sure ? '); if (r) this.handleDelete(item.id, { date: this.props.data[time][index], i: index }) }} />
                        </em>)
                    }

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