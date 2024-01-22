const express= require('express');
const app=express();
const bodyParser = require("body-parser");
const cors=require('cors');
const pool =require("./db");
app.use(cors())
app.use(bodyParser.json())

//Routes


//create a todo
app.post("/todos",async(req,res)=>{
    try{
        const {description} =req.body;
        const newTodo =await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );
        res.json(newTodo.rows[0]);
    }catch(e){
        console.log(e.message);
    }
})

//get all todo
app.get("/todos",async(req,res)=>{
    try{
        const allTodos=await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    }
    catch(e){
        console.log(e.message);
    }
})

//get a todo
app.get("/todos/:id",async(req,res)=>{
    try{
        const {id}= req.params;
        const todo=await pool.query("SELECT * FROM todo WHERE todo_id= $1",[id]);
        res.json(todo.rows[0]);
    }
    catch(e){
        console.log(e.message);
    }
})

//update a todo
app.put("/todos/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const {description}=req.body;
        const updatetodo=await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2",[description,id]);
        res.json("Todo is updated")
    }
    catch(e){
        console.log(e.message);
    }
})

//delete a todo
app.delete("/todos/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1",[id])
        res.json("todo is deleted")
    }
    catch(e){
        console.log(e.message);
    }
})

const port = 3004;
app.use(express.json());
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});