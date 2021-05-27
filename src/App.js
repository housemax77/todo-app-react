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

  // Copy toDos, then store a sorted copy in a variable NOT STATE
  const sortedToDos = filteredToDos.sort(function (
    firstElement,
    secondElement
  ) {
    if (sortingBy === "Don't Sort") return;
    else if (sortingBy === "Sort By Time") {
      const splitTimeA = firstElement.time.split(":");
      const splitTimeB = secondElement.time.split(":");
      if (parseInt(splitTimeA[0]) - parseInt(splitTimeB[0]) === 0) {
        return parseInt(splitTimeA[1]) - parseInt(splitTimeB[1]);
      } else {
        return parseInt(splitTimeA[0]) - parseInt(splitTimeB[0]);
      }
    } else if (sortingBy === "Sort Alphabetically") {
      var listOfToDos = [];
      const toDosCopy = [...toDos];
      toDosCopy.forEach((toDo) => {
        listOfToDos.push(toDo.toDo);
      });
      listOfToDos.sort();
      toDosCopy.map((toDo, index) => {
        toDo.toDo = listOfToDos[index];
      });
      return toDosCopy;
    }
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
        sortingBy={sortingBy}
        setSortingBy={setSortingBy}
        toDos={toDos}
        setToDos={setToDos}
        setSearchContent={setSearchContent}
      />
      <ToDoList
        setNewStateAndLocalStorage={setNewStateAndLocalStorage}
        toDos={sortedToDos}
        setToDo={setToDo}
        setTime={setTime}
        setToDos={setToDos}
      />
    </>
  );
}
