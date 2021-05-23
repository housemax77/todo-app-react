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
      {/* <form
        onSubmit={(event) => {
          event.preventDefault();
          setToDos([
            ...toDos,
            { toDo: toDo, time: time, done: false, editing: false },
          ]);
          setToDo("");
          setTime("");
        }}
      >
        <input
          placeholder="To Do"
          value={toDo}
          onChange={(event) => setToDo(event.target.value)}
          className="toDo"
        />
        <input
          aria-label="To Do Time"
          type="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          className="time"
        />
        <input className="submit-toDo" type="submit" value="Add To Do" />
      </form> */}

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
