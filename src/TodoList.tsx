import React, { ChangeEvent,  KeyboardEvent,  useState } from 'react';
import './App.css';
import { FilterValuesType } from './App';
import AddItemForm from './AddIremFrom';
import EditableSpan from './EditableSpan';
import { IconButton, Button, Checkbox } from '@mui/material';
import { Delete } from '@mui/icons-material';

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
        
        <h1><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
        <IconButton onClick={removeTodoList}>
          <Delete/>
        </IconButton></h1>
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
                          <Checkbox checked={t.isDone}
                                    onChange={changeTaskStatus}/>
                                    <EditableSpan title={t.title} onChange={onChangeStatusHandler}/>
                                                    
                          <IconButton onClick={onRemoveHandler}>
                               <Delete/>
                          </IconButton>
                          </li>
                          })                
              }              
          </ul>
        </div>
        <div>
          <Button  variant = {props.filter==='all'? 'contained' : 'text'}  onClick={onAllClickHandler}>Все</Button>
          <Button color={'primary'} variant={props.filter==='active'? 'contained' : 'text'} onClick={onActiveClickHandler}>Для выполнения</Button>
          <Button color={'secondary'} variant={props.filter==='completed'? 'contained' : 'text'} onClick={onCompletedClickHandler}>Выполненные</Button>
        </div>
      </div>)
  }
  
  
  export default TodoList;