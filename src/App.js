import React, { useState } from "react";
import { Header } from "./Header";
import { ToDoList } from "./ToDoList";
import { CreateToDo } from "./CreateToDo";
import { ToolBar } from "./ToolBar";

export function App() {
  // contents of toDo input
  const [toDo, setToDo] = useState("");
  // contents of time input
  const [time, setTime] = useState("");
  // the list of todos already entered
  const [toDos, setToDos] = useState([]);
  const [searchContent, setSearchContent] = useState("");
  const filteredToDos = toDos.filter((toDo) => {
    const includesSearchContent = toDo.toDo
      .toLowerCase()
      .includes(searchContent.toLowerCase());
    return includesSearchContent;
  });

  return (
    <>
      <Header />
      <CreateToDo
        time={time}
        setTime={setTime}
        toDo={toDo}
        setToDo={setToDo}
        toDos={toDos}
        setToDos={setToDos}
      />
      <ToolBar
        toDos={toDos}
        setToDos={setToDos}
        setSearchContent={setSearchContent}
      />
      <ToDoList
        toDos={filteredToDos}
        setToDo={setToDo}
        setTime={setTime}
        setToDos={setToDos}
      />
    </>
  );
}
