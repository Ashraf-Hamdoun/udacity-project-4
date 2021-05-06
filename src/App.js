import React, { Component } from "react"

/** Components */
import BooksSelves from './Components/BooksSelves'
import SearchBtn from './Components/SearchBtn'
import Header from './Components/Header'

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
  };

  /** Put books into state.books from API */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  /** Here we set arrow function to open and close Srearch */
  OpenCloseSearch = () => {
    this.setState({
      showSearchPage: true
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        ) : (
          <div className="list-books">
            
            {/** The header */}
            <Header />

            {/** My books shelves */} 
            <BooksSelves books={this.state.books} />
              
            {/** Search button */}
            <SearchBtn showSearchPage={this.OpenCloseSearch} />
            
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
