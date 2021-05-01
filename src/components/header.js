import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
// import { Button } from "@material-ui/core"
// import MovieFilterIcon from "@material-ui/icons/MovieFilter"
import { Typography } from "@material-ui/core"
const Header = ({ siteTitle }) => (
  <Typography
    style={{
      background: `#008060`,
      marginBottom: `1.45rem`,
    }}
  >
    {/* <Button startIcon={<MovieFilterIcon fontSize="inherit" />}></Button> */}
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </Typography>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
