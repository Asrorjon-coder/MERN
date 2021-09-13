import "./fonts/material-design-iconic-font/css/material-design-iconic-font.min.css";
import React, {Component} from "react";
import "./css/auth.css";
import {NavLink} from "react-router-dom";

class Main extends Component {
    render() {
        return (
            <div className="backmain">
                <div className="parentmain">
                    <div className="row">
                        <div id="ff"><h2>Welcome to the AsCHat</h2></div>
                        <div id="f">
                            <NavLink className="btn" to="/signup">SignUp</NavLink>
                        </div>
                        <div id="f">
                            <NavLink className="btn" to='/login'>LogIn</NavLink>
                        </div>
                        <div id="f">
                            <NavLink className="btn" to='/activate'>Activation</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;