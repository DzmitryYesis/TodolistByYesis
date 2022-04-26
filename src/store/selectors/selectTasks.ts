import { AppRootStateType } from 'store/store';
import { TodoTaskType } from 'types';

export const selectTasks = (state: AppRootStateType): TodoTaskType => state.tasks;
