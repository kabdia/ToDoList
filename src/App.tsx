import React, { useState } from 'react';
import './App.css';
import TodoList, { TaskType } from './TodoList';
import { v1 } from 'uuid';
export type FilterValuesType = 'all'|'completed'|'active';
function App() {

  
  
  let [tasks,setTasks]=useState<Array<TaskType>>([
    {id:v1(),title:"CSS", isDone:true},
    {id:v1(),title:"JS", isDone:true},
    {id:v1(),title:"React", isDone:false},
    {id:v1(),title:"Redux", isDone:false},
  ])

  function addTask(title:string){
    let newTask ={id:v1(), title:title, isDone:false}
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks)
  }

  function changeCheck(taskId:string, isDone:boolean){
    let taskTrue = tasks.find(t=>t.id === taskId)
    if (taskTrue){
      taskTrue.isDone = isDone
    }
    setTasks([...tasks])
  }
  let [filter,setFilter]=useState("all");

  function removeTask(id:string){    
    let filteredTasks = tasks.filter(t=>t.id !== id)   
    setTasks(filteredTasks)   
  }

  function changeFilter(value:FilterValuesType){
    setFilter(value)
  }

  let tasksForTodoList = tasks;
  if (filter==="active"){
    tasksForTodoList = tasks.filter(t=>t.isDone === false)
  }
  if (filter==="completed"){
    tasksForTodoList = tasks.filter(t=>t.isDone === true)
  }
  return (
    <div className="container">
      <TodoList title="Что выучить" 
                tasks={tasksForTodoList} 
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeCheck={changeCheck}
                filter = {filter}/>
                
      
      
    </div>
  );
}


export default App;
