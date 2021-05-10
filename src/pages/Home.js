import React from "react";
import { NavLink } from 'react-router-dom';

import BookShelves from "../components/BookShelves";

export function Home(props) {

  return (
    <div className="">
      <div>
        <div className="list-books">
          
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          
          <div className="list-books-content">
            <BookShelves books={props.books} onChangeShelf={props.onChangeShelf} />
          </div>
          
          <div className="open-search">
            <NavLink to="/search">
              Add a book
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
