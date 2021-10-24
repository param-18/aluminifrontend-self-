import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper } from '@mui/material';


export default function Student() {
    const paperStyle = {padding : "50px 10px" ,width : 600 , margin : "20px auto" }
    const [name , setName] = React.useState('')
    const [address , setAddress] = React.useState('')
    const [students , setStudents] = React.useState([])
    const handleEvent = (e) =>
    {
      e.preventDefault()
      const student = {name , address}
      console.log(student)
      fetch("http://localhost:8080/student/add",
      {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(student)
      }).then(()=>
      {
        console.log("New Student Added")
      })

    }

    React.useEffect(()=>{
    fetch("http://localhost:8080/student/getAll")
    .then(res=>res.json())
    .then((result)=>
    {
      setStudents(result);
    })
    },[])
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch'},
      }}
      noValidate
      autoComplete="off"
    >
        <Container style= {{display : 'contents' , alignContent : 'center'}} >
         <Paper elevation = {3} style = {paperStyle}>
             <h1 style ={{color : 'cyan'}}>Add Student</h1>
      <TextField id="outlined-basic" label="Student Name" variant="outlined" margin = "normal" fullWidth
      value = {name} 
      onChange = {(e) => setName(e.target.value)}/>
      
       <TextField id="outlined-basic"  label="Student Address" margin = "normal" variant="outlined" fullWidth
      value = {address}
      onChange = {(e)=> setAddress(e.target.value)}/>
    
       <Button variant = "contained" margin = "normal" onClick = {handleEvent}>
           Submit
         </Button>
      </Paper>
      <h1> Students </h1>
      <Paper elevation = {3} style = {paperStyle}>
       {students.map(student=>
        (
          <Paper elevation = {3} style = {{margin : "10px" , padding : "15px" , textAlign : "left"}} key = {student.id}>  
             ID:{student.id}<br/>
             NAME:{student.name}<br/>
             ADDRESS:{student.address}
            </Paper>
        ))}
      </Paper>
      </Container>
    </Box>
    
  );
}
