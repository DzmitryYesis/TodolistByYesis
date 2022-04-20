import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterType,
    removeTodolistAC, TodolistDomainType,
    todolistsReducer
} from 'store/reducers/todolists-reducer';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();


    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 1, entityStatus:'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 2, entityStatus:'idle'}
    ]
})


test('correct todolist-reducer should be removed', () => {


    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    const endState = todolistsReducer(startState, addTodolistAC({id: todolistId2, title: 'What to buy', addedDate: '', order: 2}))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe('What to buy');
});

test('correct todolist-reducer should be changed filter', () => {
    let newFilter: FilterType = 'completed'

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe('completed');
    expect(endState[0].filter).toBe('all');
});

test('correct todolist-reducer should be changed title', () => {
    let newTitle = 'New Todolist Title'

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTitle))

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe('New Todolist Title');
    expect(endState[0].title).toBe('What to learn');
});


