import React, { Component } from 'react'

class SearchBtn extends Component {
    state = {
        // showSearchPage: this.props.showSearchPage
    }
    render() {
        return (
            <div className="open-search">
              <button onClick={this.props.showSearchPage}>
                    Add a book
              </button>
            </div>
        )
    }
}

export default SearchBtn