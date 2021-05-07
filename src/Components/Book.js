import React, { Component } from "react";

class Book extends Component {
  render() {
    const { infos } = this.props;
    const post = infos.map((element) => {
      return (
        <li key={element.id}>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                    backgroundImage: `url(${element.imageLinks.thumbnail})`,
                }}
              />
              <div className="book-shelf-changer">
                <select value={element.shelf} onChange={(event) => this.props.onChangeShelf(element, event.target.value)}>
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
            <div className="book-title">{ element.title }</div>
            <div className="book-authors">{ element.authors }</div>
          </div>
        </li>
      );
    });

    return <ol className="books-grid">{post}</ol>;
  }
}

export default Book;
