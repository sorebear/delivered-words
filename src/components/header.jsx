import React from 'react'
import Link from 'gatsby-link'
import { connect } from 'react-redux';

const Header = (props) => (
  <div
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 1240,
        padding: '1.45rem 1.0875rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {props.siteTitle}
        </Link>
      </h1>
      <h2 style={{ margin: 0, color: 'white' }}>
        Score: { props.board.players[props.board.activePlayer].score }
      </h2>
    </div>
  </div>
)

function mapStateToProps(state) {
  return {
    board: state.board
  }
}

export default connect(mapStateToProps)(Header);