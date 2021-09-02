import "./fonts/material-design-iconic-font/css/material-design-iconic-font.min.css";
import React, {Component} from "react";
import {NavLink} from "react-router-dom";

class Activate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            activationLink: ""
        }
    }

    changeHandler = e => {
        e.preventDefault();
        const {name, value} = e.target;
        this.setState({[name]: value})
    }
    actUser = (e) => {
        e.preventDefault();
        const url = "api/auth/activate";
        const {email, activationLink} = this.state;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, activationLink})
        })
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    window.M.toast({html: data.errors[0].msg})
                } else if (data.message) {
                    window.M.toast({html: data.message})
                }
            })
            .catch(err => console.error(err))
    }

    render() {
        const {email, activationLink} = this.state;
        return (
            <div className="back">
                <div className="parent" id="parent">
                    <div className="box">
                        <form>
                            <span className="text-center">Enter your activation token</span>
                            <div className="input-container">
                                <input type="mail"
                                       id="email"
                                       name="email"
                                       defaultValue={email}
                                       onChange={this.changeHandler}
                                       required/>
                                <label htmlFor="email">E-mail</label>
                            </div>
                            <div className="input-container">
                                <input type="text"
                                       id="activationLink"
                                       name="activationLink"
                                       defaultValue={activationLink}
                                       onChange={this.changeHandler}
                                       required/>
                                <label htmlFor="activationLink">Activation token</label>
                            </div>
                            <div id="f">
                                <button onClick={this.actUser} className="btn">login</button>
                            </div>
                            <div id="f">
                                <NavLink className="btn" to="/">Main Page</NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Activate;