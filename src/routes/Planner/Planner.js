import React from 'react';
import config from '../../config'
import TokenService from '../../services/token-service'
import Calendar from '../../components/Calendar/Calendar'

export default class Planner extends React.Component {
    constructor(props) {
        super(props)
        this.currentWeek = '';
        this.prevWeek = '';
        this.nextWeek = '';
        this.state = {}
    }
    getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }
    groupData = (jsonData, by) => {
        var groupedData = {};

        // Building grouped dates object where the keys are dates and the 
        // values are the original objects
        for (var key in jsonData) {
            var group = jsonData[key][by].slice(0, 10);
            if (!groupedData[group]) {
                groupedData[group] = [];
            }
            groupedData[group].push(jsonData[key]);
        }
        return groupedData;
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
    fetchData = () => {
        fetch(config.API_ENDPOINT + '/meal/' + this.currentWeek, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                return res.json()
            })
            .then(data => {
                const groupByDate = this.groupData(data, 'date');
                const dateKeys = Object.keys(groupByDate);
                dateKeys.forEach(date => {
                    groupByDate[date] = this.groupData(groupByDate[date], 'time')
                })
                this.setState({
                    data: groupByDate
                })
            })
            .catch(error => {
                console.error(error)
                this.setState({ hasError: error })
            })
    }
    componentDidMount() {
        if (this.props.match.params.week) {
            this.currentWeek = this.props.match.params.week
        } else {
            this.currentWeek = this.formatDate(this.getMonday(new Date()))
        }
        this.prevWeek = this.formatDate(this.updateWeek(-7));
        this.nextWeek = this.formatDate(this.updateWeek(7));
        this.fetchData();
    }
    updateWeek = (days) => {
        let now = new Date(this.currentWeek)
        now.setDate(now.getDate() + days);
        return now;
    }
    addMeal = (day, name, time, calories) => {
        let selected_day = {};
        if (!this.state[day]) {
            selected_day = {
                date: 'Monday',
                [time]: new Array(name),
                calories
            }
        } else {
            selected_day = this.state[day];
            if (selected_day[time]) {
                selected_day[time] = [...selected_day[time], name]
            } else {
                selected_day[time] = [name]
            }
        }
        this.setState({
            [day]: selected_day
        })
    }
    render() {
        return (
            <>
                {this.state.data &&
                    <Calendar data={this.state.data} changeWeek={this.updateWeek} add={this.addMeal} />
                }
            </>
        )
    }
}