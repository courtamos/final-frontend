import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import { Box } from '@material-ui/core';
import DashboardColumnHeading from './DashboardColumnHeading';
import JobItem from '../../components/JobItem';

const DashboardColumn = (props) => {
  const {
    title, color, index, tickUrl, column, tasks,
  } = props;

  const taskList = tasks.map((task, index) => (
    <JobItem
      key={task.id}
      index={index}
      task={task}
      // id={item.id}
      // company={item.company}
      // title={item.title}
      // description={item.details}
      // location={item.location}
      // salary={item.salary}
      // status={item.status}
      // url={item.url}
      // contact_name={item.contact_name}
      // contact_phone={item.contact_phone}
      // contact_email={item.contact_email}
      // contact_socialmedia={item.contact_socialmedia}
      // resume_url={item.resume_url}
      // coverletter_url={item.coverletter_url}
      // extra_url={item.extra_url}
      // event_title={item.events.length > 0 ? item.events[0].title : ''}
      // event_expired={item.events.length > 0 ? item.events[0].expired : false}
      // event_details={item.events.length > 0 ? item.events[0].details : ''}
      // event_date={item.events.length > 0 ? item.events[0].date : ''}
      // event_location={item.events.length > 0 ? item.events[0].location : ''}
      // event_jobid={item.events.length > 0 ? item.events[0].job_id : undefined}
      // event_id={item.events.length > 0 ? item.events[0].id : undefined}
    />
  ));
  // const jobItems = items.map((item) => (
  //   <JobItem
  //     key={item.id}
  //     id={item.id}
  //     company={item.company}
  //     title={item.title}
  //     description={item.details}
  //     location={item.location}
  //     salary={item.salary}
  //     status={item.status}
  //     url={item.url}
  //     contact_name={item.contact_name}
  //     contact_phone={item.contact_phone}
  //     contact_email={item.contact_email}
  //     contact_socialmedia={item.contact_socialmedia}
  //     resume_url={item.resume_url}
  //     coverletter_url={item.coverletter_url}
  //     extra_url={item.extra_url}
  //     event_title={item.events.length > 0 ? item.events[0].title : ''}
  //     event_expired={item.events.length > 0 ? item.events[0].expired : false}
  //     event_details={item.events.length > 0 ? item.events[0].details : ''}
  //     event_date={item.events.length > 0 ? item.events[0].date : ''}
  //     event_location={item.events.length > 0 ? item.events[0].location : ''}
  //     event_jobid={item.events.length > 0 ? item.events[0].job_id : undefined}
  //     event_id={item.events.length > 0 ? item.events[0].id : undefined}
  //   />
  // ));

  return (
    <Box width={1} style={{ height: '100%' }} p="5px">
      <DashboardColumnHeading title={title} color={color} index={index} tickUrl={tickUrl} />
      {/* {jobItems} */}
      <Droppable droppableId={column.id.toString()}>
        {(provided) => (
          <div
            ref={provided.innerRef}
              // eslint-disable-next-line react/jsx-props-no-spreading
            {...provided.droppableProps}
          >
            { taskList }
            { provided.placeholder}
          </div>
        )}
      </Droppable>
    </Box>
  );
};

DashboardColumn.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  index: PropTypes.number,
  tickUrl: PropTypes.string,
  column: PropTypes.instanceOf(Object),
  tasks: PropTypes.instanceOf(Array),
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
  column: {},
  tasks: [],
};

export default DashboardColumn;
