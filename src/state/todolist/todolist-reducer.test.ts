import {v1} from 'uuid';
import {FilterType, TodolistsTaskType} from '../../App';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from './todolist-reducer';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistsTaskType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();


    startState = [
        {id: todolistId1, todolistTitle: 'What to learn', filter: 'all'},
        {id: todolistId2, todolistTitle: 'What to buy', filter: 'all'}
    ]
})


test('correct todolist should be removed', () => {


    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New todolist'

    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].todolistTitle).toBe('New todolist');
});

test('correct todolist should be changed filter', () => {
    let newFilter: FilterType = 'completed'

    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe('completed');
    expect(endState[0].filter).toBe('all');
});

test('correct todolist should be changed title', () => {
    let newTitle = 'New Todolist Title'

    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId2, newTitle))

    expect(endState.length).toBe(2);
    expect(endState[1].todolistTitle).toBe('New Todolist Title');
    expect(endState[0].todolistTitle).toBe('What to learn');
});


