import React from 'react';
import Calendar from '../Calendar/Calendar'

export default class Planner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            monday: {
                date: '09-16-2019',
                breakfast: ['Omelet', 'Fuit Yogurt'],
                lunch: 'Ceaser Salad',
                dinner: 'Patatoe Pie',
                calories: ''
            },
            tuesday: {
                date: '09-17-2019',
                breakfast: ['Bagel'],
                lunch: 'Salad',
                dinner: '',
                calories: ''
            },
            wednesday: {
                date: '09-18-2019',
                breakfast: ['Crosant'],
                lunch: 'House Salad',
                dinner: 'Vanilla Ice Cream',
                calories: ''
            },
            thursday: {
                date: '09-19-2019',
                breakfast: ['Cereal'],
                lunch: 'Greek Salad',
                dinner: 'Pappardelli Bolognese',
                calories: ''
            },
            friday: {
                date: '09-20-2019',
                breakfast: ['Pancakes'],
                lunch: 'Salad',
                dinner: 'Lasagna',
                calories: ''
            },
            saturday: {
                date: '09-21-2019',
                breakfast: ['Muffin'],
                lunch: 'Salad',
                dinner: 'Baked Chicken',
                calories: ''
            },
            sunday: {
                date: '09-22-2019',
                breakfast: ['Banana'],
                lunch: 'Apple Pie',
                dinner: 'Lasagna',
                calories: ''
            }
        }
    }
    addMeal = (day, name, time, calories) => {
        const single_day = this.state.monday;
        single_day.breakfast = [...this.state.monday.breakfast, name]
        this.setState({
            monday: single_day
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