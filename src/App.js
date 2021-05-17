import React, { useState } from "react";
import { Header } from "./Header";
import { ToDoList } from "./ToDoList";
// import { CreateToDo } from "./CreateToDo";

export function App() {
  // the todo input
  const [toDo, setToDo] = useState("");
  // the time input
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
      <form
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
      </form>

      {/* <CreateToDo setToDos={setToDos} /> */}
      <div className="dropdown">
        <button className="dropbtn">Dropdown</button>
        <div
          aria-label="Sort By Time Or To Do Dropdown"
          className="dropdown-content"
        >
          {/* <a aria-label="Sort By Time" onClick={callSortTimes}>
            Sort By Time
          </a>
          <a aria-label="Sort Alphabeticlly" onClick={callSortTimes}>
            Sort Alphabeticlly
          </a> */}
        </div>
      </div>
      <input
        aria-label="Text To Search To Do"
        type="search"
        className="search"
        placeholder="🔍 Search"
        onChange={(event) => setSearchContent(event.target.value)}
      />
      <div className="sort-text">Not Sorting</div>
      <ToDoList toDos={filteredToDos} setToDos={setToDos} />
    </>
  );
}
