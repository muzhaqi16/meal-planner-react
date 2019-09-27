import React from 'react';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import PlannerContext from '../../PlannerContext';
import Day from '../Day/Day';
import './Week.css'
export default class Week extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: true
        }
    }
    static contextType = PlannerContext;

    handleClick = () => {
        this.setState({
            status: !this.state.status
        })
        this.props.show()
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
                <Day data={this.context.data[this.context.formatDate(nextDay)]} />
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
Week.propTypes = {
    show: PropTypes.func
}
Week.defaultProps = {
    week: {
        currentWeek: new Date(),
        prevWeek: new Date(),
        nextWeek: new Date()
    }
}