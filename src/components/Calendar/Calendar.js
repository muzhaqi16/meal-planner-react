import React from 'react';
import TokenService from '../../services/token-service'
import config from '../../config'
import PlannerContext from '../../PlannerContext';
import Week from '../Week/Week';
import './Calendar.css'
import TextInput from '../input/TextInput/TextInput'
import TextArea from '../input/TextArea/TextArea'
import Select from '../input/Select/Select'
import Buttton from '../input/Button/Button'

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //keep track of when to show the add meal menu
            hidden: true,
            error: null
        }
    }
    static contextType = PlannerContext;

    //shows and hidess the add meal menu
    showInput = () => {
        this.setState({
            hidden: !this.state.hidden
        })
    }
    //Adds a meal to the database and to the state
    handleAdd = (ev) => {
        ev.preventDefault();
        this.setState({ error: null })

        const { food_name, meal_time, calories, date } = ev.target;
        //create the meal object from user input
        if (food_name.value.trim().length > 0) {
            const newMeal = {
                "name": food_name.value,
                "date": date.value,
                "time": meal_time.value,
                "calories": Number(calories.value)
            }
            this.setState({ error: null })
            //make a POST request to the db with the new meal object as json
            fetch(config.API_ENDPOINT + '/meal', {
                method: 'POST',
                body: JSON.stringify(newMeal),
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${TokenService.getAuthToken()}`
                }
            })
                .then(res => {
                    if (!res.ok) {
                        return res.json().then(error => Promise.reject(error))
                    }
                    return res.json()
                })
                .then(data => {
                    //get the returned id from the db and add it to the meal object
                    //and send it to the addMeal function to add it to the state
                    newMeal.id = data.id;
                    this.context.addMeal(newMeal)
                })
                .catch(error => {
                    this.setState({ error })
                })
        } else {
            this.setState({ error: "The meal name can not be empty" })
        }
        ev.target.reset();
    }
    render() {
        const { error } = this.state;
        return (
            <div className="calendar">
                <div className="timeline">
                    {!this.state.hidden &&
                        <div className="input">
                            <form className="food-log-form" onSubmit={this.handleAdd}>
                                <h2>Add a meal to your calendar</h2>
                                <TextInput label="Select Date" type="date" id="date" required={true} />

                                <TextInput label="Food" placeholder="Enter recipe name..." id="food_name" required={true} />
                                <TextArea label="Details" placeholder="Enter recipe details..." id="food_details" />
                                <Select label="Time" options={['breakfast', 'lunch', 'dinner']} id="meal_time" />

                                <TextInput type="number" label="Calories" id="calories" defaultValue="0" />

                                <Buttton text="Add Meal" type='submit' />
                                <div role='alert'>
                                    {error && <p className='red'>{error}</p>}
                                </div>
                            </form>
                        </div>
                    }
                    <div className="days-of-week">
                        <Week show={this.showInput} week={this.props.week} />
                    </div>
                </div>

            </div>
        )
    }
}