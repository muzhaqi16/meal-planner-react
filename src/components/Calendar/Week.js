import React from 'react';
import Day from './Day';
import { Link } from "react-router-dom";
import './Week.css'
export default class Week extends React.Component {
    render() {
        const days = Object.keys(this.props.data)
        return (
            <div>
                <nav>
                    <Link to='/planner/2019-09-09'><span>&larr; Prev Week</span></Link>
                    Week of September 16th
                    <Link to='/planner/2019-09-23'><span> Next Week &rarr;</span></Link>
                </nav>
                <div className="week">
                    <ul>
                        <li className="day-name" id="meal-header">
                            <span className="no-style">&nbsp;</span>
                            <p>&nbsp;</p>
                            <ul className="meal-periods">
                                <li className="meal-time header">
                                    <a href="/">B</a>
                                </li>
                                <li className="meal-time header">
                                    <a href="/">L</a>
                                </li>
                                <li className="meal-time header">
                                    <a href="/">D</a>
                                </li>
                            </ul>
                        </li>
                        <li className="day-name">
                            <span>Mon</span>
                            <p>{days[0]}</p>
                            <Day data={this.props.data[days[0]]} />
                        </li>
                        <li className="day-name">
                            <span>Tue </span>
                            <p>{days[1]}</p>
                            <Day data={this.props.data[days[1]]} />
                        </li>
                        <li className="day-name">
                            <span>Wed </span>
                            <p>{days[2]}</p>
                            <Day data={this.props.data[days[2]]} />
                        </li>
                        <li className="day-name">
                            <span>Thur </span>
                            <p>{days[3]}</p>
                            <Day data={this.props.data[days[3]]} />
                        </li>
                        <li className="day-name">
                            <span>Fri </span>
                            <p>{days[4]}</p>
                            <Day data={this.props.data[days[4]]} />
                        </li>
                        <li className="day-name">
                            <span>Sat </span>
                            <p>{days[5]}</p>
                            <Day data={this.props.data[days[5]]} />
                        </li>
                        <li className="day-name">
                            <span>Sun</span>
                            <p>{days[6]}</p>
                            <Day data={this.props.data[days[6]]} />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}