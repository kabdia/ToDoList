import React, { ChangeEvent,useState } from 'react'
import TextField from '@mui/material/TextField/TextField'

type EditableSpanPropsType = {
    title:string    
    onChange: (newValue:string)=>void
  }



function EditableSpan(props:EditableSpanPropsType){
 
    let [editMode,setEditMode] = useState(false)
    let [title,setTitle]=useState(props.title)

    function activateEditMode(){
      setEditMode(true)
      setTitle(props.title)
    }
    
    function deActivateEditMode() {
      setEditMode(false)
      props.onChange(title)
    } 
    
    let onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    
    return editMode ? 
    <TextField variant="standard" size="small" value={title} onChange={onChangeTitleHandler} onBlur={deActivateEditMode} autoFocus/>:
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  }

  export default EditableSpan