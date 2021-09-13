import "./fonts/material-design-iconic-font/css/material-design-iconic-font.min.css";
import React, {Component} from "react";
import "./css/auth.css";
import "materialize-css";
import emailjs from "emailjs-com";
import {NavLink} from "react-router-dom";

const uuid = require("uuid");

class Signup extends Component {
		constructor(props) {
				super(props);
				this.state = {
						fullname: "",
						email: "",
						password: ""
				};
		}
		
		changeHandler = (e) => {
				const {name, value} = e.target;
				this.setState({[name]: value});
		};
		createUser = async (e) => {
				e.preventDefault();
				const url = "api/auth/signup";
				const {fullname, email, password} = this.state;
				const activationLink = uuid.v4();
				let mail = false;
				const res = await fetch(url, {
						method: "POST",
						headers: {
								"Content-Type": "application/json"
						},
						body: JSON.stringify({fullname, email, password, activationLink})
				});
				const json = await res.json();
				console.log(json);
				if (json.valerrors) {
						window.M.toast({html: json.message});
						/*json.valerrors.forEach(element => window.M.toast({html: element.msg}));*/
						window.M.toast({html: json.valerrors[0].msg})
				}
				
				const templateParams = {
						to_name: `${fullname}`,
						notes: "Check this out!",
						from_name: "AsTech Corp.",
						message: "Для активации перейдите по ссылке: ",
						link: `http://localhost:3000/api/auth/activate/${activationLink}`,
						to: `${email}`
				};
				if (mail) {
						emailjs.send("service_gmail", "template_dhfmwil", templateParams, "user_5z2avyF3IWERjtOUJEk4b")
										.then(function (response) {
												console.log("SUCCESS!", response.status, response.text);
										}, function (error) {
												console.log("FAILED...", error);
										})
										.then(res => console.log(res))
										.catch(err => console.log(err));
				}
		};
		
		render() {
				return (
								<div className="back">
										<div className="parent" id="parent">
												<div className="box">
														<form>
																<span className="text-center">signup</span>
																<div className="input-container">
																		<input type="email"
																		       id="email"
																		       name="email"
																		       defaultValue=""
																		       onChange={this.changeHandler}
																		       required/>
																		<label htmlFor="email">E-mail</label>
																</div>
																<div className="input-container">
																		<input type="text"
																		       id="fullname"
																		       name="fullname"
																		       defaultValue=""
																		       onChange={this.changeHandler}
																		       required/>
																		<label htmlFor="fullname">Fullname</label>
																</div>
																<div className="input-container">
																		<input type="password"
																		       id="password"
																		       name="password"
																		       defaultValue=""
																		       onChange={this.changeHandler}
																		       required/>
																		<label htmlFor="password">Password</label>
																</div>
																<button type="submit" onClick={this.createUser} className="btn">signup</button>
																<br/>
																<button type="button" className="btn"><NavLink
																				style={{textDecoration: "none", color: "white"}} to='/login'>login page</NavLink>
																</button>
														</form>
												</div>
										</div>
								</div>
				);
		}
}

export default Signup;