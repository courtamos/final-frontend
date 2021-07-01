/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import { Box } from '@material-ui/core';
import DashboardColumnHeading from './DashboardColumnHeading';
import JobItem from '../../components/JobItem';

const DashboardColumn = (props) => {
  const {
    title, color, items, index, tickUrl,
  } = props;
  const jobItems = items.map((item) => (
    <JobItem
      key={item.id}
      id={item.id}
      index={index}
      company={item.company}
      title={item.title}
      description={item.details}
      location={item.location}
      salary={item.salary}
      status={item.status}
      url={item.url}
      contact_name={item.contact_name}
      contact_phone={item.contact_phone}
      contact_email={item.contact_email}
      contact_socialmedia={item.contact_socialmedia}
      resume_url={item.resume_url}
      coverletter_url={item.coverletter_url}
      extra_url={item.extra_url}
      event_title={item.events.length > 0 ? item.events[0].title : ''}
      event_expired={item.events.length > 0 ? item.events[0].expired : false}
      event_details={item.events.length > 0 ? item.events[0].details : ''}
      event_date={item.events.length > 0 ? item.events[0].date : ''}
      event_location={item.events.length > 0 ? item.events[0].location : ''}
      event_jobid={item.events.length > 0 ? item.events[0].job_id : undefined}
      event_id={item.events.length > 0 ? item.events[0].id : undefined}
    />
  ));

  return (
<<<<<<< HEAD
    <Box width={1}>
      <DashboardColumnHeading title={title} color={color} />
      <Droppable droppableId={colId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Box p={0.5}>
              {jobItems}
              {provided.placeholder}
            </Box>
          </div>
        )}
      </Droppable>
=======
    <Box width={1} style={{ height: '100%' }} p="5px">
      <DashboardColumnHeading title={title} color={color} index={index} tickUrl={tickUrl} />
      {jobItems}
>>>>>>> 8706b87e7608a0cb7c513a3913db884d670f397e
    </Box>
  );
};

DashboardColumn.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  colId: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  index: PropTypes.number,
  tickUrl: PropTypes.string,
};

DashboardColumn.defaultProps = {
  title: 'Category',
  color: '#ee6a7c',
  items: [{
    company: 'Facebook',
    title: 'Full-Stack Web Developer',
    description: 'Full Time, Remote',
    location: 'Calgary, AB',
  }],
  index: 0,
  tickUrl: 'https://i.imgur.com/rr4anU1.png',
};

export default DashboardColumn;
