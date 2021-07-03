/* eslint-disable react/jsx-props-no-spreading */
import { React } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

const TestTask = (props) => {
  const { task, index } = props;

  return (
    <Draggable
      draggableId={task.id.toString()}
      index={index}
    >
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.title}
        </div>
      )}
    </Draggable>
  );
};

TestTask.propTypes = {
  task: PropTypes.instanceOf(Object),
  index: PropTypes.number,
};

TestTask.defaultProps = {
  task: {},
  index: 0,
};

export default TestTask;
