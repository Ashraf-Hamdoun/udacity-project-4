import React, { useState, useEffect } from "react";

/** Routers */
import { BrowserRouter, Route } from "react-router-dom";

// import components
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";

import * as BooksAPI from './BooksAPI'
import "./App.css";

function BooksApp() {

  const [Books, setBooks] = useState([]);
  const [Book, setBook] = useState('');

  useEffect(() => {
    // componentDidMount
    BooksAPI.getAll().then((books) => {
        setBooks(books);
      });
  }, []);

  /** Change Books Shelf */
  const onChangeShelf = (book, shelf) => {
    book.shelf = shelf;
    
    setBook(book);

    if (shelf === "none") {
      Books.splice(Books.indexOf(book), 1);
    }

    // componentDidUpdate
    BooksAPI.update(book, shelf)
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Route exact path="/">
          <Home books={Books} onChangeShelf={onChangeShelf} />
        </Route>
        <Route exact path="/search">
          <Search books={Books} />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default BooksApp;
