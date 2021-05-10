import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

import * as BooksAPI from '../BooksAPI'
import Book from "../components/Book";

export function Search(props) {
  // Variable to store the search input text
  const [Query, setQuery] = useState('');
  // Variable to store the books of the search
  const [SearchBooks, setSearchBooks] = useState([]);
  
  function onChangeShelf(book, shelf) {
    // Compare between arrays and remove duplicates
    for (let i = 0; i < props.books.length; i++) {
      const element = props.books[i];
      // compare
      if (element.id === book.id) {
        props.books.splice(i, 1);
        console.log("Warning ::: I found the same book");
      }
    }

    book.shelf = shelf;
    props.books.push(book);

    
    // componentDidUpdate
    BooksAPI.update(book, shelf)
    
    console.log(props.books);
  }

  // when user input text, this function will called
  async function handleChange(e) {
    setQuery(e.target.value);
    try {
      // Search results are not shown in the begainig
      setSearchBooks([]);

      if (e.target.value !== "") {
        // eslint-disable-next-line
        const result = await BooksAPI.search(e.target.value).then((searchBooks) => {
          console.log("before : ", searchBooks);
          
          // {error: "empty query", items: Array(0)}
          if (searchBooks.error === "empty query") {
            console.log("Error :: empty query");
            // Search results are not shown when query is empty
            setSearchBooks([]);

            document.querySelector(".emptyQuery").style.display = "block";
          } else {
            document.querySelector(".emptyQuery").style.display = "none";

            // Compare between arrays and remove duplicates
            for (let i = 0; i < searchBooks.length; i++) {
              const element = searchBooks[i];

              // add .shelf to the new element
              element.shelf = "none";

              /**
               * compare by loops
               * this function works to remove
               * books which I've from search results
               */
              for (let j = 0; j < props.books.length; j++) {
                const ele = props.books[j];

                if (element.id === ele.id) {
                  element.shelf = ele.shelf;
                }
              }
            }

            setSearchBooks(searchBooks);
            console.log("after", SearchBooks);
          }
        });
      } else {
        document.querySelector(".emptyQuery").style.display = "none";
        console.log("No results ...");
      }
    } catch (error) {
      console.log("Error is :: " + error);
    }
    console.log('search ' + e.target.value);

    if (e.target.value === '') {
      setSearchBooks([]);
    }

  }

  return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <NavLink
            className="close-search" to="/" >Close</NavLink>
          <div className="search-books-input-wrapper">
            <input value={Query} type="text" placeholder="Search by title or author" onChange={handleChange} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <p className="emptyQuery">Empty Query</p>
            <Book books={SearchBooks} onChangeShelf={onChangeShelf} />
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Search;
