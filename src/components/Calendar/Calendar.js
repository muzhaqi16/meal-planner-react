import React from 'react';
import Week from './Week';
import './Calendar.css'

export default class Calendar extends React.Component {
    render() {
        return (
            <div className="calendar">
                <div className="timeline">
                    <div className="input">
                        <form class="food-log-form">
                            <div>
                                <label for="date">Date</label>
                                <input type="date" required="" id="date" value="2019-09-15" />
                            </div>
                            <div>
                                <label for="food">Food</label>
                                <input type="text" required="" id="food" />
                            </div>
                            <div>
                                <label for="food">Meal time</label>
                                <select>
                                    <option value="breakfast">Breakfast</option>
                                    <option value="lunch">Lunch</option>
                                    <option value="dinner">Dinner</option>
                                </select>
                            </div>
                            <div>
                                <label for="calories">Calories</label>
                                <input type="number" required="" id="calories" />
                            </div>
                            <div>
                                <label>&nbsp;</label>
                                <input type="submit" value="Add Meal" class="button" />
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