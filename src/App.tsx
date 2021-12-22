import React from 'react';
import './App.css';
import Todolists from './Todolists';

function App() {

    const task1=[
        {id:1, title:'HTML', isDone:true},
        {id:2, title:'REACTJS', isDone:false},
        {id:3, title:'CSS', isDone:true}
    ]

    const task2=[
        {id:1, title:'Milk', isDone:true},
        {id:2, title:'Beer', isDone:true},
        {id:3, title:'Fish', isDone:false}
    ]

    return (
        <div className="App">
           <Todolists title={'What to learn'} tasks={task1}/>
           <Todolists title={'What to buy'} tasks={task2}/>
        </div>
    );
}

export default App;
