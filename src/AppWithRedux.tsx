import React from 'react';
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

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistsTaskType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TodoTaskType>(state => state.tasks)

    // Tasks function

    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }
    const addTask = (todolistId: string, newTitle: string) => {
        dispatch(addTaskAC(todolistId, newTitle))
    }
    const changeStatus = (todolistId: string, taskId: string) => {
        dispatch(changeTaskStatusAC(todolistId, taskId))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }

    // Todolists function

    const changeFilter = (todolistId: string, value: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }
    const removeTodolist = (todolistId: string) => {
        //const action = removeTodolistAC(todolistId)
        dispatch(removeTodolistAC(todolistId))
    }
    const addTodolist = (newTitle: string) => {
        //const action = addTodolistAC(newTitle)
        dispatch(addTodolistAC(newTitle))
    }
    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }

    return (
        <div className="App">
            <InputForAdd item={addTodolist}/>
            {
                todolists.map(tl => {
                    let tasksFiltered = tasks[tl.id]
                    if (tl.filter === 'active') {
                        tasksFiltered = tasks[tl.id].filter(t => t.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        tasksFiltered = tasks[tl.id].filter(t => t.isDone === true)
                    }
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
