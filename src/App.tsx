import React, { ReactElement, useEffect } from 'react';

import './App.css';
import {
  AppBar,
  Button,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ErrorSnackbar } from 'components/ErrorSnackbar/ErrorSnackbar';
import { Login } from './components/Login/Login';
import { TodolistsList } from './components/TodolistsList/TodolistsList';

import { PATH, RequestStatus } from 'enum';
import { selectIsInitialized, selectIsLoggedIn, selectStatus } from 'store/selectors';
import { initializeAppTC, logoutTC } from 'store/thunks';

export const App = (): ReactElement => {
  const dispatch = useDispatch();

  const status = useSelector(selectStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  const logoutHandler = (): void => {
    dispatch(logoutTC());
  };

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Log Out
            </Button>
          )}
        </Toolbar>
        {status === RequestStatus.LOADING && <LinearProgress color="secondary" />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={PATH.TODOLIST_LIST} element={<TodolistsList />} />
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={PATH.PAGE404} element={<h1>404:PAGE NOT FOUND</h1>} />
          <Route path={PATH.UNKNOWN} element={<Navigate to={PATH.PAGE404} />} />
        </Routes>
      </Container>
    </div>
  );
};
