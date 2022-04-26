import React, { useCallback, useEffect } from 'react';

import { Grid, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { Todolists } from './Todolist';

import { InputForAdd } from 'components';
import { PATH, RequestStatus, TaskStatuses } from 'enum';
import { changeTodolistFilterAC } from 'store/actions';
import { selectIsLoggedIn, selectTasks, selectTodolists } from 'store/selectors';
import {
  addTaskTC,
  addTodolistTC,
  changeTaskTitleTC,
  changeTodolistTitleTC,
  removeTaskTC,
  removeTodolistTC,
  setTodolistsTC,
  updateTaskStatusTC,
} from 'store/thunks';
import { FilterType } from 'types';

export const TodolistsList: React.FC = () => {
  const dispatch = useDispatch();
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Tasks function

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(setTodolistsTC());
  }, []);

  const removeTask = useCallback(
    (todolistId: string, taskId: string) => {
      dispatch(removeTaskTC(todolistId, taskId));
    },
    [dispatch],
  );
  const addTask = useCallback(
    (todolistId: string, newTitle: string) => {
      dispatch(addTaskTC(todolistId, newTitle));
    },
    [dispatch],
  );
  const changeStatus = useCallback(
    (todolistId: string, taskId: string, status: TaskStatuses) => {
      dispatch(updateTaskStatusTC(todolistId, taskId, status));
    },
    [dispatch],
  );
  const changeTaskTitle = useCallback(
    (todolistId: string, taskId: string, newTitle: string) => {
      dispatch(changeTaskTitleTC(todolistId, taskId, newTitle));
    },
    [dispatch],
  );

  // Todolists function

  const changeFilter = useCallback(
    (todolistId: string, value: FilterType) => {
      dispatch(changeTodolistFilterAC(todolistId, value));
    },
    [dispatch],
  );
  const removeTodolist = useCallback(
    (todolistId: string) => {
      dispatch(removeTodolistTC(todolistId));
    },
    [dispatch],
  );
  const addTodolist = useCallback(
    (newTitle: string) => {
      dispatch(addTodolistTC(newTitle));
    },
    [dispatch],
  );
  const changeTodolistTitle = useCallback(
    (todolistId: string, newTitle: string) => {
      dispatch(changeTodolistTitleTC(todolistId, newTitle));
    },
    [dispatch],
  );

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <InputForAdd item={addTodolist} entityStatus={RequestStatus.SUCCEEDED} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map(tl => {
          const tasksFiltered = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: '10px' }}>
                <Todolists
                  key={tl.id}
                  todolistId={tl.id}
                  todolistTitle={tl.title}
                  tasks={tasksFiltered}
                  filter={tl.filter}
                  entityStatus={tl.entityStatus}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeStatus={changeStatus}
                  removeTodolist={removeTodolist}
                  changeTodolistTitle={changeTodolistTitle}
                  changeTaskTitle={changeTaskTitle}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
