import React, {ChangeEvent, useState} from 'react';

type SpanChangeTitleType = {
    title: string
    onChange: (newTitle: string) => void
}

const SpanChangeTitle = React.memo (({title, onChange, ...props}: SpanChangeTitleType) => {

    const [editMode, setEditMode] = useState<boolean>(true)
    const [newtitle, setNewTitle] = useState(title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addNewTitle = () => {
        onChange(newtitle)
        setEditMode(!editMode)
    }

    return (
        editMode
            ? <span onDoubleClick={() => setEditMode(!editMode)}>{newtitle}</span>
            : <input value={newtitle} onChange={onChangeHandler} onBlur={addNewTitle} autoFocus/>

    );
});

export default SpanChangeTitle;