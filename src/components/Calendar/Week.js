import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'


import Day from './Day';
import './Week.css'
export default class Week extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: true
        }

    }
    handleClick = () => {
        this.setState({
            status: !this.state.status
        })
        this.props.show()
    }
    formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        console.log([year, month, day].join('-'))
        return [year, month, day].join('-');
    }
    render() {
        const week = new Date(this.props.week.currentWeek)
        return (
            <div className="calendar-container">
                <nav>
                    <a href={'/planner/' + this.props.week.prevWeek}><span>&larr;</span></a>
                    Week of {week.toLocaleString('default', { month: 'short' }) + ' ' + (week.getDate() + 1)}
                    <a href={'/planner/' + this.props.week.nextWeek}><span>&rarr;</span></a>
                </nav>
                <div className="week">
                    <ul>
                        <li className="day-name" id="meal-header">
                            <div>
                                <FontAwesomeIcon title={this.state.status ? "Add Items" : "Close"} icon={this.state.status ? faPlus : faTimes} onClick={this.handleClick} />
                            </div>
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
                                <p>{week.getDate() + 1}</p>
                            </div>
                            <Day data={this.props.data[this.formatDate(week.setDate(week.getDate() + 1))]} />
                        </li>
                        <li className="day-name">
                            <div><span>Tue </span>
                                <p>{week.getDate() + 1}</p> </div>
                            <Day data={this.props.data[this.formatDate(week.setDate(week.getDate() + 1))]} />
                        </li>
                        <li className="day-name">
                            <div><span>Wed </span>
                                <p>{week.getDate() + 1}</p> </div>
                            <Day data={this.props.data[this.formatDate(week.setDate(week.getDate() + 1))]} />
                        </li>
                        <li className="day-name">
                            <div><span>Thur </span>
                                <p>{week.getDate() + 1}</p> </div>
                            <Day data={this.props.data[this.formatDate(week.setDate(week.getDate() + 1))]} />
                        </li>
                        <li className="day-name">
                            <div><span>Fri </span>
                                <p>{week.getDate() + 1}</p> </div>
                            <Day data={this.props.data[this.formatDate(week.setDate(week.getDate() + 1))]} />
                        </li>
                        <li className="day-name">
                            <div><span>Sat </span>
                                <p>{week.getDate() + 1}</p> </div>
                            <Day data={this.props.data[this.formatDate(week.setDate(week.getDate() + 1))]} />
                        </li>
                        <li className="day-name">
                            <div> <span>Sun</span>
                                <p>{week.getDate() + 1}</p> </div>
                            <Day data={this.props.data[this.formatDate(week.setDate(week.getDate() + 1))]} />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
Week.defaultProps = {
    week: new Date()
}