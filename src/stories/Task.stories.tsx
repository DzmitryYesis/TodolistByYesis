import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import Task from '../components/Task';
import {action} from '@storybook/addon-actions';
import {TaskStatuses} from '../api/todolist-api';


export default {
    title: 'TODOLIST/Task',
    component: Task,
    argTypes: {
        changeStatus: {
            description: 'Task status changed'
        },
        changeTaskTitle: {
            defaultValue: 'JS',
            description: 'Task title changed'
        },
        removeTask: {
            description: 'Correct task removed'
        }
    }
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDonePrimary = Template.bind({});

TaskIsDonePrimary.args = {
    task: {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.Completed,
        todoListId: 'todolist2',
        description: '',
        order: 1,
        deadline: '',
        addedDate: '',
        startDate: '',
        priority: 1
    },
    todolistId: 'todolist2',
    removeTask: action('Remove correct task'),
    changeTaskTitle: action('Change title in correct task'),
    changeStatus: action('Change status in correct task')
}

export const TaskNotIsDonePrimary = Template.bind({});

TaskNotIsDonePrimary.args = {
    task: {
        id: '1',
        title: 'HTML',
        status: TaskStatuses.New,
        todoListId: 'todolist2',
        description: '',
        order: 2,
        deadline: '',
        addedDate: '',
        startDate: '',
        priority: 2
    },
    todolistId: 'todolist2',
    removeTask: action('Remove correct task'),
    changeTaskTitle: action('Change title in correct task'),
    changeStatus: action('Change status in correct task')
}

