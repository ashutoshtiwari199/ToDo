import React,{useState, useEffect} from 'react';
import { Input , Button, Label  } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';

const Todo = ({value}) => {

    const [todo, setTodo] = useState({
        id: String,
        text:String,
    })
    const [reload, setReload] = useState(0)
    const [allTodos,setAllTodos]= useState([])
    const [inUpdation, setInUpdation] = useState({text:"", index:null});
    const [deleteArray, setDeleteArray] = useState([]);



    const handleTodo=(e)=>{
        setTodo({...todo, text: e.target.value})
    }
   
    const createTodo=()=>{
        let todos=[];
        if(typeof window !== undefined){
            if(localStorage.getItem("todos")){
                todos= JSON.parse(localStorage.getItem("todos"))
            }
            todos.push({...todo, id:uuidv4()});
            localStorage.setItem("todos", JSON.stringify(todos));
                setTodo({text:"",id:null})
                setReload(reload+1)
        }
    }


    const updateTodo=(text,index)=>{
        setInUpdation({...inUpdation, text,index})
    }

    const saveupdatedTodo=(text,index)=>{
            var todos= JSON.parse(localStorage.getItem("todos"))
            todos[index].text= text;
            localStorage.setItem("todos", JSON.stringify(todos));
            setInUpdation({text:"", index:null})
            setReload(reload+1)
    }

    const deleteTodo=(id)=>{
        let todos=[]
        if(typeof window !== undefined){
            if(localStorage.getItem("todos")){
                todos= JSON.parse(localStorage.getItem("todos"))
            }   
            todos.forEach((val,index)=>{
                if(val.id===id){
                    todos.splice(index,1);
                }
            })
            localStorage.setItem("todos", JSON.stringify(todos));
        }
        if(deleteArray.includes(id)){
            deleteArray.splice(deleteArray.indexOf(id),1);
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

    const checkValue=(index,id)=>{     
        if(deleteArray.includes(id)===true){
            // arr.filter(e => e !== 'B')
            setDeleteArray([...deleteArray.filter(e => e !== id)])
        } else {
            setDeleteArray([...deleteArray, id])
        }
        setReload(reload+1)
    }

    const deleteMultipleFunction=(indexToDelet)=>{
        var todos= JSON.parse(localStorage.getItem("todos"))
        let newTodo= todos.filter(value => !indexToDelet.includes(value.id))
        localStorage.setItem("todos", JSON.stringify(newTodo));
            setReload(reload+1)
            setDeleteArray([])
    }

    useEffect(()=>{
        setAllTodos(loadTodos());
    },[reload])

    const todoInput=()=>(
        <>
        <Input className={`bg-${value.themeColor==="dark"?"secondary":""} text-${value.themeColor==="dark"?"white":"dark"} mx-4 `} value={todo.text} onChange={(e)=>handleTodo(e)}
        /> 
        <Button className={`mx-3 bg-${value.themeColor}`} onClick={createTodo} >Add</Button>        
        </>
    )

    const todoUpdateInput=()=>(
        <>
            <Input className={`bg-${value.themeColor==="dark"?"secondary":""} text-${value.themeColor==="dark"?"white":"dark"} mx-4 `} value={inUpdation.text} onChange={(e)=>{setInUpdation({...inUpdation, text:e.target.value})}}
    />
        <Button className={`mx-3 bg-${value.themeColor}`} onClick={()=>saveupdatedTodo(inUpdation.text, inUpdation.index)} >UpdateTodo</Button>
        </>
    )


  return (
    <div className='parent-div' >  
    <div className='container col-sm-6 d-flex' >
        {inUpdation.text===""?
        todoInput()
        : todoUpdateInput()}
    </div>

    <div className="container col-sm-6 my-5">
        {deleteArray.length>1 && 
        <button className=' btn btn-outline-danger col-12' onClick={()=>{deleteMultipleFunction(deleteArray)}} >Delete Multiple</button>
        }
    {allTodos && allTodos.length>0 && allTodos.map((val,index)=>(
        <div className={`${value.themeColor} border  border-secondary rounded py-3 d-flex justify-content-around`} key={index+val}>
            <Input className=' ' type="checkbox" id='checkk' checked={deleteArray.includes(val.id)? true: false} onChange={()=>checkValue(index, val.id)}/>
                <div>
                    <Label check className='fw-light text-capitalize  ' style={{textDecorationLine: deleteArray.includes(val.id)? 'line-through': "none", color: deleteArray.includes(val.id)? '#c1c1c1': ""}} >
                        {val.text}
                </Label>                    
                </div>
                <div>
                    <button className='btn btn-outline-warning btn-sm fw-light' onClick={()=>updateTodo(val.text,index)} ><i className="fas fa-pen"></i></button>
                    <button className='btn btn-outline-danger btn-sm fw-light mx-2' onClick={()=>deleteTodo(val.id)} ><i className="fa-solid fa-trash-can"></i></button>
                </div>
        </div>        
    ))}
    </div>
    </div>
    );
};


export default Todo;