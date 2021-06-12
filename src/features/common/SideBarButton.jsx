import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    margin: '5px',
    width: '60px',
    height: '60px',
    lineHeight: '0em',
    minWidth: '30px',
  },
});

export const SideBarButton = (props) => {
  const classes = useStyles();
  const { onClick, children } = props;

  return (
    <Button className={classes.root} onClick={onClick}>
      { children }
    </Button>
  );
};

SideBarButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};

SideBarButton.defaultProps = {
  onClick: () => {},
  children: {},
};

export default SideBarButton;
