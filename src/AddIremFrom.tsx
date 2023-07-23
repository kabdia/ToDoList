import { Button } from '@mui/material';
import React, { ChangeEvent,  KeyboardEvent,  useState } from 'react';
import { TextField } from '@mui/material';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';

type AddItemFormType ={
    addItem:(title:string)=>void
    
  }
  function AddItemForm(props:AddItemFormType){
    const [newTaskTitle,setNewTaskTitle]=useState("")
    const [error, setError]=useState<string | null>(null)
  
    const onNewTitleChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
      setError(null)
        if (e.charCode === 13){
        props.addItem(newTaskTitle.trim())
        setNewTaskTitle('') 
        }
    }
    const addTask = ()=> {    
      if (newTaskTitle.trim() !== ''){
        props.addItem(newTaskTitle)
        setNewTaskTitle('')
      } else {
        setError('Error')
      }
      
    }
        return <div>
            <TextField value={newTaskTitle} 
                      variant={'outlined'}
                      label={'Что нужно выполнить'}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error':''}
                   error={!!error}/>
                   
            <Button variant={'outlined'} color={'primary'} onClick={addTask}>
              <PlaylistAddCircleIcon/>
              </Button>
            { error && <div className='error-message'>Поле не должно быть пустым</div>}
          </div>
  }

  export default AddItemForm;