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
                            <p>{this.props.data.monday.date}</p>
                            <Day data={this.props.data.monday} />
                        </li>
                        <li className="day-name">
                            <span>Tue </span>
                            <p>{this.props.data.tuesday.date}</p>
                            <Day data={this.props.data.tuesday} />
                        </li>
                        <li className="day-name">
                            <span>Wed </span>
                            <p>{this.props.data.wednesday.date}</p>
                            <Day data={this.props.data.wednesday} />
                        </li>
                        <li className="day-name">
                            <span>Thur </span>
                            <p>{this.props.data.thursday.date}</p>
                            <Day data={this.props.data.thursday} />
                        </li>
                        <li className="day-name">
                            <span>Fri </span>
                            <p>{this.props.data.friday.date}</p>
                            <Day data={this.props.data.friday} />
                        </li>
                        <li className="day-name">
                            <span>Sat </span>
                            <p>{this.props.data.saturday.date}</p>
                            <Day data={this.props.data.saturday} />
                        </li>
                        <li className="day-name">
                            <span>Sun</span>
                            <p>{this.props.data.sunday.date}</p>
                            <Day data={this.props.data.sunday} />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}