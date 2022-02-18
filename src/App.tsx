import React, {useCallback, useEffect} from 'react';
import Todolists from './Todolists';
import './App.css'
import InputForAdd from './components/InputForAdd';
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC, FilterType,
    removeTodolistTC, setTodolistsTC, TodolistDomainType,
} from './state/todolist/todolist-reducer';
import {
    addTaskTC, changeTaskTitleTC,
    removeTaskTC,
    updateTaskStatusTC
} from './state/tasks/task-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskStatuses, TaskType} from './api/todolist-api';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';


export type TodoTaskType = {
    [key: string]: Array<TaskType>
}

function App() {
    console.log('App')

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TodoTaskType>(state => state.tasks)

    // Tasks function

    useEffect(() => {
        dispatch(setTodolistsTC())
    }, [])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }, [dispatch])
    const addTask = useCallback((todolistId: string, newTitle: string) => {
        dispatch(addTaskTC(todolistId, newTitle))
    }, [dispatch])
    const changeStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskStatusTC(todolistId, taskId, status))
    }, [dispatch])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleTC(todolistId, taskId, newTitle))
    }, [dispatch])

    // Todolists function

    const changeFilter = useCallback((todolistId: string, value: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])
    const addTodolist = useCallback((newTitle: string) => {
        dispatch(addTodolistTC(newTitle))
    }, [dispatch])
    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(todolistId, newTitle))
    }, [dispatch])


    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <InputForAdd item={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {

                            let tasksFiltered = tasks[tl.id]

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolists
                                        key={tl.id}
                                        todolistId={tl.id}
                                        todolistTitle={tl.title}
                                        tasks={tasksFiltered}
                                        filter={tl.filter}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        removeTodolist={removeTodolist}
                                        addTodolist={addTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                        changeTaskTitle={changeTaskTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
