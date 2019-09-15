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
                                <li className="meal-time header"><span>B</span></li>
                                <li className="meal-time header"><span>L</span></li>
                                <li className="meal-time header"><span>D</span></li>
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