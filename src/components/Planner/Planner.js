import React from 'react';
import Calendar from '../Calendar/Calendar'

export default class Planner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            '2019-09-16': {
                date: 'Monday',
                breakfast: ['Omelet', 'Fuit Yogurt'],
                lunch: ['Ceaser Salad'],
                dinner: ['Patatoe Pie'],
                calories: ''
            },
            '2019-09-17': {
                date: 'Tuesday',
                breakfast: ['Bagel'],
                lunch: ['Salad'],
                dinner: [],
                calories: ''
            },
            '2019-09-18': {
                date: 'Wednesday',
                breakfast: ['Crosant'],
                lunch: ['House Salad'],
                dinner: ['Vanilla Ice Cream'],
                calories: ''
            },
            '2019-09-19': {
                date: 'Thursday',
                breakfast: ['Cereal'],
                lunch: ['Greek Salad'],
                dinner: ['Pappardelli Bolognese'],
                calories: ''
            },
            '2019-09-20': {
                date: 'Friday',
                breakfast: ['Pancakes'],
                lunch: ['Salad'],
                dinner: ['Lasagna'],
                calories: ''
            },
            '2019-09-21': {
                date: 'Saturday',
                breakfast: ['Muffin'],
                lunch: ['Salad'],
                dinner: ['Baked Chicken'],
                calories: ''
            },
            '2019-09-22': {
                date: 'Sunday',
                breakfast: ['Banana'],
                lunch: ['Apple Pie'],
                dinner: ['Lasagna'],
                calories: ''
            }
        }
    }
    addMeal = (day, name, time, calories) => {
        let selected_day = {};
        if (!this.state[day]) {
            selected_day = {
                date: 'Monday',
                [time]: new Array(name),
                calories
            }
        } else {
            selected_day = this.state[day];
            if (selected_day[time]) {
                selected_day[time] = [...selected_day[time], name]
            } else {
                selected_day[time] = [name]
            }
        }

        this.setState({
            [day]: selected_day
        })
    }
    render() {
        return (
            <>
                <Calendar data={this.state} add={this.addMeal} />
            </>
        )
    }
}