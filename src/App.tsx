import React, {useState} from 'react';
import './App.css';
import Todolists from './Todolists';
import {v1} from 'uuid';
import InputForAdd from './components/InputForAdd';
import {TaskPriorities, TaskStatuses, TaskType} from './api/todolist-api';
import {FilterType, TodolistDomainType} from './state/todolist/todolist-reducer';


export type TodoTaskType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 1},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 3}
    ])

    const [tasks, setTasks] = useState<TodoTaskType>({
        [todolistId1]: [
            {
                id: v1(),
                title: 'HTML',
                status: TaskStatuses.Completed,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {id: v1(), title: 'REACTJS', status: TaskStatuses.New,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''},
            {id: v1(), title: 'CSS', status: TaskStatuses.New,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''}
        ],
        [todolistId2]: [
            {id: v1(), title: 'TS', status: TaskStatuses.New,
                todoListId: todolistId2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''},
            {id: v1(), title: 'SalesForce', status: TaskStatuses.Completed,
                todoListId: todolistId2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''}
        ]
    })

    // Tasks function

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }
    const addTask = (todolistId: string, newTitle: string) => {
        let newTask: TaskType = {id: v1(), title: newTitle, status: TaskStatuses.New,
            todoListId: todolistId,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeStatus = (todolistId: string, taskId: string, status:TaskStatuses) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, status} : t)})
    }
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }

    // Todolists function

    const changeFilter = (todolistId: string, value: FilterType) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addTodolist = (newTitle: string) => {
        let newTodolist: TodolistDomainType = {id: v1(), title: newTitle, filter: 'all', addedDate: '', order: 3}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolist.id]: []})
    }
    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, todolistTitle: newTitle} : tl))
    }


    return (
        <div className="App">
            <InputForAdd item={addTodolist}/>
            {
                todolists.map(tl => {
                    let tasksFiltered = tasks[tl.id]
                    if (tl.filter === 'active') {
                        tasksFiltered = tasks[tl.id].filter(t => t.status === TaskStatuses.New)
                    }
                    if (tl.filter === 'completed') {
                        tasksFiltered = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)
                    }
                    return (
                        <Todolists
                            key={tl.id}
                            todolistId={tl.id}
                            todolistTitle={tl.title}
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

export default App;

export class TodolistType {
}