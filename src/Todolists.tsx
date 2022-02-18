import React, {useCallback, useEffect} from 'react';
import InputForAdd from './components/InputForAdd';
import SpanChangeTitle from './components/SpanChangeTitle';
import Task from './components/Task';
import {TaskStatuses, TaskType} from './api/todolist-api';
import {FilterType} from './state/todolist/todolist-reducer';
import {useDispatch} from 'react-redux';
import {setTasksTC} from './state/tasks/task-reducer';
import {IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';


type TodolistType = {
    key: string
    todolistId: string
    todolistTitle: string
    tasks: Array<TaskType>
    filter: FilterType
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
    addTask: (todolistId: string, newTitle: string) => void
    changeStatus: (todolistId: string, taskId: string, status:TaskStatuses) => void
    removeTodolist: (todolistId: string) => void
    addTodolist: (newTitle: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
}

export const Todolists = React.memo(({
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
    console.log('Todolist')

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setTasksTC(todolistId))
    },[])

    const filterAll = useCallback(() => changeFilter(todolistId, 'all'), [changeFilter, todolistId])
    const filterActive = useCallback(() => changeFilter(todolistId, 'active'), [changeFilter, todolistId])
    const filterCompleted = useCallback(() => changeFilter(todolistId, 'completed'), [changeFilter, todolistId])
    const removeTodolistHandler = () => removeTodolist(todolistId)
    const functionForAddTask = useCallback((title: string) => {
        addTask(todolistId, title)
    }, [addTask, todolistId])
    const functionForChangeTodolistTitle = useCallback((newTitle: string) => {
        changeTodolistTitle(todolistId, newTitle)
    }, [changeTodolistTitle, todolistId])


    if (filter === 'active') {
        tasks = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }


    return (
        <div>
            <h3>
                <SpanChangeTitle title={todolistTitle} onChange={functionForChangeTodolistTitle}/>
                {/*<button onClick={removeTodolistHandler}>X</button>*/}
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <InputForAdd item={functionForAddTask}/>
            <ul>
                {
                    tasks.map(t => {
                        return (
                            <Task key={t.id}
                                  todolistId={todolistId}
                                  task={t}
                                  removeTask={removeTask}
                                  changeStatus={changeStatus}
                                  changeTaskTitle={changeTaskTitle}/>
                        )
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
});

export default Todolists;