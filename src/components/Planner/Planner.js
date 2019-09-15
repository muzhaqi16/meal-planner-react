import React from 'react';
import Calendar from '../Calendar/Calendar'

export default class Planner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                monday: {
                    date: '09-16-2019',
                    breakfast: 'Omelet',
                    lunch: 'Ceaser Salad',
                    dinner: 'Patatoe Pie'
                },
                tuesday: {
                    date: '09-17-2019',
                    breakfast: 'Bagel',
                    lunch: 'Salad',
                    dinner: ''
                },
                wednesday: {
                    date: '09-18-2019',
                    breakfast: 'Crosant',
                    lunch: 'House Salad',
                    dinner: 'Vanilla Ice Cream'
                },
                thursday: {
                    date: '09-19-2019',
                    breakfast: 'Cereal',
                    lunch: 'Greek Salad',
                    dinner: 'Pappardelli Bolognese'
                },
                friday: {
                    date: '09-20-2019',
                    breakfast: 'Pancakes',
                    lunch: 'Salad',
                    dinner: 'Lasagna'
                },
                saturday: {
                    date: '09-21-2019',
                    breakfast: 'Muffin',
                    lunch: 'Salad',
                    dinner: 'Baked Chicken'
                },
                sunday: {
                    date: '09-22-2019',
                    breakfast: 'Banana',
                    lunch: 'Apple Pie',
                    dinner: 'Lasagna'
                }
            }
        }
    }
    render() {
        return (
            <>
                <Calendar data={this.state.data} />
            </>
        )
    }
}