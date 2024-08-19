import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";


function Create() {
  const [task, setTask] = useState()
  const handleAdd = () => {
    axios.post('http://localhost:3001/add', {task: task}).then(result => console.log(result))
    .catch(err => console.log(`ERror occured ${err}`));
  }
  return (
    <div className="" style={{ display: "flex", gap: "6px" }}>
      <TextField  id="outlined-basic" label="" variant="outlined" onChange={(e) => setTask(e.target.value)}/>
      <Button onClick={handleAdd} variant="outlined">
        ADD
      </Button>
    </div>
  );
}

export default Create;
