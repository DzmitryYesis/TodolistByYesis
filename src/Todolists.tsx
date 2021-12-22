import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from './App';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistsType = {
    todolistTitle: string
    tasks: Array<TasksType>
    filter: FilterType
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (newTitle: string) => void
    changeStatus: (taskId: string, newIsDone: boolean) => void
}

export const Todolists = ({
                              todolistTitle,
                              tasks,
                              filter,
                              removeTask,
                              changeFilter,
                              addTask,
                              changeStatus,
                              ...props
                          }: TodolistsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            addTask(title)
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
                addTask(title)
                setTitle('')
            }
        } else {
            setError('Incorrect title')
        }
    }

    const filterAll = () => changeFilter('all')
    const filterActive = () => changeFilter('active')
    const filterCompleted = () => changeFilter('completed')


    return (
        <div>
            <h3>{todolistTitle}</h3>
            <div>
                <input className={error ? 'error' : ''} value={title} onChange={onChangeTitleHandler}
                       onKeyPress={addTaskOnKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={'errorMessage'}>{error}</div>}
            </div>
            <ul>
                {
                    tasks.map(t => {

                        const removeTaskHandler = () => removeTask(t.id)
                        const changeStatusTasksHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeStatus(t.id, e.currentTarget.checked)
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