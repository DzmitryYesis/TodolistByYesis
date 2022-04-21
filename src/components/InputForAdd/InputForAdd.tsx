import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import { IconButton, TextField } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';

import { RequestStatus } from 'enum';
import { RequestStatusType } from 'types';

type InputForAddPropsType = {
  item: (newTitle: string) => void;
  entityStatus: RequestStatusType;
};

const CHAR_CODE = 13;

export const InputForAdd = React.memo(({ item, entityStatus }: InputForAddPropsType) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addTaskHandler = (): void => {
    if (title.trim() !== '') {
      item(title);
      setTitle('');
    } else {
      setError('Incorrect title');
    }
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (error !== null) {
      setError(null);
    }
    setTitle(e.currentTarget.value);
  };

  const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (title.trim() !== '') {
      if (e.charCode === CHAR_CODE) {
        item(title);
        setTitle('');
      }
    } else {
      setError('Incorrect title');
    }
  };

  return (
    <div>
      <TextField
        variant="outlined"
        error={!!error}
        value={title}
        onChange={onChangeTitleHandler}
        onKeyPress={addTaskOnKeyPressHandler}
        label="Title"
        helperText={error}
        disabled={entityStatus === RequestStatus.LOADING}
      />
      <IconButton
        color="primary"
        onClick={addTaskHandler}
        disabled={entityStatus === RequestStatus.LOADING}
      >
        <AddBox />
      </IconButton>
    </div>
  );
});
