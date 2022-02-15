import React, {useCallback, useEffect} from 'react';
import './App.css';
import Todolists from './Todolists';
import InputForAdd from './components/InputForAdd';
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC, FilterType,
    removeTodolistTC, setTodolistsTC, TodolistDomainType,
} from './state/todolist/todolist-reducer';
import {
    addTaskAC,
    addTaskTC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskTC,
    updateTaskStatusTC
} from './state/tasks/task-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskStatuses, TaskType} from './api/todolist-api';


export type TodoTaskType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
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
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
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
            <InputForAdd item={addTodolist}/>
            {
                todolists.map(tl => {

                    let tasksFiltered = tasks[tl.id]

                    return (
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
                    )
                })
            }

        </div>
    );
}

export default AppWithRedux;
