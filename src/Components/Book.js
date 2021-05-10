import React from "react";

export function Book(props) {
  // this function is for error of missing images spacialy for "v"
  const imageLink = (link) => {
    if (link === undefined) {
      return link = "https://5zznly.com/thumbs/WNX5f.jpeg"
    } else {
      return link.thumbnail
    }
  }

  const BooksToShow = props.books.map(book => {
    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 192,
                backgroundImage: `url(${imageLink(book.imageLinks)})`,
              }}
            />
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(event) => props.onChangeShelf(book, event.target.value)}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{ book.title }</div>
          <div className="book-authors">{ book.authors }</div>
        </div>
      </li>
    )
  })
  return (
    <ol className="books-grid">
      {BooksToShow}
    </ol>
  );
}

export default Book;
