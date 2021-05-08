import React, { Component } from "react";

/** Routers links */
import { NavLink } from 'react-router-dom'

import Book from "../Components/Book";

class SearchPage extends Component {
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <NavLink className="close-search" to="/">
            Close
          </NavLink>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.props.searchBook}
            />
          </div>
        </div>
        <div className="search-books-results">
          
          <p class="emptyQuery">empty query</p>
          
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
