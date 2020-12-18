import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from './SignupForm';
import './stylesheets/LandingPage.css';

function LandingPage() {
    return (
        <div className="landingPage">
            <div className="missionStatement">
                <div className="missionStatement__header">
                    <h1>Build-A-Body</h1>
                </div>
                <div className="missionStatement__body">
                    <p>Reaching the ideal level of fitness does not come easy.  It's easy to pick up bad habits and it's even easier to let go of good habits.  Most fitness sites will tell you that you can get to your ideal shape and keep it with little to no work at all by just paying a ton of money for a bunch of supplements.  This is an unhealthy and unsustainable route to being happy in the body you're in.
                    </p>
                    <p>
                        That's where we come in.  We don't force supplements down your throat here.  We believe the goal is to develop the mind equally with the body, to create a state of consciousness that will lead to you being able to get into the shape you want in a sustainable way.  Adopting this mindset of hard work and proper nutrition will inevitably carry into other aspects of your life.  Convinced yet?  Sign up or login below!
                    </p>
                </div>
                <div className="missionStatement__links">
                    <button className="loginForm__button"><Link to="/login">Login</Link></button>
                    <button className="signUpForm__button"><Link to="/signup">Sign Up!</Link></button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
