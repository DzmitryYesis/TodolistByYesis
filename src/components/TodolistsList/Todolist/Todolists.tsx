import React, { useCallback, useEffect } from 'react';

import { Button, ButtonGroup, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

import { Task } from './Task';

import { InputForAdd, SpanChangeTitle } from 'components';
import { Filter, RequestStatus, TaskStatuses } from 'enum';
import { setTasksTC } from 'store/thunks';
import { FilterType, RequestStatusType, TaskType } from 'types';

type TodolistType = {
  todolistId: string;
  todolistTitle: string;
  tasks: TaskType[];
  filter: FilterType;
  entityStatus: RequestStatusType;
  removeTask: (todolistId: string, taskId: string) => void;
  changeFilter: (todolistId: string, value: FilterType) => void;
  addTask: (todolistId: string, newTitle: string) => void;
  changeStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (todolistId: string, newTitle: string) => void;
  changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void;
};

export const Todolists = React.memo(
  ({
    todolistId,
    todolistTitle,
    tasks,
    filter,
    entityStatus,
    removeTask,
    changeFilter,
    addTask,
    changeStatus,
    removeTodolist,
    changeTodolistTitle,
    changeTaskTitle,
  }: TodolistType) => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(setTasksTC(todolistId));
    }, []);

    const filterAll = useCallback(
      () => changeFilter(todolistId, Filter.ALL),
      [changeFilter, todolistId],
    );
    const filterActive = useCallback(
      () => changeFilter(todolistId, Filter.ACTIVE),
      [changeFilter, todolistId],
    );
    const filterCompleted = useCallback(
      () => changeFilter(todolistId, Filter.COMPLETED),
      [changeFilter, todolistId],
    );

    const removeTodolistHandler = (): void => removeTodolist(todolistId);

    const functionForAddTask = useCallback(
      (title: string) => {
        addTask(todolistId, title);
      },
      [addTask, todolistId],
    );

    const functionForChangeTodolistTitle = useCallback(
      (newTitle: string) => {
        changeTodolistTitle(todolistId, newTitle);
      },
      [changeTodolistTitle, todolistId],
    );

    if (filter === Filter.ACTIVE) {
      // eslint-disable-next-line no-param-reassign
      tasks = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === Filter.COMPLETED) {
      // eslint-disable-next-line no-param-reassign
      tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return (
      <div>
        <h3>
          <SpanChangeTitle
            title={todolistTitle}
            onChange={functionForChangeTodolistTitle}
          />
          <IconButton
            onClick={removeTodolistHandler}
            disabled={entityStatus === RequestStatus.LOADING}
          >
            <Delete />
          </IconButton>
        </h3>
        <InputForAdd item={functionForAddTask} entityStatus={entityStatus} />
        <div>
          {tasks.map(t => (
            <Task
              key={t.id}
              todolistId={todolistId}
              task={t}
              removeTask={removeTask}
              changeStatus={changeStatus}
              changeTaskTitle={changeTaskTitle}
              entityStatus={entityStatus}
            />
          ))}
        </div>
        <div>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button
              onClick={filterAll}
              color="default"
              variant={filter === Filter.ALL ? 'outlined' : 'text'}
            >
              All
            </Button>
            <Button
              onClick={filterActive}
              color="primary"
              variant={filter === Filter.ACTIVE ? 'outlined' : 'text'}
            >
              Active
            </Button>
            <Button
              onClick={filterCompleted}
              color="secondary"
              variant={filter === Filter.COMPLETED ? 'outlined' : 'text'}
            >
              Completed
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  },
);
