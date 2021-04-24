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
        <div>
          <input
            type="text"
            onChange={(event) => {
              const toDosCopy = [...toDos];
              toDosCopy.forEach((element, index) => {
                toDosCopy[index].toDo = event.target.value;
              });
              setToDos(toDosCopy);
            }}
            aria-label={`Enter New Text For ${toDo.toDo} Here`}
            value={toDo.toDo}
          />
          at
          <input
            type="time"
            onChange={(event) => {
              const toDosCopy = [...toDos]; // copy array using array destructuring
              toDosCopy.forEach((element, index) => {
                toDosCopy[index].time = event.target.value;
              });
              setToDos(toDosCopy);
            }}
            aria-label={`Enter New Time For ${toDo.time} Here`}
            value={toDo.time}
          />
          <button
            onClick={(event) => {
              const toDosCopy = [...toDos]; // copy array using array destructuring
              toDosCopy.forEach((element, index) => {
                element.editing = false;
                if (element.toDo !== toDo.toDo || element.time !== toDo.time) {
                  toDosCopy.toDo = toDo.toDo;
                  toDosCopy.time = toDo.time;
                }
              });
              setToDos(toDosCopy);
            }}
            type="submit"
          >
            {" "}
            Save Changes{" "}
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 aria-label="Page Heading" id="heading">
        To Do List
      </h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setToDos([{ toDo: toDo, time: time, done: false, editing: false }]);
        }}
      >
        <input
          placeholder="To Do"
          value={toDo}
          onChange={(event) => setToDo(event.target.value)}
          id="toDo"
        />
        <input
          aria-label="To Do Time"
          type="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          id="time"
        />
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
