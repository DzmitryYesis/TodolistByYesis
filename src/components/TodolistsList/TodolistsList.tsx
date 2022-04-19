import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './../../store/store';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    FilterType,
    removeTodolistTC,
    setTodolistsTC,
    TodolistDomainType
} from './../../store/reducers/todolist-reducer';
import {addTaskTC, changeTaskTitleTC, removeTaskTC, updateTaskStatusTC} from './../../store/reducers/task-reducer';
import {TaskStatuses, TodoTaskType} from './../../api/todolist-api';
import {Grid, Paper} from '@material-ui/core';
import InputForAdd from './../InputForAdd';
import Todolists from './Todolist/Todolists';
import {Navigate} from 'react-router-dom';

export const TodolistsList: React.FC = () => {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TodoTaskType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    // Tasks function

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
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

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <>
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
                                entityStatus={tl.entityStatus}
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
    </>
}