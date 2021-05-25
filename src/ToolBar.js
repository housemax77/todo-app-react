import React, { useState } from "react";

export function ToolBar(props) {
  // Suggest moving this state to App so that app can read this setting and sort the todos on each render when sorting is enabled.
  // Suggest renaming this to sort and supporting 3 potential values: off, todo, or time.
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
              // Suggest sorting "on-the-fly" just like you're filtering "on-the-fly"
              // So handle like you're handling search: Calculate it on each render.
              if (sortingText === "Sorting By Time") return;
              const toDosCopy = [...toDos];
              const sortedToDos = toDosCopy.sort(function (
                firstElement,
                secondElement
              ) {
                const splitTimeA = firstElement.time.split(":");
                const splitTimeB = secondElement.time.split(":");
                if (parseInt(splitTimeA[0]) - parseInt(splitTimeB[0]) === 0) {
                  return parseInt(splitTimeA[1]) - parseInt(splitTimeB[1]);
                } else {
                  return parseInt(splitTimeA[0]) - parseInt(splitTimeB[0]);
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
