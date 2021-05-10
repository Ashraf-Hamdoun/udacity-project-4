import React from "react";
import BookShelf from "./BookShelf";

export function BookShelves(props) {

  function filterBooks(shelf) {
    let theBooks = props.books.filter((book) => {
      return book.shelf === shelf;
    });
    return theBooks
  }

  return (
    <div>
      <BookShelf title="Currently Reading" books={filterBooks("currentlyReading")} onChangeShelf={props.onChangeShelf} />
      <BookShelf title="Want to Read" books={filterBooks("wantToRead")} onChangeShelf={props.onChangeShelf} />
      <BookShelf title="Read" books={filterBooks("read")} onChangeShelf={props.onChangeShelf} />
    </div>
  );
}

export default BookShelves;
