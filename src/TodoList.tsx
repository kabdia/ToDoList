import React, { ChangeEvent,  KeyboardEvent,  useState } from 'react';
import './App.css';
import { FilterValuesType } from './App';

export type TaskType = {
    id:string,
    title:string,
    isDone:boolean
}

type PropsType ={
    title:string;
    tasks:Array<TaskType> // или <TaskType>[]
    removeTask: (id:string) => void
    changeFilter: (value:FilterValuesType) => void
    addTask:(title:string)=> void
}



function TodoList(props:PropsType) {

  const [newTaskTitle,setNewTaskTitle]=useState("")

  const onNewTitleChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> {
      setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
      if (e.charCode === 13){
      props.addTask(newTaskTitle)
      setNewTaskTitle('') 
      }
  }
  const addTask = ()=> {
    props.addTask(newTaskTitle)
    setNewTaskTitle('')
  }
  
  const onAllClickHandler = () => props.changeFilter('all')
  const onActiveClickHandler = () => props.changeFilter('active')
  const onCompletedClickHandler = () => props.changeFilter('completed')

    return (
      <div className="container__content">
        <h1>{props.title}</h1>
        <div>
          <input value={newTaskTitle} 
                 onChange={onNewTitleChangeHandler}
                 onKeyPress={onKeyPressHandler}/>
          <button onClick={addTask}>Добавить</button>
        </div>
        <div>
          <ul>
               {
                props.tasks.map(t => {
                   const onRemoveHandler = () => props.removeTask(t.id)

                   return <li  key={t.id}>
                          <input type="checkbox" checked={t.isDone} />
                          {t.title}
                          <button onClick={onRemoveHandler}>X</button>
                          </li>
                          })                
              }              
          </ul>
        </div>
        <div>
          <button onClick={onAllClickHandler}>Все</button>
          <button onClick={onActiveClickHandler}>Для выполнения</button>
          <button onClick={onCompletedClickHandler}>Выполненные</button>
        </div>
      </div>)
  }

  export default TodoList;