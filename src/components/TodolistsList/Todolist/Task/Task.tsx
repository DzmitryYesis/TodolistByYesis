import React, { ChangeEvent, useCallback } from 'react';

import { Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { SpanChangeTitle } from 'components';
import { RequestStatus, TaskStatuses } from 'enum';
import { RequestStatusType, TaskType } from 'types';

type TaskComponentPropsType = {
  todolistId: string;
  task: TaskType;
  entityStatus: RequestStatusType;
  removeTask: (todolistId: string, taskId: string) => void;
  changeStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void;
  changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void;
};

export const Task = React.memo(
  ({
    todolistId,
    task,
    entityStatus,
    removeTask,
    changeStatus,
    changeTaskTitle,
  }: TaskComponentPropsType) => {
    const removeTaskHandler = useCallback(
      () => removeTask(todolistId, task.id),
      [removeTask, todolistId, task.id],
    );

    const changeStatusTasksHandler = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked;
        changeStatus(
          todolistId,
          task.id,
          newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
        );
      },
      [changeStatus, todolistId, task.id],
    );

    const functionForChangeTaskTitle = useCallback(
      (newTitle: string) => {
        changeTaskTitle(todolistId, task.id, newTitle);
      },
      [changeTaskTitle, todolistId, task.id],
    );

    return (
      <div
        key={task.id}
        className={task.status === TaskStatuses.Completed ? 'is-done' : ''}
      >
        <Checkbox
          checked={task.status === TaskStatuses.Completed}
          onChange={changeStatusTasksHandler}
          color="primary"
          disabled={entityStatus === RequestStatus.LOADING}
        />
        <SpanChangeTitle title={task.title} onChange={functionForChangeTaskTitle} />
        <IconButton
          onClick={removeTaskHandler}
          disabled={entityStatus === RequestStatus.LOADING}
        >
          <Delete />
        </IconButton>
      </div>
    );
  },
);
