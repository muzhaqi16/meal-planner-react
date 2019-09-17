import React from 'react';
import Day from './Day';
import './Week.css'
export default class Week extends React.Component {
    render() {
        const days = Object.keys(this.props.data)
        return (
            <div>
                <nav>
                    <span>&larr; Prev Week</span>
                    Week of September 16th
                    <span> Next Week &rarr;</span>
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
                            <p>{this.props.data[days[0]].date}</p>
                            <Day data={this.props.data[days[0]]} />
                        </li>
                        <li className="day-name">
                            <span>Tue </span>
                            <p>{this.props.data[days[1]].date}</p>
                            <Day data={this.props.data[days[1]]} />
                        </li>
                        <li className="day-name">
                            <span>Wed </span>
                            <p>{this.props.data[days[2]].date}</p>
                            <Day data={this.props.data[days[2]]} />
                        </li>
                        <li className="day-name">
                            <span>Thur </span>
                            <p>{this.props.data[days[3]].date}</p>
                            <Day data={this.props.data[days[3]]} />
                        </li>
                        <li className="day-name">
                            <span>Fri </span>
                            <p>{this.props.data[days[4]].date}</p>
                            <Day data={this.props.data[days[4]]} />
                        </li>
                        <li className="day-name">
                            <span>Sat </span>
                            <p>{this.props.data[days[5]].date}</p>
                            <Day data={this.props.data[days[5]]} />
                        </li>
                        <li className="day-name">
                            <span>Sun</span>
                            <p>{this.props.data[days[6]].date}</p>
                            <Day data={this.props.data[days[6]]} />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}