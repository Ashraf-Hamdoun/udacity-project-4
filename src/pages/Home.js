import React, { Component } from "react";

import BooksSelves from "../Components/BooksSelves";
import SearchBtn from "../Components/SearchBtn";
import Header from "../Components/Header";

class Home extends Component {
  render() {
    return (
      <div className="list-books">
        {/** The header */}
        <Header />

        {/** My books shelves */}
        <BooksSelves
          books={this.props.books}
          onChangeShelf={this.props.onChangeShelf}
        />

        {/** Search button */}
        <SearchBtn showSearchPage={this.props.showSearchPage} />
      </div>
    );
  }
}

export default Home;
