import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '0aa73782-910d-40ce-8ee8-c0a12e637003'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const createTodolist = () => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'title'} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTodolist}>Create Todolist</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTodolist = () => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTodolist}>Delete Todolist</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const updateTodolistTitle = () => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'title'} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={updateTodolistTitle}>Update Todolist Title</button>
        </div>
    </div>
}
