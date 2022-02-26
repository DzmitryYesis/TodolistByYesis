import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';
import {RequestStatusType} from '../app/app-reducer';

type InputForAddType = {
    item: (newTitle: string) => void
    entityStatus?: RequestStatusType
}

const InputForAdd = React.memo(({item, entityStatus, ...props}: InputForAddType) => {

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
            <TextField
                variant="outlined"
                error={!!error}
                value={title}
                onChange={onChangeTitleHandler}
                onKeyPress={addTaskOnKeyPressHandler}
                label={'Title'}
                helperText={error}
                disabled={entityStatus === 'loading'}
            />
            <IconButton color={'primary'} onClick={addTaskHandler} disabled={entityStatus === 'loading'}>
                <AddBox/>
            </IconButton>
        </div>
    );
});

export default InputForAdd;