import React from 'react';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPen } from '@fortawesome/free-solid-svg-icons'
import config from '../../config'
import TokenService from '../../services/token-service'
import PlannerContext from '../../PlannerContext';
import Modal from "../Modal/Modal";
import TextInput from '../input/TextInput/TextInput'
import Select from '../input/Select/Select'
import './Day.css'
export default class Day extends React.Component {
    state = {
        edit: false,
        value: "",
        show: false,
        mealName: ""
    }
    static contextType = PlannerContext;

    showModal = (e, id) => {
        this.setState({
            show: !this.state.show,
            id: id
        });
    };
    onChange = e => {
        const userInput = e.currentTarget.value;
        this.setState({
            mealName: userInput
        })
    }
    handleEdit = (ev) => {
        ev.preventDefault();
        const { food_name, meal_time, calories, date, dayIndex } = ev.target;
        const newMeal = {
            id: this.state.id,
            "name": food_name.value,
            "date": date.value,
            "time": meal_time.value,
            "calories": Number(calories.value)
        }
        fetch(config.API_ENDPOINT + '/meal/' + this.state.id, {
            method: 'PATCH',
            body: JSON.stringify(newMeal),
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
        newMeal.i = dayIndex.value;
        this.context.editMeal(newMeal);
        this.setState({ edit: false, show: !this.state.show })
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
                        if (this.state.show && this.state.id === item.id) {
                            return <em key={item.id} className="meal-name">{item.name}
                                <form onSubmit={this.handleEdit}>
                                    <Modal key={item.id} onClose={this.showModal} show={this.state.show} title="Edit">

                                        <TextInput label="Select Date" type="date" id="date" defaultValue={this.context.formatDate(item.date)} />

                                        <TextInput label="Food" id="food_name" autoFocus defaultValue={item.name} />

                                        <Select label="Time" options={['breakfast', 'lunch', 'dinner']} id="meal_time" defaultValue={item.time} />

                                        <TextInput label="Calories" id="calories" defaultValue={item.calories} />
                                        <input type="hidden" id="dayIndex" name="dayIndex" value={index} />
                                        {/* <input className="edit-field"
                                    autoFocus
                                    key={item.id}
                                    type="text"
                                    defaultValue={item.name}
                                    onKeyUp={(e) => (e.keyCode === 13) ? this.handleEdit(e, item.id, { date: this.props.data[time][index], i: index }) : false}
                                    onBlur={(e) => this.handleEdit(e, item.id, { date: this.props.data[time][index], i: index })} /> */}
                                    </Modal></form></em>
                        }
                        return (<em key={item.id} className="meal-name">{item.name}
                            {/* <FontAwesomeIcon icon={faPen} className="edit-meal" title="Edit" onClick={() => this.setState({ edit: true, id: item.id })} /> */}

                            <FontAwesomeIcon icon={faPen} className="edit-meal" title="Edit" onClick={(e) => this.showModal(e, item.id)} />

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