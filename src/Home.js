import React, {useEffect, useState} from "react";
import Create from "./Create.js"
import axios from "axios";
import { css } from '@emotion/css';
import { Checkbox } from "./components/ui/checkbox"


const color = 'white'

export default function Home() {
  const [todos, setTodo] = useState([]);
  const hoverStyle = css`
  padding: 8px;
  background-color: #7CB9E8;
  font-size: 14px;
  border-radius: 4px;
  &:hover {
    color: ${color};
  }
`;


  useEffect(() => {
    // get 
    axios.get('http://localhost:3001/get')
    .then(result => setTodo(result.data) )
    .catch(err => console.log(err))

  }, [])
  console.log(todos.id)
  return (
  <div className="items-center mt-30" style={{ display: "flex", gap: "4px", flexDirection: "column", marginTop: "250px"}}>
<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black mx-auto	">Todo List</h1>
<Create />
    {
      todos.length === 0 ? 
      <div> <h2 className="mt-5 text-2xl leading-none">No Todos added</h2></div> :
      todos.map(todo => (
        <div className={hoverStyle}>

          <div className="checkbox">
            <Checkbox id="terms" />
            <p>{todo.task}</p>

          </div>
      </div>
      ))
    }
  

  </div>)
}
