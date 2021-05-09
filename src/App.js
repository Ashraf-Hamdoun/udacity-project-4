import React, { Component } from "react";

/** Routers */
import { BrowserRouter, Route } from "react-router-dom";

/** Components */
import SearchPage from "./pages/SearchPage";
import Home from "./pages/Home";

// This's the books which come from the api of Udacity
import * as BooksAPI from "./BooksAPI";

/** The styles from css file */
import "./App.css";

class BooksApp extends Component {
  state = {
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

  /** Change Books Shelf */
  onChangeShelf = (book, shelf) => {
    book.shelf = shelf;
    // change the state of the update function
    this.setState({
      book: book,
      shelf: shelf,
    });
    console.log(this.state.books);

    if (shelf === "none") {
      this.state.books.splice(this.state.books.indexOf(book), 1);
    }
  };

  // Search
  searchBook = async (e) => {
    try {
      // input text
      const InputText = e.target.value;

      if (InputText !== "") {
        // Search results are not shown in the begainig
        this.setState({
          dataOfSearch: [],
        });

        // eslint-disable-next-line
        const result = await BooksAPI.search(InputText).then((dataOfSearch) => {
          console.log("before", dataOfSearch);
          /**
           *  Invalid queries are handled and prior search results are not shown
           * {error: "empty query", items: Array(0)}
           */

          if (dataOfSearch.error === "empty query") {
            console.log("Error :: empty query");
            // Search results are not shown when query is empty
            this.setState({
              dataOfSearch: [],
            });
            document.querySelector(".emptyQuery").style.display = "block";
          } else {
            document.querySelector(".emptyQuery").style.display = "none";

            // Compare between arrays and remove duplicates
            for (let i = 0; i < dataOfSearch.length; i++) {
              const element = dataOfSearch[i];

              // add .shelf to the new element
              element.shelf = "none";

              /**
               * compare by loops
               * this function works to remove
               * books which I've from search results
               */
              for (let j = 0; j < this.state.books.length; j++) {
                const ele = this.state.books[j];

                if (element.id === ele.id) {
                  element.shelf = ele.shelf;
                }
              }
            }

            this.setState({ dataOfSearch });
            console.log("after", dataOfSearch);
            console.log(InputText);
          }
        });
      } else {
        document.querySelector(".emptyQuery").style.display = "none";

        // Search results are not shown when all of the text is deleted
        this.setState({
          dataOfSearch: [],
        });

        console.log("No results ...");
      }
    } catch (error) {
      console.log("Error is :: " + error);
    }
  };

  // Add new book from search
  AddFromSearch = (book, shelf) => {
    
    // Compare between arrays and remove duplicates
    for (let i = 0; i < this.state.books.length; i++) {
      const element = this.state.books[i];
      // compare
      if (element.id === book.id) {
        this.state.books.splice(i, 1);
        console.log("Warning ::: I found the same book");
      }
      
    }
    
    if (shelf === "none") {
      this.state.dataOfSearch.splice(this.state.dataOfSearch.indexOf(book), 1);
      console.log("Book has removed from search result");
    } else {
      
      book.shelf = shelf;
      this.state.books.push(book);

      // change the state of the update function
      this.setState({
        // dataOfSearch: dataOfSearch,
        book: book,
        shelf: shelf,
      });
      console.log(this.state.books);
    }
  };

  // reset books after search
  resetBooks = () => {
    this.setState({
      dataOfSearch: [],
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/">
            <Home
              onChangeShelf={this.onChangeShelf}
              showSearchPage={this.OpenSearch}
              books={this.state.books}
            />
          </Route>

          <Route path="/search">
            <SearchPage
              showSearchPage={this.CloseSearch}
              searchBook={this.searchBook}
              infos={this.state.dataOfSearch}
              onChangeShelf={this.AddFromSearch}
              resetBooks={this.resetBooks}
            />
          </Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
