import React, { useState } from 'react';


function App() {

  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editButtonActive, setEditButtonActive] = useState(false);
  const [edittedText, setEdittedText] = useState("");
  const [edittedTodos, setEdittedTodos] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoText === "") {
      alert("Please type your todo")
      return;
    }

    const newTodo = {
      id: new Date().getTime(),
      title: todoText,
      date: new Date(),
      hasDone: false
    };

    setTodos([...todos, newTodo])
    setTodoText("")


  };

  const handleDeleteTodo = (id) => {
    const filteredTodo = todos.filter((item) => item.id !== id);
    setTodos(filteredTodo);
  }

  const handleHasDone = (todo) => {
    let doneTodos = [];
    todos.map((item) => {
      if (item.id === todo.id) {
        let updatedTodo = {
          ...todo, hasDone: !todo.hasDone
        }
        doneTodos.push(updatedTodo);
      } else {
        doneTodos.push(item);
      }
    })
    setTodos(doneTodos);
  };

  const handleEdittedTodo = (event) => {
    event.preventDefault()
    if (edittedText === "") {
      alert("Todo text can´t be empty")
      return
    }
    let edittedTodo = []
    todos.map((item) => {
      if (item.id === edittedTodos.id) {
        let updatedTodo = {
          ...edittedTodos,
          title: edittedText
        }
        edittedTodo.push(updatedTodo)
      } else {
        edittedTodo.push(item)
      }
      setTodos(edittedTodo)
      setEditButtonActive(false)
    })
  }
  return (
    <div className='container my-5'>
      <form onSubmit={handleSubmit} >
        <div className="input-group mb-3">
          <input value={todoText}
            onChange={(event) => {
              setTodoText(event.target.value)
            }}
            type="text" className="form-control" placeholder="Please write your todo" />

          <button className="btn btn-primary" type="submit" >Add</button>
        </div>
      </form>


      {editButtonActive === true && (
        <form onSubmit={handleEdittedTodo}>
          <div>
            <div>
              <input value={edittedText}
                onChange={(event) => setEdittedText(event.target.value)}
                type="text" className="form-control" />
            </div>
            <div className='my-2'>
              <button onClick={() => {
                setEditButtonActive(false)
              }}
                className="btn btn-danger m-1" type="button" >Cancel</button>
              <button className="btn btn-warning m-1" type="submit" >Save</button>
            </div>
          </div>
        </form>
      )
      }


      <div className='container p-1'  >
        {
          todos.length === 0 ? (
            <p className="text-center" style={{color:"red"}}>You don´t have any todos yet.</p>) : (
            <>
              {
                todos.map((item, index) => (
                  <div className='mb-2' key={index} style={{ border: "1px solid black" }}>

                    <div className="m-1">

                      <div className='p-1'>
                        <h1
                          style={{
                            textDecoration: item.hasDone === true ? "line-through" : "none",
                            backgroundColor: item.hasDone === true ? "greenyellow" : "pink"
                          }}
                          key={index}> {item.title}</h1>
                        <small style={{ color: "grey" }} > {new Date(item.date).toLocaleDateString()}</small>
                      </div>

                    </div>
                    <div className='d-flex justify-content-between align-text-center' >
                      <button onClick={() => {
                        handleDeleteTodo(item.id)
                      }}
                        className='btn btn-danger w-25 m-2'>Delete</button>

                      <button onClick={() => {
                        setEditButtonActive(true)
                        setEdittedText(item.title)
                        setEdittedTodos(item)

                      }}
                        className='btn btn-info w-25 m-2'>Edit</button>

                      <button onClick={() => handleHasDone(item)}
                        className='btn btn-success w-25 m-2'>{item.hasDone === false ? "Done" : "Undone"}</button>
                    </div>
                  </div>
                ))
              }
            </>
          )
        }
      </div>

    </div>
  )
}


export default App;
