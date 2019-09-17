import React from 'react';
import Day from './Day';
import { Link } from "react-router-dom";
import './Week.css'
export default class Week extends React.Component {
    render() {
        const days = Object.keys(this.props.data)
        return (
            <div className="calendar-container">
                <nav>
                    <Link to='/planner/2019-09-09'><span>&larr;</span></Link>
                    Week of Sept 16th
                    <Link to='/planner/2019-09-23'><span>&rarr;</span></Link>
                </nav>
                <div className="week">
                    <ul>
                        <li className="day-name" id="meal-header">
                            <div><span className="no-style">&nbsp;</span>
                                <p>&nbsp;</p> </div>
                            <ul className="day">
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
                            <div><span>Mon</span>
                                <p>{days[0].slice(-2)}</p>
                            </div>
                            <Day data={this.props.data[days[0]]} />
                        </li>
                        <li className="day-name">
                            <div><span>Tue </span>
                                <p>{days[1].slice(-2)}</p> </div>
                            <Day data={this.props.data[days[1]]} />
                        </li>
                        <li className="day-name">
                            <div><span>Wed </span>
                                <p>{days[2].slice(-2)}</p> </div>
                            <Day data={this.props.data[days[2]]} />
                        </li>
                        <li className="day-name">
                            <div><span>Thur </span>
                                <p>{days[3].slice(-2)}</p> </div>
                            <Day data={this.props.data[days[3]]} />
                        </li>
                        <li className="day-name">
                            <div><span>Fri </span>
                                <p>{days[4].slice(-2)}</p> </div>
                            <Day data={this.props.data[days[4]]} />
                        </li>
                        <li className="day-name">
                            <div><span>Sat </span>
                                <p>{days[5].slice(-2)}</p> </div>
                            <Day data={this.props.data[days[5]]} />
                        </li>
                        <li className="day-name">
                            <div> <span>Sun</span>
                                <p>{days[6].slice(-2)}</p> </div>
                            <Day data={this.props.data[days[6]]} />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}