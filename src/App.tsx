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
import { Routes, Route, Navigate } from 'react-router-dom';

import { ErrorSnackbar } from './components/ErrorSnackbar';
import { Login } from './components/Login/Login';
import { TodolistsList } from './components/TodolistsList/TodolistsList';
import { initializeAppTC, logoutTC } from './store/reducers/auth-reducer';

import { selectStatus } from 'store/selectors/selectApp';
import { selectIsInitialized, selectIsLoggedIn } from 'store/selectors/selectAuth';

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
        {status === 'loading' && <LinearProgress color="secondary" />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path="/" element={<TodolistsList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<h1>404:PAGE NOT FOUND</h1>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Container>
    </div>
  );
};
