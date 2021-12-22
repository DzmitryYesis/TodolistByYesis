import React, {useState} from 'react';
import './App.css';
import Todolists, {TasksType} from './Todolists';

type FilterType='all'|'active'|'completed'

function App() {

    const [tasks, setTasks]=useState<Array<TasksType>>([
        {id:1, title:'HTML', isDone:true},
        {id:2, title:'REACTJS', isDone:false},
        {id:3, title:'CSS', isDone:false},
        {id:4, title:'TS', isDone:false},
        {id:5, title:'SalesForce', isDone:true}
    ])

    const removeTask = (taskId:number) => {
      setTasks(tasks.filter(t=>t.id!==taskId))
    }

    const [filter, setFilter]=useState<FilterType>('all')

    let tasksFiltered=tasks
    if(filter==='active'){
        tasksFiltered=tasks.filter(t=>t.isDone===false)
    }
    if(filter==='completed'){
        tasksFiltered=tasks.filter(t=>t.isDone===true)
    }


    return (
        <div className="App">
           <Todolists
               title={'What to learn'}
               tasks={tasksFiltered}
               removeTask={removeTask}
           />
        </div>
    );
}

export default App;
