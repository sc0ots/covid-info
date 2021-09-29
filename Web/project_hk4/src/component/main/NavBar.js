import React, { Component } from "react";
import {
    Link
} from "react-router-dom";
import "../../css/navbar.css"



class NavBar extends Component {
    render() {
        return (
            <div className="navbar">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/" className="nav-item-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-item-link">About</Link>
                    </li>
                    {/* <div className="search">
                        <i className='bx bx-search search-icon'></i>
                        <input className="search-input" placeholder="Search..."></input>
                    </div> */}
                </ul>

                <div className="translate">
                    <div id="google_translate_element"></div>
                </div>
            </div>
        )
    }
}
export default NavBar;