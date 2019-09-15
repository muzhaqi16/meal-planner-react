import React from 'react';
import Day from './Day';
import './Week.css'
export default class Week extends React.Component {
    render() {
        return (
            <div>
                <nav>
                    <span>&larr; Prev Week</span>
                    Week of September 16th
                    <span> Next Week &rarr;</span>
                </nav>
                <div className="week">
                    <ul>
                        <li className="day-name" id="meal-header"><span>&nbsp;</span>
                            <ul className="meal-periods">
                                <li className="meal-time header">Breakfast</li>
                                <li className="meal-time header">Lunch</li>
                                <li className="meal-time header">Diner</li>
                            </ul>
                        </li>
                        <li className="day-name">
                            <span>Mon</span>
                            <Day />
                        </li>
                        <li className="day-name">
                            <span>Tue </span><Day /></li>
                        <li className="day-name">
                            <span>Wed </span><Day /></li>
                        <li className="day-name">
                            <span>Thur </span><Day /></li>
                        <li className="day-name">
                            <span>Fri </span><Day /></li>
                        <li className="day-name">
                            <span>Sat </span><Day /></li>
                        <li className="day-name">
                            <span>Sun</span> <Day /></li>
                    </ul>
                </div>
            </div>
        )
    }
}