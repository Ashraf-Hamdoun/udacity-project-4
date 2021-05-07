import React, { Component } from "react";
import BookSelf from "./BookShelf";

class BooksSelves extends Component {
  render() {
    const { books } = this.props;

    /** Make a map on the array and filter it by its .shelf */
    let currentlyReading = books.filter((book) => {
      return book.shelf === "currentlyReading";
    }); // Books currently reading

    let wantToRead = books.filter((book) => {
      return book.shelf === "wantToRead";
    }); // Books wanna to read

    let read = books.filter((book) => {
      return book.shelf === "read";
    }); // Books have read

    return (
      <div className="list-books-content">
        <div>
          {/* part where books currentlyReading are shown */}
          <BookSelf title="Currently Reading" shelf={currentlyReading} onChangeShelf={this.props.onChangeShelf}/>

          {/* part where books wantToRead are shown */}
          <BookSelf title="Want to Read" shelf={wantToRead} onChangeShelf={this.props.onChangeShelf}/>

          {/* part where books Read are shown */}
          <BookSelf title="Read" shelf={read} onChangeShelf={this.props.onChangeShelf}/>
        </div>
      </div>
    );
  }
}

export default BooksSelves;
