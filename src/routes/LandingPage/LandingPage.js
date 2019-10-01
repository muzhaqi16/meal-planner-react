import React from 'react';
import Button from '../../components/input/Button/Button'
import './LandingPage.css'

export default class LandingPage extends React.Component {
    render() {
        return (
            <main>
                <div className="hero">
                    <div className="hero-container">
                        <h1>Meal Planning Made Easy. <br />Start planning your meals today</h1>
                        <a href="/planner"> <Button text='Get Started' /></a>
                    </div>
                </div>
                <div className="articles">
                    <article>
                        <header>
                            <h3>Plan Meals</h3>
                        </header>
                        <p>
                            Plan your meals for the week in advance with our built in recipe search function and never have
                            to
                            worry about what to cook
                        </p>
                        <footer>
                            <Button text="Plan it now" />
                        </footer>
                    </article>
                    <article>
                        <header>
                            <h3>Track Calories</h3>
                        </header>
                        <p>
                            Our app help you keep track of calories that you consume for each meal during the day
                    </p>
                        <footer>
                            <Button text="Look it up" />
                        </footer>
                    </article>
                    <article>
                        <header>
                            <h3>Stay Healthy</h3>
                        </header>
                        <p>
                            By planning your meals in advance you get to have better eating choices and keep track of your
                            calories
                    </p>
                        <footer>
                            <Button text="Check it out" />
                        </footer>
                    </article>
                </div>
            </main>
        )
    }
}