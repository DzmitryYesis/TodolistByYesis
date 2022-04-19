import React, {useCallback, useEffect} from 'react';
import InputForAdd from 'src/components/InputForAdd';
import SpanChangeTitle from 'src/components/SpanChangeTitle';
import Task from 'src/components/TodolistsList/Todolist/Task/Task';
import {TaskStatuses, TaskType} from 'src/api/todolist-api';
import {FilterType} from 'src/store/reducers/todolist-reducer';
import {useDispatch} from 'react-redux';
import {setTasksTC} from 'src/store/reducers/task-reducer';
import {Button, ButtonGroup, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {RequestStatusType} from 'src/store/reducers/app-reducer';


type TodolistType = {
    key: string
    todolistId: string
    todolistTitle: string
    tasks: Array<TaskType>
    filter: FilterType
    entityStatus: RequestStatusType
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
    addTask: (todolistId: string, newTitle: string) => void
    changeStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
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
                                         entityStatus,
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
    useEffect(() => {
        dispatch(setTasksTC(todolistId))
    }, [])

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
                <IconButton onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <InputForAdd item={functionForAddTask} entityStatus={entityStatus}/>
            <div>
                {
                    tasks.map(t => {
                        return (
                            <Task key={t.id}
                                  todolistId={todolistId}
                                  task={t}
                                  removeTask={removeTask}
                                  changeStatus={changeStatus}
                                  changeTaskTitle={changeTaskTitle}
                                  entityStatus={entityStatus}
                            />
                        )
                    })
                }
            </div>
            <div>
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button onClick={filterAll}
                            color={'default'}
                            variant={filter === 'all' ? 'outlined' : 'text'}>All</Button>
                    <Button onClick={filterActive}
                            color={'primary'}
                            variant={filter === 'active' ? 'outlined' : 'text'}>Active</Button>
                    <Button onClick={filterCompleted}
                            color={'secondary'}
                            variant={filter === 'completed' ? 'outlined' : 'text'}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    );
});

export default Todolists;