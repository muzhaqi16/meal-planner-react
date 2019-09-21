import React from 'react';
import Button from '../../components/input/Button/Button'
import './LandingPage.css'

export default class LandingPage extends React.Component {
    render() {
        return (
            <main>
                <div className="hero">
                    <div className="hero-container">
                        <h1>Meal Planning Made Easy. <br />Start planing your meals today</h1>

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
                            <a href="/planner"><Button text="Plan it now" /></a>
                        </footer>
                    </article>
                    <article>
                        <header>
                            <h3>Save Recipes</h3>
                        </header>
                        <p>
                            Save your favourite recipes to your list so next time you know what you like
                    </p>
                        <footer>
                            <a href="/planner"><Button text="Look it up" /></a>
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
                            <a href="/planner"><Button text="Check it out" /></a>
                        </footer>
                    </article>
                </div>
            </main>
        )
    }
}