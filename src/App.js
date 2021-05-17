import React, { useState } from "react";

export function App() {
  // the todo input
  const [toDo, setToDo] = useState("");
  // the time input
  const [time, setTime] = useState("");
  // the list of todos already entered
  const [toDos, setToDos] = useState([]);

  function createCheckBox(toDo, index) {
    return (
      <input
        type="checkBox"
        id={"checkBox-" + index}
        aria-label={`Did you ${toDo.toDo}?`}
        onClick={(event) => {
          const updatedToDos = toDos.map((toDo, index) => {
            const todoIndex = event.target.id.split("-")[1];
            if (todoIndex === index.toString()) {
              const toDoCopy = { ...toDo };
              toDoCopy.done = !toDoCopy.done;
              return toDoCopy;
            } else {
              return toDo;
            }
          });
          setToDos(updatedToDos);
        }}
      ></input>
    );
  }

  function createDeleteButton(toDo, indexForId) {
    return (
      <button
        className="deleteButton"
        type="submit"
        id={"submitButton-" + indexForId}
        aria-label={`Delete ${toDo.toDo} To Do?`}
        onClick={(event) => {
          const userConfirmedDelete = window.confirm(
            "Do you want to delete " + toDo.toDo + "?"
          );
          if (!userConfirmedDelete) return false;
          const filteredToDos = toDos.filter(
            (element, index) => index !== indexForId
          );
          setToDos(filteredToDos);
          document.getElementsByTagName("li").innerHTML = "";
          toDos.forEach((element, index) => renderToDo(element, index));
        }}
      >
        Delete
      </button>
    );
  }

  function renderToDo(toDo, index) {
    if (!toDo.editing && toDo.done) {
      return (
        <div aria-label={"To Do and time text " + index} className="checked">
          {toDo.toDo + " at " + toDo.time}
          {createCheckBox(toDo, index)}
          {createDeleteButton(toDo, index)}{" "}
        </div>
      );
    } else if (!toDo.editing) {
      return (
        <div>
          <div
            onClick={(event) => {
              const toDosCopy = [...toDos];
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
          {createCheckBox(toDo, index)}
          {createDeleteButton(toDo, index)}
        </div>
      );
    } else if (toDo.editing) {
      return toDoInput(toDo, index);
    }
    function toDoInput(toDo, index) {
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
      <ol className="List">
        {toDos.map((toDo, index) => {
          return <li key={toDo.toDo}>{renderToDo(toDo, index)}</li>;
        })}
      </ol>
    </>
  );
}
