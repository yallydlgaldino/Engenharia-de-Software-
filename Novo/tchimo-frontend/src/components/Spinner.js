import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  progress: {
    width: '1em',
    height: '1em'
  }
});

function Spinner(props) {
  const { classes, size, color } = props
  return (
    <>
      <CircularProgress className={classes.progress} size={size} style={{'color': color}} />
    </>
  );
}

Spinner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Spinner);
