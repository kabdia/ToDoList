import React, { useState } from 'react';
import './App.css';
import TodoList, { TaskType } from './TodoList';
import { v1 } from 'uuid';
import AddItemFrom from './AddIremFrom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
export type FilterValuesType = 'all'|'completed'|'active';

type TodoListType = {
  id:string
  title:string
  filter:FilterValuesType
}
type TasksStateType = {
  [key:string]: Array<TaskType>
}
function App() {
  
  let todolist1 = v1()
  let todolist2 = v1()

  let [todolists,setTodolist]=useState<Array<TodoListType>>([
    {id:todolist1, title:'Что выучить', filter:'all'},
    {id:todolist2, title:'Что сделать', filter:'all'}
  ])


  let [tasks,setTasks]=useState<TasksStateType>({
    [todolist1]:[
    {id:v1(),title:"CSS", isDone:true},
    {id:v1(),title:"JS", isDone:true},
    {id:v1(),title:"React", isDone:false},
    {id:v1(),title:"Redux", isDone:false},
    ],
    [todolist2]:[
    {id:v1(),title:"Молоко", isDone:false},
    {id:v1(),title:"Хлеб", isDone:false},
    ]
  })
 
  function addTask(title:string, todolistId:string){    
    let newTask ={id:v1(), title:title, isDone:false}
    let newListTasks = tasks[todolistId]
    let newTasks = [newTask, ...newListTasks];
    tasks[todolistId] = newTasks
    setTasks({...tasks})
  }

  function changeCheck(taskId:string, isDone:boolean, todolistId:string){
    let taskTrue = tasks[todolistId].find(t=>t.id === taskId)
    if (taskTrue){      
      taskTrue.isDone = isDone      
    }
    setTasks({...tasks})
  }

  function changeTaskTitle(taskId:string, newTitle:string, todolistId:string){
    let taskTrue = tasks[todolistId].find(t=>t.id === taskId)
    if (taskTrue){      
      taskTrue.title = newTitle      
    }
    setTasks({...tasks})
  }

  function changeTodoListTitle(id:string,newTitle:string){
    const todolist = todolists.find(t=>t.id===id)
    if (todolist){
      todolist.title = newTitle
      setTodolist([...todolists])
    }    
  }
  

  function removeTask(id:string,todolistId:string){   
    let task = tasks[todolistId]; 
    let filteredTasks = task.filter(t=>t.id !== id)   
    tasks[todolistId] = filteredTasks
    setTasks({...tasks})   
  }

  function changeFilter(value:FilterValuesType, todolistId:string){
    let newTodolist = todolists.find((t)=>t.id === todolistId)
    if (newTodolist){
      newTodolist.filter=value    
    }
    setTodolist([...todolists])
  } 

  function removeTodo(todolistId:string){
    let filterTodo = todolists.filter((t)=>t.id !== todolistId)
    setTodolist(filterTodo)
    delete tasks[todolistId]
    setTasks({...tasks})
  }

  function addTodoList(title:string){
    let todolist: TodoListType = {
      id:v1(),
      filter:'all',
      title:title
    };
    setTodolist([todolist,...todolists])
    setTasks({...tasks,[todolist.id]:[]})
  }
  return (
    <div className="container">
      
      <AppBar position="static">
     <Toolbar>
       <IconButton
         size="large"
         edge="start"
         color="inherit"
         aria-label="menu"
         sx={{ mr: 2 }}>        
       </IconButton>
       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         News
       </Typography>
       <Button color="inherit">Login</Button>
     </Toolbar>
    </AppBar>
    <Container fixed>
      <Grid container style={{padding:'10px'}}>
        <AddItemFrom addItem={addTodoList} />
      </Grid>
      <Grid spacing={10} container>
       { todolists.map((t1)=>{

      let tasksForTodoList = tasks[t1.id]

      if (t1.filter==="active"){
        tasksForTodoList = tasksForTodoList.filter(t=>t.isDone === false)
      }
      if (t1.filter==="completed"){
        tasksForTodoList = tasksForTodoList.filter(t=>t.isDone === true)
      }
     return <Grid item>
            <Paper style={{padding:'10px'}}>
            <TodoList 
                key={t1.id}
                id = {t1.id}
                title={t1.title}
                tasks={tasksForTodoList} 
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeCheck={changeCheck}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
                removeTodo={removeTodo}
                filter = {t1.filter}/>
            </Paper>
            </Grid>
        }
      )} 
     
      </Grid>
    </Container>     
    </div>
  );
}


export default App;
