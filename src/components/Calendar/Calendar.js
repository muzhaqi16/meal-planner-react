import React from 'react';
import Week from './Week';
import './Calendar.css'
import TextInput from '../input/TextInput/TextInput'
import Select from '../input/Select/Select'
import Buttton from '../input/Button/Button'

export default class Calendar extends React.Component {
    handleAdd = (ev) => {
        ev.preventDefault();
        const { food_name, meal_time, calories, date } = ev.target;
        this.props.add(date.value, food_name.value, meal_time.value, calories.value)
        ev.target.reset();
    }
    render() {
        return (
            <div className="calendar">
                <div className="timeline">
                    <div className="input">
                        <h2>Add a meal to your calendar</h2>
                        <form className="food-log-form" onSubmit={this.handleAdd}>
                            <div>
                                <TextInput label="Select Date" type="date" id="date" />
                            </div>
                            <div>
                                <TextInput label="Food" placeholder="Enter meal name..." id="food_name" />
                            </div>
                            <div>
                                <Select label="Time" options={['breakfast', 'lunch', 'dinner']} id="meal_time" />
                            </div>
                            <div>
                                <TextInput label="Calories" id="calories" />
                            </div>
                            <div>
                                <Buttton text="Add Meal" type='submit' />
                            </div>
                        </form>
                    </div>
                    <div className="days-of-week">
                        <Week data={this.props.data} changeWeek={this.props.changeWeek} />
                    </div>
                </div>

            </div>
        )
    }
}