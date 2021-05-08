import React, { Component } from 'react'

/** Routers links */
import { NavLink } from 'react-router-dom'

class SearchBtn extends Component {
    state = {
        // showSearchPage: this.props.showSearchPage
    }
    render() {
        return (
            <div className="open-search">
              <NavLink to="/search">
                    Add a book
              </NavLink>
            </div>
        )
    }
}

export default SearchBtn