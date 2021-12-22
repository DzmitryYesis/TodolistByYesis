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
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (newTitle: string) => void
}

export const Todolists = ({todolistTitle, tasks, removeTask, changeFilter, addTask, ...props}: TodolistsType) => {

    const [title, setTitle] = useState('')

    const addTaskHandler = () => {
        addTask(title)
        setTitle('')
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTaskOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask(title)
            setTitle('')
        }
    }
    const filterAll = () => changeFilter('all')
    const filterActive = () => changeFilter('active')
    const filterCompleted = () => changeFilter('completed')


    return (
        <div>
            <h3>{todolistTitle}</h3>
            <div>
                <input value={title} onChange={onChangeTitleHandler} onKeyPress={addTaskOnKeyPress}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {
                    tasks.map(t => {

                        const removeTaskHandler = () => removeTask(t.id)

                        return (
                            <li key={t.id}>
                                <input type={'checkbox'} checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={removeTaskHandler}>X</button>
                            </li>)
                    })
                }
            </ul>
            <div>
                <button onClick={filterAll}>All</button>
                <button onClick={filterActive}>Active</button>
                <button onClick={filterCompleted}>Completed</button>
            </div>
        </div>
    );
};

export default Todolists;