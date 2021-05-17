import React, { useState } from "react";

export function App() {
  // the todo input
  const [toDo, setToDo] = useState("");
  // the time input
  const [time, setTime] = useState("");
  // the list of todos already entered
  const [toDos, setToDos] = useState([]);

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
        type="text"
        className="search"
        placeholder="🔍 Search"
        // onKeyUp="toDoSort()"
      />
      <div className="sort-text">Not Sorting</div>
      <ToDoList toDos={filteredToDos} setToDos={setToDos} />
    </>
  );
}
