import React from 'react';
import Week from './Week';
import './Calendar.css'
import TextInput from '../input/TextInput/TextInput'
import Buttton from '../input/Button/Button'

export default class Calendar extends React.Component {
    render() {
        return (
            <div className="calendar">
                <div className="timeline">
                    <div className="input">
                        <h2>Add a meal to your calendar</h2>
                        <form class="food-log-form">
                            <div>
                                <TextInput label="Select Date" type="date" />
                            </div>
                            <div>
                                <TextInput label="Food" placeholder="Enter meal name..." />
                            </div>
                            <div>
                                <TextInput label="Time" placeholder="breakfast, lunch or dinner" />
                            </div>
                            <div>
                                <TextInput label="Calories" />
                            </div>
                            <div>
                                <Buttton text="Add Meal" />
                            </div>
                        </form>
                    </div>
                    <div className="days-of-week">
                        <Week data={this.props.data} />
                    </div>
                </div>

            </div>
        )
    }
}