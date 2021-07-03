import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import { Box, Grid } from '@material-ui/core';
import DashboardColumnHeading from './DashboardColumnHeading';
import JobItem from '../../components/JobItem';

const DashboardColumn = (props) => {
  const {
    index, column, tasks,
  } = props;

  const taskList = tasks.map((task, idx) => (
    <JobItem
      key={task.id}
      index={idx}
      task={task}
    />
  ));

  return (
    <Grid item xs={12} lg>
      <Box display="flex">
        <Box width={1} style={{ height: '100%' }} p="5px">
          <DashboardColumnHeading
            title={column.title}
            index={index}
            tickUrl={column.tickUrl}
          />
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
      </Box>
    </Grid>
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
