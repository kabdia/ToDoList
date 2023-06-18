import React, { ChangeEvent,  KeyboardEvent,  useState } from 'react';
import './App.css';
import { FilterValuesType } from './App';

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
    removeTodo:(todolistId:string)=>void
    filter:string
}

function TodoList(props:PropsType) {
  console.log(props.id)
  const [newTaskTitle,setNewTaskTitle]=useState("")
  const [error, setError]=useState<string | null>(null)

  const onNewTitleChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> {
      setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
    setError(null)
      if (e.charCode === 13){
      props.addTask(newTaskTitle.trim(),props.id)
      setNewTaskTitle('') 
      }
  }
  const addTask = ()=> {    
    if (newTaskTitle.trim() !== ''){
      props.addTask(newTaskTitle, props.id)
      setNewTaskTitle('')
    } else {
      setError('Error')
    }
    
  }
  
  const onAllClickHandler = () => props.changeFilter('all',props.id)
  const onActiveClickHandler = () => props.changeFilter('active',props.id)
  const onCompletedClickHandler = () => props.changeFilter('completed',props.id)
  const removeTodoList = ()=> props.removeTodo(props.id)

    return (
      
      <div className="container__content">
        <button onClick={removeTodoList}>x</button><h1>{props.title}</h1>
        <div>
          <input value={newTaskTitle} 
                 onChange={onNewTitleChangeHandler}
                 onKeyPress={onKeyPressHandler}
                 className={error ? 'error':''}/>
          <button onClick={addTask}>Добавить</button>
          { error && <div className='error-message'>Поле не должно быть пустым</div>}
        </div>
        <div>
          <ul>
               {
                
                props.tasks.map(t => {
                   const onRemoveHandler = () => props.removeTask(t.id, props.id)                
                   const changeTaskStatus=(e:ChangeEvent<HTMLInputElement>)=>{props.changeCheck(t.id, e.currentTarget.checked, props.id)}
                   return <li  key={t.id} className={t.isDone ? 'class-checked':''}>
                          <input type="checkbox" 
                                 checked={t.isDone}
                                 onChange={changeTaskStatus}/>
                          {t.title}
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