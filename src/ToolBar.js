import React, { useState } from "react";

export function ToolBar(props) {
  const [sortingText, setSortingText] = useState("");
  const toDos = props.toDos;
  return (
    <>
      <div className="dropdown">
        <button className="dropbtn">Sort</button>
        <div
          aria-label="Sort By Time Or To Do Dropdown"
          className="dropdown-content"
        >
          <a
            aria-label="Sort By Time"
            onClick={(event) => {
              if (sortingText === "Sorting By Time") return;
              const toDosCopy = [...toDos];
              const sortedToDos = toDosCopy.sort(function (
                firstElement,
                secondElement
              ) {
                const splitedTimeA = firstElement.time.split(":");
                const splitedTimeB = secondElement.time.split(":");
                if (
                  parseInt(splitedTimeA[0]) - parseInt(splitedTimeB[0]) ===
                  0
                ) {
                  return parseInt(splitedTimeA[1]) - parseInt(splitedTimeB[1]);
                } else {
                  return parseInt(splitedTimeA[0]) - parseInt(splitedTimeB[0]);
                }
              });
              setSortingText("Sorting By Time");
              props.setToDos(sortedToDos);
            }}
          >
            Sort By Time
          </a>
          <a
            aria-label="Sort Alphabeticlly"
            onClick={(event) => {
              var listOfToDos = [];
              const toDosCopy = [...toDos];
              toDosCopy.forEach((toDo) => {
                listOfToDos.push(toDo.toDo);
              });
              listOfToDos.sort();
              toDosCopy.map((toDo, index) => {
                toDo.toDo = listOfToDos[index];
              });
              props.setToDos(toDosCopy);
              setSortingText("Sorting Alphabettically");
            }}
          >
            Sort Alphabeticlly
          </a>
        </div>
      </div>
      <input
        aria-label="Text To Search To Do"
        type="search"
        className="search"
        placeholder="🔍 Search"
        onChange={(event) => props.setSearchContent(event.target.value)}
      />
      <div value={sortingText} className="sort-text">
        Not Sorting
      </div>
    </>
  );
}
