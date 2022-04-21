import React, { ChangeEvent, useState } from 'react';

import { TextField } from '@material-ui/core';

type SpanChangeTitlePropsType = {
  title: string;
  onChange: (newTitle: string) => void;
};

export const SpanChangeTitle = React.memo(
  ({ title, onChange }: SpanChangeTitlePropsType) => {
    const [editMode, setEditMode] = useState<boolean>(true);
    const [newTitle, setNewTitle] = useState(title);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
      setNewTitle(e.currentTarget.value);
    };

    const addNewTitle = (): void => {
      onChange(newTitle);
      setEditMode(!editMode);
    };

    return editMode ? (
      <span onDoubleClick={() => setEditMode(!editMode)}>{newTitle}</span>
    ) : (
      <TextField
        variant="outlined"
        value={newTitle}
        onChange={onChangeHandler}
        onBlur={addNewTitle}
        autoFocus
      />
    );
  },
);
