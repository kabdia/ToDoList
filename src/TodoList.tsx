import React from 'react';
import './App.css';
import { FilterValuesType } from './App';

export type TaskType = {
    id:number,
    title:string,
    isDone:boolean
}

type PropsType ={
    title:string;
    tasks:Array<TaskType> // или <TaskType>[]
    removeTask: (id:number) => void
    changeFilter: (value:FilterValuesType) => void
}
function TodoList(props:PropsType) {

    return (
      <div className="container__content">
        <h1>{props.title}</h1>
        <div>
          <input />
          <button>Добавить</button>
        </div>
        <div>
          <ul>
               {
                props.tasks.map(t =>                 
                    <li><input type="checkbox" checked={t.isDone} />{t.title}<button onClick={()=>props.removeTask(t.id)}>X</button> </li>            
                )
               }
            
          </ul>
        </div>
        <div>
          <button onClick={()=>props.changeFilter("all")}>Все</button>
          <button onClick={()=>props.changeFilter("active")}>Для выполнения</button>
          <button onClick={()=>props.changeFilter("completed")}>Выполненные</button>
        </div>
      </div>)
  }

  export default TodoList;