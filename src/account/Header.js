import React from "react";
import 'materialize-css';
import {NavLink} from "react-router-dom";

class Headerr extends React.Component {
    render() {
        return (
            <div>
                <NavLink to="https://google.com">ABC</NavLink>
                <ul id="dropdown1" className="dropdown-content">
                    <li><a href="https://google.com">one</a></li>
                    <li><a href="https://google.com">two</a></li>
                    <li className="divider">1</li>
                    <li><a href="https://google.com">three</a></li>
                </ul>
                <nav>
                    <div className="nav-wrapper">
                        <a href="https://google.com" className="brand-logo">Logo</a>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="https://google.com">Sass</a></li>
                            <li><a href="https://google.com">Components</a></li>
                            <li><a className="dropdown-trigger" href="https://google.com" data-target="dropdown1">Dropdown<i
                                className="material-icons right">arrow_drop_down</i></a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Headerr;