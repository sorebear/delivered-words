import React from 'react';
import Link from 'gatsby-link';
import { connect } from 'react-redux';

const SecondPage = (props) => (
  <div>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <p>I'm using Redux to show {props.test}</p>
    <Link to="/">Go back to the homepage</Link>
    <Link to="/BookDeck">Go To Book Deck</Link>
  </div>
)

function mapStateToProps(state) {
  return {
    test: state.test.test
  }
}

export default connect(mapStateToProps, null)(SecondPage);