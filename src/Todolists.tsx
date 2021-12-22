import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from './App';

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
                              ...props
                          }: TodolistType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            addTask(todolistId, title)
            setTitle('')
        } else {
            setError('Incorrect title')
        }
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTitle(e.currentTarget.value)
    }
    const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (title.trim() !== '') {
            if (e.charCode === 13) {
                addTask(todolistId, title)
                setTitle('')
            }
        } else {
            setError('Incorrect title')
        }
    }

    const filterAll = () => changeFilter(todolistId, 'all')
    const filterActive = () => changeFilter(todolistId, 'active')
    const filterCompleted = () => changeFilter(todolistId, 'completed')
    const removeTodolistHandler = () => removeTodolist(todolistId)


    return (
        <div>
            <h3>
                {todolistTitle}
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <div>
                <input className={error ? 'error' : ''} value={title} onChange={onChangeTitleHandler}
                       onKeyPress={addTaskOnKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={'errorMessage'}>{error}</div>}
            </div>
            <ul>
                {
                    tasks.map(t => {

                        const removeTaskHandler = () => removeTask(todolistId, t.id)
                        const changeStatusTasksHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeStatus(todolistId, t.id, e.currentTarget.checked)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type={'checkbox'} checked={t.isDone} onChange={changeStatusTasksHandler}/>
                                <span>{t.title}</span>
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