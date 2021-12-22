import React from 'react';
import {FilterType} from './App';

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: number) => void
    changeFilter: (filter: FilterType) => void
}

export const Todolists = ({title, tasks, removeTask, changeFilter, ...props}: TodolistsType) => {

    const filterAll = () => changeFilter('all')
    const filterActive = () => changeFilter('active')
    const filterCompleted = () => changeFilter('completed')


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
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