import React, { ChangeEvent,  KeyboardEvent,  useState } from 'react';
import './App.css';
import { FilterValuesType } from './App';
import AddItemForm from './AddIremFrom';
import EditableSpan from './EditableSpan';

export type TaskType = {
    id:string,
    title:string,
    isDone:boolean
}

type PropsType ={
    key:string
    id:string    
    title:string;
    tasks:Array<TaskType> // или <TaskType>[]
    removeTask: (id:string, todolistId:string) => void
    changeFilter: (value:FilterValuesType, todolistId:string) => void
    addTask:(title:string, todolistId:string)=> void
    changeCheck:(taskId:string, isDone:boolean, todolistId:string)=>void
    changeTaskTitle:(taskId:string, newTitle:string, todolistId:string)=>void
    changeTodoListTitle:(id:string,newTitle:string)=>void
    removeTodo:(todolistId:string)=>void
    filter:string
}

function TodoList(props:PropsType) {
  
  
  const onAllClickHandler = () => props.changeFilter('all',props.id)
  const onActiveClickHandler = () => props.changeFilter('active',props.id)
  const onCompletedClickHandler = () => props.changeFilter('completed',props.id)
  const removeTodoList = ()=> props.removeTodo(props.id)
  const addTask = (title:string)=>{
    props.addTask(title, props.id)
  }
  const changeTodoListTitle =(newTitle:string)=>{
    props.changeTodoListTitle(props.id, newTitle)
   }
    return (
      
        <div className="container__content">
        
        <button onClick={removeTodoList}>x</button>
       
        <h1><EditableSpan title={props.title} onChange={changeTodoListTitle}/></h1>
        
        <AddItemForm addItem={addTask}/>
        <div>
          <ul>
               {
                
                props.tasks.map(t => {
                   const onRemoveHandler = () => props.removeTask(t.id, props.id)                
                   const changeTaskStatus=(e:ChangeEvent<HTMLInputElement>)=>{props.changeCheck(t.id, e.currentTarget.checked, props.id)}
                   
                   function onChangeStatusHandler(newValue:string){
                    props.changeTaskTitle(t.id, newValue, props.id)
                   }
                   return <li  key={t.id} className={t.isDone ? 'class-checked':''}>
                          <input type="checkbox" 
                                 checked={t.isDone}
                                 onChange={changeTaskStatus}/>
                                  <EditableSpan title={t.title} onChange={onChangeStatusHandler}/>
                          
                          <button onClick={onRemoveHandler}>X</button>
                          </li>
                          })                
              }              
          </ul>
        </div>
        <div>
          <button className={props.filter==='all'? 'active-filter' : ''} onClick={onAllClickHandler}>Все</button>
          <button className={props.filter==='active'? 'active-filter' : ''} onClick={onActiveClickHandler}>Для выполнения</button>
          <button className={props.filter==='completed'? 'active-filter' : ''} onClick={onCompletedClickHandler}>Выполненные</button>
        </div>
      </div>)
  }
  
  
  export default TodoList;