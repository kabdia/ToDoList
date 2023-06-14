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
    changeCheck:(taskId:string, isDone:boolean)=>void
    filter:string
}



function TodoList(props:PropsType) {

  const [newTaskTitle,setNewTaskTitle]=useState("")
  const [error, setError]=useState<string | null>(null)

  const onNewTitleChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> {
      setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
    setError(null)
      if (e.charCode === 13){
      props.addTask(newTaskTitle.trim())
      setNewTaskTitle('') 
      }
  }
  const addTask = ()=> {    
    if (newTaskTitle.trim() !== ''){
      props.addTask(newTaskTitle)
      setNewTaskTitle('')
    } else {
      setError('Error')
    }
    
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
                 onKeyPress={onKeyPressHandler}
                 className={error ? 'error':''}/>
          <button onClick={addTask}>Добавить</button>
          { error && <div className='error-message'>Поле не должно быть пустым</div>}
        </div>
        <div>
          <ul>
               {
                props.tasks.map(t => {
                   const onRemoveHandler = () => props.removeTask(t.id)                
                   const changeTaskStatus=(e:ChangeEvent<HTMLInputElement>)=>{props.changeCheck(t.id, e.currentTarget.checked)}
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