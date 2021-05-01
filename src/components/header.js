import * as React from "react"
import PropTypes from "prop-types"

// import { Button } from "@material-ui/core"
// import MovieFilterIcon from "@material-ui/icons/MovieFilter"
import { Typography } from "@material-ui/core"
const Header = ({ siteTitle }) => (
  <Typography
    style={{
      background: `#008060`,
      marginBottom: `1.45rem`,
    }}
  ></Typography>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
