import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import SpanChangeTitle from '../components/SpanChangeTitle';
import {action} from '@storybook/addon-actions';


export default {
    title: 'TODOLIST/SpanChangeTitle',
    component: SpanChangeTitle,

} as ComponentMeta<typeof SpanChangeTitle>;


const Template: ComponentStory<typeof SpanChangeTitle> = (args) => <SpanChangeTitle {...args} />;

export const SpanChangeTitlePrimary = Template.bind({});

SpanChangeTitlePrimary.args = {
    title:'QWERTY',
    onChange: action('Change Todolist or Task title')
}


