import React,{useState, useEffect} from 'react';
import { Input , Button, Label  } from 'reactstrap';

const Todo = () => {

    const [todo, setTodo] = useState("")
    const [reload, setReload] = useState(0)
    const [allTodos,setAllTodos]= useState([])
    const [inUpdation, setInUpdation] = useState({text:"", index:null});
    const [deleteArray, setDeleteArray] = useState([]);


    const createTodo=()=>{
        let todos=[];
        if(typeof window !== undefined){
            if(localStorage.getItem("todos")){
                todos= JSON.parse(localStorage.getItem("todos"))
            }
            todos.push(todo);
            localStorage.setItem("todos", JSON.stringify(todos),()=>{console.log("save to locL")});
                setTodo("")
                setReload(reload+1)
        }
    }

    const updateTodo=(text,index)=>{
        //
        setInUpdation({...inUpdation, text,index})
    }

    const saveupdatedTodo=(text,index)=>{
            var todos= JSON.parse(localStorage.getItem("todos"))
            todos.splice(index,1,text);
            localStorage.setItem("todos", JSON.stringify(todos));
            setInUpdation({text:"", index:null})
            setReload(reload+1)
    }

    const deleteTodo=(todoIndex)=>{
        let todos=[]
        if(typeof window !== undefined){
            if(localStorage.getItem("todos")){
                todos= JSON.parse(localStorage.getItem("todos"))
            }   
            todos.splice(todoIndex, 1)
            localStorage.setItem("todos", JSON.stringify(todos));
        }
        setReload(reload+1)
    }


    const loadTodos= ()=>{
        if(typeof window !== undefined){
            if(localStorage.getItem("todos")){
                return JSON.parse(localStorage.getItem("todos"))
            }
        } else {
            return []
        }
    }

    const checkValue=(index)=>{
        if(deleteArray.includes(index)===true){
            setDeleteArray([...deleteArray.splice(index,1)])
        } else {
            setDeleteArray([...deleteArray, index])
        }
    }


    const deleteMultipleFunction=(indexToDelet)=>{
        var todos= JSON.parse(localStorage.getItem("todos"))
        let newTodo= todos.filter(value => !indexToDelet.includes(value))
        localStorage.setItem("todos", JSON.stringify(newTodo));
            setReload(reload+1)
            setDeleteArray([])
    }

    useEffect(()=>{
        setAllTodos(loadTodos());
    },[reload])


    //Component Function
    const todoInput=()=>(
        <>
        <Input className='mx-4' value={todo} onChange={(e)=>setTodo(e.target.value)}
        /> 
        <Button className='mx-3 bg-primary' onClick={createTodo} >Add</Button>        
        </>
    )

    const todoUpdateInput=()=>(
        <>
            <Input className='mx-4' value={inUpdation.text} onChange={(e)=>{setInUpdation({...inUpdation, text:e.target.value})}}
    />
        <Button className='mx-3 bg-primary' onClick={()=>saveupdatedTodo(inUpdation.text, inUpdation.index)} >UpdateTodo</Button>
        </>
    )


  return (
    <div>  
    <div className='container col-6 d-flex' >
        {inUpdation.text===""?
        todoInput()
        : todoUpdateInput()}
    </div>

    <div className="container col-6 my-5">
        {deleteArray.length>1 && 
        <button className=' btn btn-outline-danger col-12' onClick={()=>{deleteMultipleFunction(deleteArray)}} >Delete Multiple</button>
        }
    {allTodos && allTodos.length>0 && allTodos.map((val,index)=>(
        <div className="border border-secondary rounded py-3 d-flex justify-content-around" key={index+val}>
            <Input type="checkbox" id='checkk' onChange={()=>checkValue(val)} />
                <div>
                    <Label check className='fw-light' >
                        {val}
                </Label>                    
                </div>
                <div>
                    <button className='btn btn-outline-warning btn-sm fw-light' onClick={()=>updateTodo(val,index)} >Edit</button>
                    <button className='btn btn-outline-danger btn-sm fw-light mx-3' onClick={()=>deleteTodo(index)} >Delete</button>
                </div>
        </div>        
    ))}
    </div>
    </div>
    );
};


export default Todo;