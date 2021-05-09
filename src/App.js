import React, { useState } from "react";

export function App() {
  // the todo input
  const [toDo, setToDo] = useState("");
  // the time input
  const [time, setTime] = useState("");
  // the list of todos already entered
  const [toDos, setToDos] = useState([]);
  //setCount is a function that is setting the variable count which is by default 0

  function createCheckBox(toDo, index) {
    debugger;
    return (
      <input
        type="checkBox"
        id={"checkBox-" + index}
        aria-label={`Did you ${toDo}?`}
        onClick={(event) => {
          debugger;
          const updatedToDos = toDos.map((toDo, index) => {
            // use id to determine which toDo to edit event.target.id
            const splitId = event.target.id.split("-");
            const indexToString = index.toString();
            if (splitId[1] === indexToString) {
              debugger;
              const toDoCopy = { ...toDo };
              if (toDoCopy.done === true) {
                toDoCopy.done = false;
              } else {
                toDoCopy.done = true;
              }
              return toDoCopy;
            } else {
              return toDo;
            }
          });
          debugger;
          setToDos(updatedToDos);
        }}
      ></input>
    );
  }

  function renderToDo(toDo, index) {
    if (!toDo.editing) {
      if (toDo.done) {
        <div className="checked">
          {
            toDo.toDo + " at " + toDo.time
            // + createCheckBox(toDo, index)
          }{" "}
        </div>;
      } else {
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
              debugger;
            }}
          >
            {toDo.toDo + " at " + toDo.time}
          </div>
          // createCheckBox(toDo, index)
        );
      }
    }
    return (
      <>
        <div>
          <input
            type="text"
            id={"toDo-Input-" + index}
            onChange={(event) => {
              const updatedToDos = toDos.map((toDo, index) => {
                // use id to determine which toDo to edit event.target.id
                const splitId = event.target.id.split("-");
                const indexToString = index.toString();
                if (splitId[2] === indexToString) {
                  const toDoCopy = { ...toDo };
                  toDoCopy.toDo = event.target.value;
                  return toDoCopy;
                } else {
                  return toDo;
                }
              });
              setToDos(updatedToDos);
            }}
            aria-label={`Enter New Text For ${toDo.toDo} Here`}
            value={toDo.toDo}
          />
          at
          <input
            type="time"
            id={"time-Input-" + index}
            onChange={(event) => {
              const updatedToDos = toDos.map((time, index) => {
                // use id to determine which toDo to edit event.target.id
                const splitId = event.target.id.split("-");
                const indexToString = index.toString();
                debugger;
                if (splitId[2] === indexToString) {
                  debugger;
                  const timeCopy = { ...time };
                  timeCopy.time = event.target.value;
                  return timeCopy;
                } else {
                  return time;
                }
              });
              setToDos(updatedToDos);
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
        {createCheckBox(toDo, index)}
      </>
    );
  }

  return (
    <>
      <h1 aria-label="Page Heading">To Do List</h1>
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
          class="toDo"
        />
        <input
          aria-label="To Do Time"
          type="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          class="time"
        />
        <input class="submit-toDo" type="submit" value="Add To Do" />
      </form>
      <div className="dropdown">
        <button className="dropbtn">Dropdown</button>
        <div
          aria-label="Sort By Time Or To Do Dropdown"
          className="dropdown-content"
        >
          <a aria-label="Sort By Time" onClick="callSortTimes()">
            Sort By Time
          </a>
          <a aria-label="Sort Alphabeticlly" onClick="callSortTimes()">
            Sort Alphabeticlly
          </a>
        </div>
      </div>
      <input
        aria-label="Text To Search To Do"
        type="text"
        class="search"
        placeholder="🔍 Search"
        onkeyup="toDoSort()"
      />
      <div class="sort-text">Not Sorting</div>
      <ol class="List">
        {toDos.map((toDo, index) => {
          return <li>{renderToDo(toDo, index)}</li>;
        })}
      </ol>
    </>
  );
}
