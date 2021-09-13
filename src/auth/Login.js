import "./fonts/material-design-iconic-font/css/material-design-iconic-font.min.css";
import React, {Component} from "react";
import "./css/auth.css";
import {NavLink} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    changeHandler = e => {
        e.preventDefault();
        const {name, value} = e.target;
        this.setState({[name]: value})
    }
    logUser = (e) => {
        e.preventDefault();
        const url = "api/auth/login";
        const {email, password} = this.state;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
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
        const {email, password} = this.state;
        return (
            <div className="back">
                <div className="parent" id="parent">
                    <div className="box">
                        <form>
                            <span className="text-center">login</span>
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
                                <input type="password"
                                       id="password"
                                       name="password"
                                       defaultValue={password}
                                       onChange={this.changeHandler}
                                       required/>
                                <label htmlFor="password">Password</label>
                            </div>
                            <button type="submit" onClick={this.logUser} className="btn">login</button>
                            <br/>
                            <button type="button" className="btn"><NavLink
                                style={{textDecoration: 'none', color: 'white'}} to='/signup'>signup page</NavLink>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;