import React, { useState } from "react";
import { Header } from "./Header";
import { ToDoList } from "./ToDoList";
import { CreateToDo } from "./CreateToDo";
import { ToolBar } from "./ToolBar";

export function App() {
  function setNewStateAndLocalStorage(newToDos) {
    const stringifiedToDoList = JSON.stringify(newToDos);
    debugger;
    localStorage.setItem("toDoList", stringifiedToDoList);
    setToDos(newToDos);
  }

  function initialToDos() {
    const toDos = localStorage.getItem("toDoList");
    if (toDos === null) return [];
    return JSON.parse(toDos);
  }
  // contents of toDo input
  const [toDo, setToDo] = useState("");
  // contents of time input
  const [time, setTime] = useState("");
  // the list of todos already entered
  const [toDos, setToDos] = useState(initialToDos());
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
        setNewStateAndLocalStorage={setNewStateAndLocalStorage}
        time={time}
        setTime={setTime}
        toDo={toDo}
        setToDo={setToDo}
        toDos={toDos}
      />
      <ToolBar
        toDos={toDos}
        setToDos={setToDos}
        setSearchContent={setSearchContent}
      />
      <ToDoList
        setNewStateAndLocalStorage={setNewStateAndLocalStorage}
        toDos={filteredToDos}
        setToDo={setToDo}
        setTime={setTime}
        setToDos={setToDos}
      />
    </>
  );
}
