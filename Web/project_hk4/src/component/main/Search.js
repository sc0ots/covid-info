import React, { Component } from 'react';
import "../../css/search.css"

class Search extends Component {
    render() {
        return (
            <div className="search">
                <input className="search-input"></input>
                <i class='bx bx-search'></i>
            </div>
        );
    }
}

export default Search;