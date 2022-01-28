import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import InputForAdd from '../components/InputForAdd';
import {action} from '@storybook/addon-actions';


export default {
  title: 'TODOLIST/InputForAdd',
  component: InputForAdd,
  argTypes:{
    onClick:{
      description:'new Todolist or Task added'
    }
  }
} as ComponentMeta<typeof InputForAdd>;


const Template: ComponentStory<typeof InputForAdd> = (args) => <InputForAdd {...args} />;

export const InputForAddPrimary = Template.bind({});

InputForAddPrimary.args = {
  item: action('Add new Todolist or Task')
}


