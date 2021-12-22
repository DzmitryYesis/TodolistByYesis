import React, {useState} from 'react';
import './App.css';
import Todolists, {TasksType} from './Todolists';
import {v1} from 'uuid';

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'REACTJS', isDone: false},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'TS', isDone: false},
        {id: v1(), title: 'SalesForce', isDone: true}
    ])

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }
    const addTask = (newTitle: string) => {
        let newTask: TasksType = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const changeStatus = (taskId: string, newIsDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t))
    }

    const [filter, setFilter] = useState<FilterType>('all')

    let tasksFiltered = tasks
    if (filter === 'active') {
        tasksFiltered = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        tasksFiltered = tasks.filter(t => t.isDone === true)
    }


    return (
        <div className="App">
            <Todolists
                todolistTitle={'What to learn'}
                tasks={tasksFiltered}
                filter={filter}
                removeTask={removeTask}
                changeFilter={setFilter}
                addTask={addTask}
                changeStatus={changeStatus}
            />
        </div>
    );
}

export default App;
