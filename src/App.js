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
    book: '',
    shelf: '',

    // Search query
    query: 'IOejDAAAQBAJ',
  };

  /** Put books into state.books from API */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
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
    // change the state
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
            
            {console.log(this.state.query)}
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
