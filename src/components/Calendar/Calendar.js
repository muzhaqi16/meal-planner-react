import React from 'react';
import TokenService from '../../services/token-service'
import config from '../../config'
import PlannerContext from '../../PlannerContext';
import Week from '../Week/Week';
import './Calendar.css'
import TextInput from '../input/TextInput/TextInput'
import Select from '../input/Select/Select'
import Buttton from '../input/Button/Button'

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true
        }
    }
    static contextType = PlannerContext;
    showInput = () => {
        this.setState({
            hidden: !this.state.hidden
        })
    }
    handleAdd = (ev) => {
        ev.preventDefault();
        const { food_name, meal_time, calories, date } = ev.target;
        const newMeal = {
            "name": food_name.value,
            "date": date.value,
            "time": meal_time.value,
            "calories": Number(calories.value)
        }
        this.setState({ error: null })

        fetch(config.API_ENDPOINT + '/meal', {
            method: 'POST',
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
                return res.json()
            })
            .then(data => {
                this.context.addMeal(data.id, newMeal.date, newMeal.name, newMeal.time, newMeal.calories)
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
        ev.target.reset();
    }
    render() {
        return (
            <div className="calendar">
                <div className="timeline">
                    {!this.state.hidden &&
                        <div className="input">
                            <form className="food-log-form" onSubmit={this.handleAdd}>
                                <h2>Add a meal to your calendar</h2>
                                <TextInput label="Select Date" type="date" id="date" />

                                <TextInput label="Food" placeholder="Enter meal name..." id="food_name" />

                                <Select label="Time" options={['breakfast', 'lunch', 'dinner']} id="meal_time" />

                                <TextInput label="Calories" id="calories" />

                                <Buttton text="Add Meal" type='submit' />

                            </form>
                        </div>
                    }
                    <div className="days-of-week">
                        <Week show={this.showInput} week={this.props.week} />
                    </div>
                </div>

            </div>
        )
    }
}