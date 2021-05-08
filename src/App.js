import React, { Component } from "react";

/** Components */
import BooksSelves from "./Components/BooksSelves";
import SearchBtn from "./Components/SearchBtn";
import Header from "./Components/Header";
import SearchPage from "./pages/SearchPage";

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
    book: "",
    shelf: "",

    // Update Books API data
    updatedBooks: [],

    // search
    dataOfSearch: [],
  };

  /** Put books into state.books from API */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books,

        // We must define these variables to prevent any errors with Update api
        book: books[0],
        shelf: books[0].shelf,
      });
    });
  }

  /** Update books API data */
  componentDidUpdate(book, newShelf) {
    book = this.state.book;
    newShelf = this.state.shelf;

    BooksAPI.update(book, newShelf).then((updatedBooks) => {
      this.setState({ updatedBooks });
    });
  }

  /** Here we set arrow function to open and close Srearch */
  OpenSearch = () => {
    this.setState({
      showSearchPage: true,
    });
  };

  CloseSearch = () => {
    this.setState({
      showSearchPage: false,
    });
  };

  /** Change Books Shelf */
  onChangeShelf = (book, shelf) => {
    if (shelf === "none") {
      this.state.books.splice(this.state.books.indexOf(book), 1);
    } else {
      book.shelf = shelf;
      // change the state of the update function
      this.setState({
        book: book,
        shelf: shelf,
      });
      console.log(this.state.books);
    }
  };

  // Search
  searchBook = async (e) => {
    try {
      // input text
      const InputText = e.target.value;
      if (InputText !== "") {
        const result = await BooksAPI.search(InputText).then((dataOfSearch) => {
          // Compare between arrays and remove duplicates
          for (let i = 0; i < dataOfSearch.length; i++) {
            const element = dataOfSearch[i];

            // add .shelf to the new element
            element.shelf = "none";

            // compare by loops
            for (let j = 0; j < this.state.books.length; j++) {
              const ele = this.state.books[j];

              if (element.id === ele.id) {
                dataOfSearch.splice(i, 1);
                console.log("i found it");
              }
            }
          }

          this.setState({ dataOfSearch });
          console.log(dataOfSearch);
        });
      } else {
        console.log("ok");
      }
    } catch (error) {
      console.log("Error is :: " + error);
    }
  };

  // Add new book from search
  AddFromSearch = (book, shelf) => {
    if (shelf === "none") {
      this.state.dataOfSearch.splice(this.state.dataOfSearch.indexOf(book), 1);
      console.log("Book has removed from search result");
    } else {
      book.shelf = shelf;
      this.state.books.push(book);

      // Compare between arrays and remove duplicates
      for (let i = 0; i < this.state.dataOfSearch.length; i++) {
        const element = this.state.dataOfSearch[i];
        // compare by loops
        for (let j = 0; j < this.state.books.length; j++) {
          const ele = this.state.books[j];

          if (element.id === ele.id) {
            this.state.dataOfSearch.splice(i, 1);
            console.log("i found it");
          }
        }
      }

      // change the state of the update function
      this.setState({
        // dataOfSearch: dataOfSearch,
        book: book,
        shelf: shelf,
      });
      console.log(this.state.books);
    }
  };
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage
            showSearchPage={this.CloseSearch}
            searchBook={this.searchBook}
            infos={this.state.dataOfSearch}
            onChangeShelf={this.AddFromSearch}
          />
        ) : (
          <div className="list-books">
            {/** The header */}
            <Header />

            {/** My books shelves */}
            <BooksSelves
              books={this.state.books}
              onChangeShelf={this.onChangeShelf}
            />

            {/** Search button */}
            <SearchBtn showSearchPage={this.OpenSearch} />
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
