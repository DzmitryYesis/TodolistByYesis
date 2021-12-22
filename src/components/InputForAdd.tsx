import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type InputForAddType={
    item:(newTitle:string)=>void
}

const InputForAdd = ({item,...props}:InputForAddType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            item(title)
            setTitle('')
        } else {
            setError('Incorrect title')
        }
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTitle(e.currentTarget.value)
    }
    const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (title.trim() !== '') {
            if (e.charCode === 13) {
                item(title)
                setTitle('')
            }
        } else {
            setError('Incorrect title')
        }
    }

    return (
        <div>
            <input className={error ? 'error' : ''} value={title} onChange={onChangeTitleHandler}
                   onKeyPress={addTaskOnKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={'errorMessage'}>{error}</div>}
        </div>
    );
};

export default InputForAdd;