import React, { useState } from "react";

export function App() {
  // the todo input
  const [toDo, setToDo] = useState("");
  // the time input
  const [time, setTime] = useState("");
  // the list of todos already entered
  const [toDos, setToDos] = useState([]);
  //setCount is a function that is setting the variable count which is by default 0

  function renderToDo(toDo) {
    if (!toDo.editing)
      return (
        <div
          onClick={(event) => {
            debugger;
            const toDosCopy = [...toDos]; // copy array using array destructuring
            toDosCopy.forEach((element, index) => {
              if (element.toDo === toDo.toDo) {
                element.editing = true;
                return;
              }
            });
            setToDos(toDosCopy);
          }}
        >
          {toDo.toDo + " at " + toDo.time}
        </div>
      );
    return (
      <>
        <input
          type="text"
          aria-label={`Enter New Text For ${toDo.toDo} Here`}
          value={toDo.toDo}
        />
        at
        <input
          type="time"
          aria-label={`Enter New Time For ${toDo.time} Here`}
          value={toDo.time}
        />
        <button type="submit"> Save Changes </button>
      </>
    );
  }

  return (
    <>
      <h1 aria-label="Page Heading" id="heading">
        To Do List
      </h1>
      <form id="form">
        <input placeholder="To Do" id="toDo" />
        <input aria-label="To Do Time" type="time" id="time" />
        <input id="to-do-submit-button" type="submit" value="Add To Do" />
      </form>
      <div className="dropdown">
        <button className="dropbtn">Dropdown</button>
        <div
          aria-label="Sort By Time Or To Do Dropdown"
          className="dropdown-content"
        >
          <a
            aria-label="Sort By Time"
            id="timeSortButton-"
            onclick="callSortTimes()"
          >
            Sort By Time
          </a>
          <a
            aria-label="Sort Alphabeticlly"
            id="alphabeticalSortButton-"
            onclick="callSortTimes()"
          >
            Sort Alphabeticlly
          </a>
        </div>
      </div>
      <input
        aria-label="Text To Search To Do"
        type="text"
        id="searchToDo"
        placeholder="🔍 Search"
        onkeyup="toDoSort()"
      />
      <div id="sortBy">Not Sorting</div>
      <ol id="List">
        {toDos.map((toDo) => {
          return <li>{renderToDo(toDo)}</li>;
        })}
      </ol>
    </>
  );
}
