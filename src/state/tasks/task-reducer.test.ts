import {TodoTaskType} from '../../App';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './task-reducer';
import {addTodolistAC, removeTodolistAC} from '../todolist/todolist-reducer';


let startState: TodoTaskType

beforeEach(() => {

    startState = {
        'todolistId1': [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'REACTJS', isDone: false},
            {id: '3', title: 'CSS', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'TS', isDone: false},
            {id: '2', title: 'SalesForce', isDone: true},
            {id: '3', title: 'Redux', isDone: false}
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const endState = tasksReducer(startState, removeTaskAC('todolistId2', '2'))
    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'REACTJS', isDone: false},
            {id: '3', title: 'CSS', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'TS', isDone: false},
            {id: '3', title: 'Redux', isDone: false}
        ]
    });
})

test('correct task should be added from correct array', () => {

    const endState = tasksReducer(startState, addTaskAC('todolistId2', 'juce'))

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].isDone).toBe(false);
})

test('correct task status should be changed', () => {

    const endState = tasksReducer(startState, changeTaskStatusAC('todolistId2', '2'))

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId2'][1].isDone).toBe(false);
    expect(endState['todolistId1'][1].isDone).toBe(false);
})

test('correct task title should be changed', () => {

    const endState = tasksReducer(startState, changeTaskTitleAC('todolistId2', '2', 'Yhoho'))

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId2'][1].title).toBe('Yhoho');
    expect(endState['todolistId1'][1].title).toBe('REACTJS');
})

test('new array should be added when new Todolist added', () => {

    const endState = tasksReducer(startState, addTodolistAC('todolistId3'))
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2');
    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('Array with task should be deleted when Todolist deleted', () => {

    const endState = tasksReducer(startState, removeTodolistAC('todolistId2'))
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
})


