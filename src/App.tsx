import React, {useState} from 'react';
import './App.css';
import Todolists, {TasksType} from './Todolists';
import {v1} from 'uuid';

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistsTaskType = {
    id: string
    todolistTitle: string
    filter: FilterType
}

type TodoTaskType = {
    [key: string]: Array<TasksType>
}

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistsTaskType>>([
        {id: todolistId1, todolistTitle: 'What to learn', filter: 'all'},
        {id: todolistId2, todolistTitle: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TodoTaskType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'REACTJS', isDone: false},
            {id: v1(), title: 'CSS', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'TS', isDone: false},
            {id: v1(), title: 'SalesForce', isDone: true}
        ]
    })

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }
    const addTask = (todolistId: string, newTitle: string) => {
        let newTask: TasksType = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)})
    }
    const changeFilter = (todolistId: string, value: FilterType) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
    }


    return (
        <div className="App">
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
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
