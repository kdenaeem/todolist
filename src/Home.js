import React, { useEffect, useState } from "react";
import Create from "./Create.js";
import axios from "axios";
import { css } from "@emotion/css";
import { Checkbox } from "./components/ui/checkbox";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  Card,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

const color = "";

export default function Home() {
  const [todos, setTodo] = useState([]);
  const hoverStyle = css`
    padding: 8px;
    font-size: 14px;
    border-radius: 4px;

    .parent-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%; /* Adjust based on your needs */
    }

    .items {
      width: 100%;
      max-width: 300px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .delete-icon {
      margin-left: auto; /* This pushes the delete icon to the far right */
    }

    &:hover {
      color: ${color};
    }
  `;

  const getTodos = () => {
    axios
    .get("http://localhost:3001/get")
    .then((result) => setTodo(result.data))
    .catch((err) => console.log(err));
  }
  useEffect(() => {
    getTodos();
    // get
  }, []);
  const handleEdit = (id) => {
    axios.put('http://localhost:3001/update/' + id)
    .then((result) => {window.location.reload()})
    .catch((err) => console.log(err))
  }

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/delete/' + id)
    .then((result) => {window.location.reload()})
    .catch((err) => console.log(err))

  }
  console.log(todos.id);
  return (
    <div className="parent-container">
      <div
        className="items-center mt-30"
        style={{
          display: "flex",
          gap: "4px",
          flexDirection: "column",
          marginTop: "250px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black mx-auto	">
          Todo List
        </h1>
        <Create getTodos={getTodos}/>
        {todos.length === 0 ? (
          <div>
            {" "}
            <h2 className="mt-5 text-2xl leading-none">No Todos added</h2>
          </div>
        ) : (
          todos
          // .filter(todo => !todo.done)
          .map((todo) => (
            <div className={hoverStyle} key={todo._id}>
              <div className="items">
                <Card className="flex flex-row items-center p-4 h-16 md:h-166 lg:h-16 rounded-3xl">
                  <div className="flex items-center mr-14">
                    <Checkbox id="checkbox" onClick={() => handleEdit(todo._id)}/>
                    <CardHeader> 
                      <CardTitle className="font-normal text-lg">{todo.task}</CardTitle>
                    </CardHeader>
                  </div>
                  <DeleteIcon className="ml-auto" onClick={() => handleDelete(todo._id)}/>
                </Card>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
