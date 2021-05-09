import React, { Component } from "react";

/** Routers links */
import { NavLink } from 'react-router-dom'

import Book from "../Components/Book";

class SearchPage extends Component {
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <NavLink className="close-search" to="/" onClick={this.props.resetBooks}>
            Close
          </NavLink>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onKeyUp={this.props.searchBook}
            />
          </div>
        </div>
        <div className="search-books-results">
          
          <p className="emptyQuery">empty query</p>
          
          <ol className="books-grid">
            <Book
              infos={this.props.infos}
              onChangeShelf={this.props.onChangeShelf}
            />
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
