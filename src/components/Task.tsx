import React, {ChangeEvent, useCallback} from 'react';
import SpanChangeTitle from './SpanChangeTitle';
import {TasksType} from '../Todolists';

type TaskComponentType = {
    todolistId: string
    task: TasksType
    removeTask: (todolistId: string, taskId: string) => void
    changeStatus: (todolistId: string, taskId: string, newIsDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
}

const Task = React.memo(({
                             todolistId,
                             task,
                             removeTask,
                             changeStatus,
                             changeTaskTitle,
                             ...props
                         }: TaskComponentType) => {
    console.log('Task')
    const removeTaskHandler = useCallback(() => removeTask(todolistId, task.id), [removeTask, todolistId, task.id])
    const changeStatusTasksHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(todolistId, task.id, e.currentTarget.checked)
    }, [changeStatus, todolistId, task.id])
    const functionForChangeTaskTitle = useCallback((newTitle: string) => {
        changeTaskTitle(todolistId, task.id, newTitle)
    }, [changeTaskTitle, todolistId, task.id])
    return (
        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
            <input type={'checkbox'} checked={task.isDone} onChange={changeStatusTasksHandler}/>
            <SpanChangeTitle title={task.title} onChange={functionForChangeTaskTitle}/>
            <button onClick={removeTaskHandler}>X</button>
        </li>)
});

export default Task;