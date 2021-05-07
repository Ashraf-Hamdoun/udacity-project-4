import React, { Component } from "react"

/** Components */
import BooksSelves from './Components/BooksSelves'
import SearchBtn from './Components/SearchBtn'
import Header from './Components/Header'
import SearchPage from './pages/SearchPage'

// This's the books which come from the api of Udacity
import * as BooksAPI from "./BooksAPI";

/** The styles from css file */
import "./App.css";

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,

    // books
    books: [],
    
    // Update Books args
    /** We make these variables
     * to associate onChangeShelf
     * with componentDidUpdate */
    book: '',
    shelf: '',

    // Update Books API data
    updatedBooks: [],
  };

  /** Put books into state.books from API */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books,

        // We must define these variables to prevent any errors with Update api
        book: books[0],
        shelf: books[0].shelf
      })
    })
  }

  /** Update books API data */
  componentDidUpdate(book, newShelf) {
    book = this.state.book;
    newShelf = this.state.shelf;
    
    BooksAPI.update(book, newShelf).then((updatedBooks) => {
      this.setState({updatedBooks})
    })
  }
  
  /** Here we set arrow function to open and close Srearch */
  OpenSearch = () => {
    this.setState({
      showSearchPage: true
    })
  }
  
  CloseSearch = () => {
    this.setState({
      showSearchPage: false
    })
  }
  
  /** Change Books Shelf */
  onChangeShelf = (book, newShelf) => {
    book.shelf = newShelf;
    // change the state of the update function
    this.setState({
      book: book,
      shelf: newShelf
    })
  }

  // Search
  sewrchBook() {
    BooksAPI.search().then((query) => {
      this.setState({query})
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage showSearchPage={this.CloseSearch}/>
          ) : (
            <div className="list-books">
            
            {/** The header */}
            <Header />

            {/** My books shelves */} 
            <BooksSelves books={this.state.books} onChangeShelf={this.onChangeShelf}/>
              
            {/** Search button */}
            <SearchBtn showSearchPage={this.OpenSearch} />
            
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
