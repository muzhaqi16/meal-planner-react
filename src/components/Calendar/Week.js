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
        return [year, month, day].join('-');
    }
    render() {
        const currentWeek = new Date(this.props.week.currentWeek);
        const nextDay = new Date(this.props.week.currentWeek);
        const daysOfWeek = ['Mon', 'Tue', "Wed", "Thur", "Fri", "Sat", "Sun"];

        let weekData = daysOfWeek.map(day => {
            nextDay.setDate(nextDay.getDate() + 1)
            return (<li key={day} className="day-name">
                <div><span>{day}</span>
                    <p>{nextDay.getDate()}</p>
                </div>
                <Day data={this.props.data[this.formatDate(nextDay)]} />
            </li>);
        })
        return (
            <div className="calendar-container">
                <nav>
                    <a href={'/planner/' + this.props.week.prevWeek}><span>&larr;</span></a>
                    Week of {currentWeek.toLocaleString('default', { month: 'short' }) + ' ' + (currentWeek.getDate() + 1)}
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
                                    <span>B</span>
                                </li>
                                <li className="meal-time header">
                                    <span>L</span>
                                </li>
                                <li className="meal-time header">
                                    <span>D</span>
                                </li>
                            </ul>
                        </li>
                        {weekData}
                    </ul>
                </div>
            </div>
        )
    }
}
Week.defaultProps = {
    week: new Date()
}