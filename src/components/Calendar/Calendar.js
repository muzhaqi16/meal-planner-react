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

                            <TextInput label="Select Date" type="date" id="date" />

                            <TextInput label="Food" placeholder="Enter meal name..." id="food_name" />

                            <Select label="Time" options={['breakfast', 'lunch', 'dinner']} id="meal_time" />

                            <TextInput label="Calories" id="calories" />

                            <Buttton text="Add Meal" type='submit' />

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