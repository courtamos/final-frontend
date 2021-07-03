import { React } from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import TestTask from './TestTask';

const TestColumn = (props) => {
  const { column, tasks } = props;

  const taskList = tasks.map((task, index) => (
    <TestTask
      key={task.id}
      index={index}
      task={task}
    />
  ));

  return (
    <>
      <div>
        {column.title}
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
      </div>
    </>
  );
};

TestColumn.propTypes = {
  column: PropTypes.instanceOf(Object),
  tasks: PropTypes.instanceOf(Array),
};

TestColumn.defaultProps = {
  column: 2,
  tasks: [],
};

export default TestColumn;
