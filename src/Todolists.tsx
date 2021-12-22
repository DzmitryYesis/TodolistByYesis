import React from 'react';

export type TasksType={
    id:number
    title:string
    isDone:boolean
}

type TodolistsType={
    title:string
    tasks:Array<TasksType>
    removeTask:(taskId:number)=>void
}

export const Todolists = ({title,tasks, removeTask,...props}:TodolistsType) => {



    return (
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {
                        tasks.map(t=>{

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
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
    );
};

export default Todolists;