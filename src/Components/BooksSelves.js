import React, { Component } from 'react'
import BookSelf from './BookShelf'

class BooksSelves extends Component {
  render() {
      const { books } = this.props

      /** Make a map on the array and filter it by its .shelf */
      let currentlyReading = books.filter(book => {
          return book.shelf === "currentlyReading"
      })
      let wantToRead = books.filter(book => {
        return book.shelf === "wantToRead"
      })
      let read = books.filter(book => {
        return book.shelf === "read"
      })
      
        return (
            <div className="list-books-content">
              <div>
                <BookSelf title="Currently Reading" shelf={currentlyReading}/>
                <BookSelf title="Want to Read" shelf={wantToRead}/>
                <BookSelf title="Read" shelf={read}/>
              </div>
            </div>
        )
    }
}

export default BooksSelves;