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
                    <Day day="Monday" meal="Ceaser Salad" />
                    <Day day="Tuesday" />
                    <Day day="Wednesday" />
                    <Day day="Thursday" />
                    <Day day="Friday" />
                    <Day day="Saturday" />
                    <Day day="Sunday" />
                </div>
            </div>
        )
    }
}