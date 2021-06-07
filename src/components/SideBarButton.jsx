import React from 'react';
import { Button
} from '@material-ui/core';
import { StylesProvider } from "@material-ui/core/styles";

import './SideBarButton.scss';

export const SideBarButton = (props) => {

  return (
    <StylesProvider injectFirst>
      <Button className="button" onClick={props.onClick}>
        { props.children }
      </Button>
    </StylesProvider>
  )
}