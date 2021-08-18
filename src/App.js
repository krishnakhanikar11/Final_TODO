import './App.css';
import {useState,useEffect} from 'react'

function App() {

  //getting local data back
  const getLocalData = () =>{
    const list = localStorage.getItem("mytodo")

    if(list){
      return JSON.parse(list);
    }
    else{
      return []
    }

  }

  //input State
  const [inputData, setInputData] = useState("")

  //list State
  const [item,setItem] = useState(getLocalData)

  const [editItems,setEditItem] = useState("")
  const [toggleBtn,setToggleBtn] = useState(false)


  //adding items in a list
  const addItem = () => {
    if (!inputData){
      alert("Pls fill in the box")
    }
    else if(inputData && toggleBtn){
      setItem(item.map((curr) => {
        if (curr.id === editItems){
          return {...curr,name:inputData}
        }
        else{
          return curr
        }
      }))
      setToggleBtn(false)
      setInputData("")
    }
    else{
      const newData = {
        id : new Date().getTime().toString(),
        name : inputData
      }
      setItem([...item,newData])
      setInputData("")
    }  
  }

  //edit item
  const editItem = (index) =>{
    const todo_find = item.find((curr) => {
      return curr.id === index
    })

    setEditItem(index)
    setInputData(todo_find.name)
    setToggleBtn(true)


  }
  //delete items from a list 
  const deleteItem = (itemID) => {
    const updateItem = item.filter((currItem) => {
      return currItem.id !== itemID;
    })
    setItem(updateItem);
  }

  const removeAll = () => {
    setItem([])
  }

  useEffect(() => {
    localStorage.setItem("mytodo",JSON.stringify(item));
  }, [item])

  return (
    <div className="main-div">
      <div className='child-div'>
        <figure>
          <figcaption>Add your list here.</figcaption>
        </figure>
        <div className='addItems'>
          <input 
          type='text'
          placeholder='✍️ Add items'
          className='form-control'
          value={inputData}
          onChange={(event) => setInputData(event.target.value)} />
          {toggleBtn?<i className='far fa-edit add-btn' onClick={addItem}></i> : <i className='fa fa-plus add-btn' onClick={addItem}></i> }
          
        </div>
        <div className='showItems'>
          {item.map((curr) => {
            return(
              <div className='eachItem' key ={curr.id}>
            <h3>{curr.name}</h3>
            <div className='todo-btn'>
              <i className='far fa-edit add-btn' onClick={() => editItem(curr.id)}></i>
              <i className='far fa-trash-alt add-btn' onClick={() => deleteItem(curr.id)}></i>
            </div>
          </div>
            )
          })}
          
        </div>
        <div className='showItems'><button className='btn effect04' data-sm-link-text='Remove All' onClick={removeAll}><span>Check List</span></button></div>
      </div>
      
    </div>
  );
}

export default App;
