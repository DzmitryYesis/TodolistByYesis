import React, {ChangeEvent, useCallback} from 'react';
import {Delete} from '@material-ui/icons';
import {Checkbox, IconButton} from '@material-ui/core';
import {TaskStatuses, TaskType} from './../../../../api/todolist-api';
import {RequestStatusType} from './../../../../store/reducers/app-reducer';
import SpanChangeTitle from './../../../SpanChangeTitle';

type TaskComponentType = {
    todolistId: string
    task: TaskType
    entityStatus: RequestStatusType
    removeTask: (todolistId: string, taskId: string) => void
    changeStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
}

const Task = React.memo(({
                             todolistId,
                             task,
                             entityStatus,
                             removeTask,
                             changeStatus,
                             changeTaskTitle,
                             ...props
                         }: TaskComponentType) => {
    console.log('Task')
    const removeTaskHandler = useCallback(() => removeTask(todolistId, task.id), [removeTask, todolistId, task.id])
    const changeStatusTasksHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeStatus(todolistId, task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
    }, [changeStatus, todolistId, task.id])
    const functionForChangeTaskTitle = useCallback((newTitle: string) => {
        changeTaskTitle(todolistId, task.id, newTitle)
    }, [changeTaskTitle, todolistId, task.id])
    return (
        <div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                onChange={changeStatusTasksHandler}
                color={'primary'}
                disabled={entityStatus === 'loading'}
            />
            <SpanChangeTitle title={task.title} onChange={functionForChangeTaskTitle}/>
            <IconButton onClick={removeTaskHandler} disabled={entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </div>)
});

export default Task;