import React, {useReducer} from 'react';
import './App.css';
import Todolists from './Todolists';
import {v1} from 'uuid';
import InputForAdd from './components/InputForAdd';
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC, FilterType,
    removeTodolistAC,
    todolistReducer
} from './state/todolist/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks/task-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from './api/todolist-api';



export type TodoTaskType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatchToTodolists] = useReducer(todolistReducer, [
        {id: todolistId1, todolistTitle: 'What to learn', filter: 'all', addedDate: '', order: 1},
        {id: todolistId2, todolistTitle: 'What to buy', filter: 'all', addedDate: '', order: 3}
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        dispatchToTasks(removeTaskAC(todolistId, taskId))
    }
    const addTask = (todolistId: string, newTitle: string) => {
        dispatchToTasks(addTaskAC(todolistId, newTitle))
    }
    const changeStatus = (todolistId: string, taskId: string, status:TaskStatuses) => {
        dispatchToTasks(changeTaskStatusAC(todolistId, taskId, status))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        dispatchToTasks(changeTaskTitleAC(todolistId, taskId, newTitle))
    }

    // Todolists function

    const changeFilter = (todolistId: string, value: FilterType) => {
        dispatchToTodolists(changeTodolistFilterAC(todolistId, value))
    }
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const addTodolist = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId, title))
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

export default AppWithReducer;
