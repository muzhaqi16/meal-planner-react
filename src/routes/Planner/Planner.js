import React from 'react';
import config from '../../config'
import TokenService from '../../services/token-service'
import Calendar from '../../components/Calendar/Calendar'
import PlannerContext from '../../PlannerContext';

export default class Planner extends React.Component {
    constructor(props) {
        super(props)
        this.week = {
            currentWeek: '',
            prevWeek: '',
            nextWeek: ''
        }
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
    formatDate = (date, add = 0) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + (d.getDate() + add),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    }
    fetchData = () => {
        fetch(config.API_ENDPOINT + '/meal/' + this.week.currentWeek, {
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
            this.week.currentWeek = this.props.match.params.week
        } else {
            this.week.currentWeek = this.formatDate(this.getMonday(new Date()))
        }
        this.week.prevWeek = this.formatDate(this.updateWeek(-6));
        this.week.nextWeek = this.formatDate(this.updateWeek(8));
        this.fetchData();
    }
    updateWeek = (days) => {
        let now = new Date(this.week.currentWeek)
        now.setDate(now.getDate() + days);
        return now;
    }
    editMeal = (newMeal, oldMeal) => {
        //get the old meal data in case the meal is moved to a different date or time of day
        oldMeal.date = oldMeal.date.slice(0, 10);
        newMeal.user_id = oldMeal.user_id;
        this.deleteMeal(oldMeal, newMeal.i);
        this.addMeal(newMeal);
    }
    deleteMeal = (data, i = 0) => {
        const stateCopy = this.state.data;
        delete stateCopy[data.date.slice(0, 10)][data.time][i];
        this.setState({
            data: stateCopy
        })
    }
    addMeal = (data) => {
        const stateCopy = this.state.data;

        let { id, date, name, time, calories, i } = data;

        let selected_day = {};
        if (!this.state.data[date]) {
            selected_day = {
                [time]: [{
                    name,
                    id,
                    calories,
                    date,
                    time
                }]
            }
        } else {
            selected_day = this.state.data[date];
            if (selected_day[time]) {
                if (selected_day[time][i] !== undefined) {
                    selected_day[time] = [...selected_day[time], { id, date, name, time, calories }]
                } else {
                    selected_day[time][i] = { id, date, name, time, calories }
                }
            } else {
                selected_day[time] = [{ id, date, name, time, calories }]
            }
        }

        stateCopy[date] = selected_day;
        this.setState({
            data: stateCopy
        })
    }
    render() {
        const contextValue = {
            data: this.state.data,
            addMeal: this.addMeal,
            editMeal: this.editMeal,
            deleteMeal: this.deleteMeal,
            formatDate: this.formatDate
        }
        return (
            <>
                <PlannerContext.Provider value={contextValue}>
                    {this.state.data &&
                        <Calendar week={this.week} />
                    }
                </PlannerContext.Provider>
            </>
        )
    }
}
