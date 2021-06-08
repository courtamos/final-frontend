import React from 'react';
import { Button } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import './SideBarButton.scss';

export const SideBarButton = (props) => {
  const { onClick, children } = props;

  return (
    <StylesProvider injectFirst>
      <Button className="button" onClick={onClick}>
        { children }
      </Button>
    </StylesProvider>
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
