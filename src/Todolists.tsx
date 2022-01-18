import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from './App';
import InputForAdd from './components/InputForAdd';
import SpanChangeTitle from './components/SpanChangeTitle';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    key: string
    todolistId: string
    todolistTitle: string
    tasks: Array<TasksType>
    filter: FilterType
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
    addTask: (todolistId: string, newTitle: string) => void
    changeStatus: (todolistId: string, taskId: string, newIsDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    addTodolist: (newTitle: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
}

export const Todolists = ({
                              todolistId,
                              todolistTitle,
                              tasks,
                              filter,
                              removeTask,
                              changeFilter,
                              addTask,
                              changeStatus,
                              removeTodolist,
                              addTodolist,
                              changeTodolistTitle,
                              changeTaskTitle,
                              ...props
                          }: TodolistType) => {


    const filterAll = () => changeFilter(todolistId, 'all')
    const filterActive = () => changeFilter(todolistId, 'active')
    const filterCompleted = () => changeFilter(todolistId, 'completed')
    const removeTodolistHandler = () => removeTodolist(todolistId)
    const functionForAddTask = (title: string) => {
        addTask(todolistId, title)
    }
    const functionForChangeTodolisttitle = (newTitle: string) => {
        changeTodolistTitle(todolistId, newTitle)
    }


    return (
        <div>
            <h3>
                <SpanChangeTitle title={todolistTitle} onChange={functionForChangeTodolisttitle}/>
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <InputForAdd item={functionForAddTask}/>
            <ul>
                {
                    tasks.map(t => {

                        const removeTaskHandler = () => removeTask(todolistId, t.id)
                        const changeStatusTasksHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeStatus(todolistId, t.id, e.currentTarget.checked)
                        }
                        const functionForChangeTaskTitle = (newTitle: string) => {
                            changeTaskTitle(todolistId, t.id, newTitle)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type={'checkbox'} checked={t.isDone} onChange={changeStatusTasksHandler}/>
                                {/*<span>{t.title}</span>*/}
                                <SpanChangeTitle title={t.title} onChange={functionForChangeTaskTitle}/>
                                <button onClick={removeTaskHandler}>X</button>
                            </li>)
                    })
                }
            </ul>
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''} onClick={filterAll}>All</button>
                <button className={filter === 'active' ? 'active-filter' : ''} onClick={filterActive}>Active</button>
                <button className={filter === 'completed' ? 'active-filter' : ''} onClick={filterCompleted}>Completed
                </button>
            </div>
        </div>
    );
};

export default Todolists;