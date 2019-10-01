import React from 'react';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPen } from '@fortawesome/free-solid-svg-icons'
import config from '../../config'
import TokenService from '../../services/token-service'
import PlannerContext from '../../PlannerContext';
import Modal from "../Modal/Modal";
import TextInput from '../input/TextInput/TextInput'
import TextArea from '../input/TextArea/TextArea'
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
    // show the modal and keep track of the previous data for the meal
    showModal = (e, data = {}, index = 0) => {
        data.i = index;
        this.setState({
            show: !this.state.show,
            id: data.id,
            oldData: data,
        });
    };
    //close modal and remove the previous meal data
    closeModal = () => {
        this.setState({
            show: !this.state.show,
            oldData: {}
        })
    }
    //when a meal is edited update the data in the db and in state
    handleEdit = (ev) => {
        ev.preventDefault();
        const { food_name, meal_time, calories, date, dayIndex, food_details } = ev.target;
        const newMeal = {
            id: this.state.id,
            "name": food_name.value,
            "date": date.value.slice(0, 10),
            "time": meal_time.value,
            "details": food_details.value,
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
                this.setState({ error })
            })
        //keep track of the index in the array of the edited meal
        //for when the location is not changed in the day
        newMeal.i = dayIndex.value;
        this.context.editMeal(newMeal, this.state.oldData);
        //hide the modal
        this.setState({ edit: false, show: !this.state.show, oldData: {} })
    }
    //delete a meal from the database and update state
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
                this.setState({ error })
            })
        this.context.deleteMeal(data.date, data.i);
    }
    render() {
        //we keep track of meal by meal time
        const mealTimes = ['breakfast', 'lunch', 'dinner'];

        const mealViews = mealTimes.map(time =>
            <li className="meal-time" key={time}>
                <span className={time}>{time}</span>
                {/* if there is any data for that meal time of the day */}
                {this.props.data[time] &&
                    <span className="individual-meals">{this.props.data[time].map(((item, index) => {
                        // show the modal if the edit button has been clicked and the state has been updated
                        if (this.state.show && this.state.id === item.id) {
                            return <em key={item.id} className="meal-name">{item.name}
                                <form onSubmit={this.handleEdit}>
                                    <Modal key={item.id} onClose={this.closeModal} show={this.state.show} title="Edit">

                                        <TextInput label="Select Date" type="date" id="date" defaultValue={item.date.slice(0, 10)} />

                                        <TextInput label="Food" id="food_name" autoFocus defaultValue={item.name} />
                                        <TextArea label="Details" placeholder="Enter recipe details..." defaultValue={item.details} id="food_details" />
                                        <Select label="Time" options={['breakfast', 'lunch', 'dinner']} id="meal_time" defaultValue={item.time} />

                                        <TextInput label="Calories" id="calories" defaultValue={item.calories} />
                                        <input type="hidden" id="dayIndex" name="dayIndex" value={index} />
                                    </Modal></form></em>
                        }
                        return (
                            <em key={item.id} className="meal-name">{item.name} <strong className="calories">{item.calories} Cals</strong>

                                <FontAwesomeIcon icon={faPen} className="edit-meal" title="Edit" onClick={(e) => this.showModal(e, item, index)} />

                                <FontAwesomeIcon icon={faTimes} title="Delete" className="delete-meal" onClick={() => { let r = window.confirm('Are you sure ? '); if (r) this.handleDelete(item.id, { date: this.props.data[time][index], i: index }) }} />

                            </em>)
                    }

                    ))}
                    </span>

                }
                {/* Fix the mobile view by keeping the space for each day time */}
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