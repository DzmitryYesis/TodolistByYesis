import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import Task from '../components/Task';
import {action} from '@storybook/addon-actions';


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
    task: {id: '1', title: 'CSS', isDone: true},
    todolistId: 'todolist2',
    removeTask: action('Remove correct task'),
    changeTaskTitle: action('Change title in correct task'),
    changeStatus: action('Change status in correct task')
}

export const TaskNotIsDonePrimary = Template.bind({});

TaskNotIsDonePrimary.args = {
    task: {id: '1', title: 'HTML', isDone: false},
    todolistId: 'todolist2',
    removeTask: action('Remove correct task'),
    changeTaskTitle: action('Change title in correct task'),
    changeStatus: action('Change status in correct task')
}

