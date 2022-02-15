import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';
import App from '../App';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';


export default {
  title: 'TODOLIST/AppWithRedux',
  component: App,
decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;


const Template: ComponentStory<typeof App> = (args) => <App />;

export const AppWithReduxPrimary = Template.bind({});



