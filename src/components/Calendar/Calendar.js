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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSave } from '@fortawesome/free-solid-svg-icons'

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //keep track of when to show the add meal menu
            hidden: true,
            error: null,
            info: null,
            recipeName: '',
            recipeDetails: '',
            recipeCalories: 0,
            selectedRecipe: [],
            meals: []
        }
    }
    static contextType = PlannerContext;

    //shows and hidess the add meal menu
    showInput = () => {
        this.setState({
            hidden: !this.state.hidden
        })
    }
    saveRecipe = () => {
        const recipe = {
            name: this.state.recipeName,
            details: this.state.recipeDetails,
            calories: this.state.recipeCalories
        };
        fetch(config.API_ENDPOINT + '/recipes', {
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    res.json().then(error => Promise.reject(error))
                }
                this.setState({ "info": "Recipe saved" })
            })
    }
    //Adds a meal to the database and to the state
    handleAdd = (ev) => {
        ev.preventDefault();
        this.setState({ error: null, info: null })

        const { food_name, meal_time, calories, date, food_details } = ev.target;
        //create the meal object from user input
        if (food_name.value.trim().length > 0) {
            const newMeal = {
                "name": food_name.value,
                "date": date.value,
                "time": meal_time.value,
                "details": food_details.value,
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
                    console.log(res)
                    if (!res.ok) {
                        return res.json().then(error => Promise.reject(error))
                    }
                    return res.json()
                })
                .then(data => {
                    //get the returned id from the db and add it to the meal object
                    //and send it to the addMeal function to add it to the state
                    newMeal.id = data.id;
                    newMeal.i = 0;
                    this.context.addMeal(newMeal)
                })
                .catch(error => {
                    this.setState({ error: error.message })
                })
        } else {
            this.setState({ error: "The meal name can not be empty" })
        }
        ev.target.reset();
    }
    search = (text) => {
        this.setState({ error: null })
        text = text.trim();
        if (text.length >= 2) {
            fetch(config.API_ENDPOINT + '/recipes/' + text, {
                method: 'GET',
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
                    if (data.length === 0) {
                        this.setState({ error: "No Match" })
                    }
                    this.setState({ meals: data })
                })
                .catch(error => {
                    this.setState({ error: error.message })
                })
        }
        else {
            this.setState({ error: "Recipe name is too short" })
        }

    }
    handleChange = (ev) => {
        if (ev.target.id === 'food_name') {
            this.setState({ recipeName: ev.target.value })
        }
        if (ev.target.id === 'food_details') {
            this.setState({ recipeDetails: ev.target.value })
        }
        if (ev.target.id === 'calories') {
            this.setState({ recipeCalories: ev.target.value })
        }
    }
    handleSearch = () => {
        this.search(this.state.recipeName);
    }
    handleSelect = (meal) => {
        this.setState({ recipeName: meal.name, recipeDetails: meal.details, recipeCalories: meal.calories, meals: [] })
    }
    render() {
        const { error, info } = this.state;
        let searchResults = this.state.meals.map(meal =>
            <li key={meal.id} onClick={() => this.handleSelect(meal)}>{meal.name}</li>
        )
        return (
            <div className="calendar">
                <div className="timeline">
                    {!this.state.hidden &&
                        <div className="input">
                            <form className="food-log-form" onSubmit={this.handleAdd}>
                                <h2>Add a meal to your calendar</h2>
                                <div role='alert' className="error">
                                    {error && <p className='red'>{error}</p>}
                                </div>
                                <div className="search-bar">
                                    <TextInput
                                        label="Add a recipe"
                                        onChange={ev => this.handleChange(ev)}
                                        placeholder="Enter recipe name..."
                                        id="food_name"
                                        value={this.state.recipeName}
                                        required={true} />
                                    <FontAwesomeIcon role="button" className="search-icon" onClick={this.handleSearch} icon={faSearch} />
                                </div>
                                <ul className="search-results">
                                    {searchResults}
                                </ul>
                                <TextArea label="Details" value={this.state.recipeDetails} placeholder="Enter recipe details..." id="food_details" onChange={ev => this.handleChange(ev)} />
                                <div className="search-bar">
                                    <TextInput type="number" label="Calories" id="calories" value={this.state.recipeCalories} onChange={ev => this.handleChange(ev)} />
                                    <FontAwesomeIcon role="button" className="search-icon" onClick={this.saveRecipe} icon={faSave} />
                                </div>
                                <div role='alert' className="info">
                                    {info && <p className='green'>{info}</p>}
                                </div>
                                <TextInput label="Select Date" type="date" id="date" required={true} />
                                <Select label="Time" options={['breakfast', 'lunch', 'dinner']} id="meal_time" />



                                <Buttton text="Add Meal" type='submit' />

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
