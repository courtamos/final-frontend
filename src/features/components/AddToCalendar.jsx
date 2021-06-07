import React from 'react';
import AddToCalendar from 'react-add-to-calendar';

let icon = { 'calendar-plus-o': 'left' };

export default class Calendar extends React.Component {
  static displayName = 'AddToCalendar';

  state = {
    event: {
      title: 'Sample Event',
      description: 'This is the sample event provided as an example only',
      location: 'Portland, OR',
      startTime: '2016-09-16T20:15:00-04:00',
      endTime: '2016-09-16T21:45:00-04:00'
    }
  };

  render() {
    return <AddToCalendar event={this.state.event} buttonTemplate={icon}/>;
  };
}