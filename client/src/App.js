import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Main from "./auth/Main";
import React from "react";
import Activate from "./auth/Activate";
import {SimpleNav} from "simple-nostate-responsive-navigation";
import Headerr from "./account/Header";

function App() {
    return (
        <Router>
            {/*<SimpleNav links={[
                { href: "/", content: "Home" },
                { href: "https://google.com", content: "Messages" },
                { href: "#", content: "Friends" },
                { href: "#", content: "Auth" }
            ]}*/}
            />
            <Switch>
                <Route path="/signup" component={Signup}/>
                <Route path="/login" component={Login}/>
                <Route path="/profile" component={Headerr}/>
                <Route path="/activate" component={Activate}/>
                <Route exact path="/" component={Main}/>
            </Switch>
        </Router>
    )
}

export default App;