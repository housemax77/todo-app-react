import React, { useState } from "react";
import { Header } from "./Header";
import { ToDoList } from "./ToDoList";
import { CreateToDo } from "./CreateToDo";
import { ToolBar } from "./ToolBar";

export function App() {
  const [sortingBy, setSortingBy] = useState(localStorage.getItem("sortBy"));
  // move state to the top
  // contents of toDo input
  const [toDo, setToDo] = useState("");
  // contents of time input
  const [time, setTime] = useState("");
  // the list of todos already entered
  const [toDos, setToDos] = useState(initialToDos());
  const [searchContent, setSearchContent] = useState("");

  function setNewStateAndLocalStorage(newToDos) {
    const stringifiedToDoList = JSON.stringify(newToDos);
    localStorage.setItem("toDoList", stringifiedToDoList);
    setToDos(newToDos);
  }

  function initialToDos() {
    const toDos = localStorage.getItem("toDoList");
    if (toDos === null) return [];
    return JSON.parse(toDos);
  }

  // I suggest treating sorting like this too.
  const filteredToDos = toDos.filter((toDo) => {
    const includesSearchContent = toDo.toDo
      .toLowerCase()
      .includes(searchContent.toLowerCase());
    return includesSearchContent;
  });

  // const sortedToDos = toDos.sort((toDo) => {

  // });

  // I suggest sorting here when sorting is enabled.
  // Store the sorting setting in state, in this component and pass the setSearchSetting function down to Toolbar so toolbar can change the sorting setting.
  // Then you can stop sorting the toDos in state

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
