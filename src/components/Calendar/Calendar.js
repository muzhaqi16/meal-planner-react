import React from 'react';
import Week from './Week';
import './Calendar.css'

export default class Calendar extends React.Component {
    render() {
        return (
            <div class="calendar">
                <div className="timeline">
                    <div class="days-of-week">
                        <Week />
                    </div>
                </div>

            </div>
        )
    }
}