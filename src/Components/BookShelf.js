import React from "react";
import Book from "./Book";

export function BookShelf(props) {
  
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <Book books={props.books} onChangeShelf={props.onChangeShelf} />
      </div>
    </div>
  );
}

export default BookShelf;
