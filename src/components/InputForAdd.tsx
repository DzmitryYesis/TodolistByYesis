import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from '@material-ui/core';

type InputForAddType = {
    item: (newTitle: string) => void
}

const InputForAdd = React.memo(({item, ...props}: InputForAddType) => {

    console.log('AddInput')

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
        if (error !== null) {
            setError(null)
        }
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
            <Button variant="contained" onClick={addTaskHandler} color={'primary'} size={'small'}>+</Button>
            {error && <div className={'errorMessage'}>{error}</div>}
        </div>
    );
});

export default InputForAdd;