import React, {useCallback} from 'react';
import './App.css';
import Todolists, {TasksType} from './Todolists';
import InputForAdd from './components/InputForAdd';
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
} from './state/todolist/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks/task-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistsTaskType = {
    id: string
    todolistTitle: string
    filter: FilterType
}

export type TodoTaskType = {
    [key: string]: Array<TasksType>
}

function AppWithRedux() {
    console.log('App')

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistsTaskType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TodoTaskType>(state => state.tasks)

    // Tasks function

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, [dispatch])
    const addTask = useCallback((todolistId: string, newTitle: string) => {
        dispatch(addTaskAC(todolistId, newTitle))
    }, [dispatch])
    const changeStatus = useCallback((todolistId: string, taskId: string) => {
        dispatch(changeTaskStatusAC(todolistId, taskId))
    }, [dispatch])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }, [dispatch])

    // Todolists function

    const changeFilter = useCallback((todolistId: string, value: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])
    const addTodolist = useCallback((newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }, [dispatch])
    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
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
                            todolistTitle={tl.todolistTitle}
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