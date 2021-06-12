import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import Tooltip from '@material-ui/core/Tooltip';
// import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core';

import '../../styles/Jobs-resources.scss';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

export default function TemporaryDrawer() {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className="jobResources-sidebar"
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="jobResources">
        <LightTooltip title="LinkedIn" aria-label="LinkedIn" placement="left">
          <a href="http://linkedin.com" target="_blank" rel="noreferrer">
            <img src="https://content.stocktrak.com/wp-content/uploads/2016/10/linkedin-logo.png" alt="logo" width="50px" />
          </a>
        </LightTooltip>
        <LightTooltip title="Indeed" aria-label="Indeed" placement="left">
          <a href="https://ca.indeed.com/" target="_blank" rel="noreferrer">
            <img src="https://logo.clearbit.com/indeed.com" alt="logo" width="50px" />
          </a>
        </LightTooltip>
        <LightTooltip title="Zip Recruiter" aria-label="Zip Recruiter" placement="left">
          <a href="https://www.ziprecruiter.com/candidate/suggested-jobs" target="_blank" rel="noreferrer">
            <img src="data:image/png;base64,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" alt="logo" width="70px" />
          </a>
        </LightTooltip>
        <LightTooltip title="Monster" aria-label="Monster" placement="left">
          <a href="https://hiring.monster.com/?intcid=HEADER_hp" target="_blank" rel="noreferrer">
            <img src="https://logo.clearbit.com/monster.com" alt="logo" width="50px" />
          </a>
        </LightTooltip>
        <LightTooltip title="Glassdoor" aria-label="Glassdoor" placement="left">
          <a href="https://www.glassdoor.ca/index.htm?countryRedirect=true" target="_blank" rel="noreferrer">
            <img src="https://logo.clearbit.com/glassdoor.com" alt="logo" width="50px" />
          </a>
        </LightTooltip>
      </div>
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Tooltip title="Job Resources" aria-label="Job Resources">
            <Fab
              variant="extended"
              onClick={toggleDrawer(anchor, true)}
              style={{
                position: 'fixed', bottom: 30, right: 30, height: 70, width: 70, borderRadius: 50, backgroundColor: '#34acba',
              }}
            >
              <WorkOutlineIcon fontSize="medium" style={{ color: '#FFFFFF' }} />
            </Fab>
          </Tooltip>
          <Drawer
            anchor="right"
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
