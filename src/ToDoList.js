import React from "react";

export function ToDoList(props) {
  const toDos = props.toDos;
  const setToDos = props.setToDos;

  // Unify with unchecked by accepting a third boolean argument called "checked".
  function createCheckedCheckBox(toDo, index) {
    return (
      <input
        checked
        type="checkBox"
        id={"checkBox-" + index}
        aria-label={`Did you ${toDo.toDo}?`}
        onChange={(event) => {
          onBoxCheck(event);
        }}
      />
    );
  }

  function createCheckBox(toDo, index) {
    if (toDo.done === true) {
      return createCheckedCheckBox(toDo, index);
    } else {
      return createUnCheckedCheckBox(toDo, index);
    }
  }

  function onBoxCheck(event) {
    const updatedToDos = toDos.map((toDo, index) => {
      const toDoIndex = event.target.id.split("-")[1];
      if (toDoIndex === index.toString()) {
        const toDoCopy = { ...toDo };
        toDoCopy.done = !toDoCopy.done;
        return toDoCopy;
      } else {
        return toDo;
      }
    });
    props.setNewStateAndLocalStorage(updatedToDos);
    setToDos(updatedToDos);
  }

  function createUnCheckedCheckBox(toDo, index) {
    return (
      <input
        type="checkBox"
        id={"checkBox-" + index}
        aria-label={`Did you ${toDo.toDo}?`}
        onChange={(event) => {
          onBoxCheck(event);
        }}
      />
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
          props.setNewStateAndLocalStorage(filteredToDos);
        }}
      >
        Delete
      </button>
    );
  }

  function renderToDo(toDo, index) {
    if (toDo.hidden) {
      return null;
    }
    if (!toDo.editing && toDo.done) {
      return createDoneToDo(toDo, index);
    } else if (!toDo.editing) {
      return (
        <div>
          <div
            // Remove ids? Do you need? Same question for others.
            id={"toDoText-" + index}
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
  }

  function createDoneToDo(toDo, index) {
    return (
      <div>
        <div
          id={"toDoText-" + index}
          aria-label={"To Do and time text " + index}
          className="checked"
        >
          {toDo.toDo + " at " + toDo.time}
        </div>
        {createCheckBox(toDo, index)}
        {createDeleteButton(toDo, index)}{" "}
      </div>
    );
  }

  function toDoInput(toDo, index) {
    return (
      <>
        <div>
          <input
            type="text"
            id={"toDo-Input-" + index}
            onChange={(event) => {
              // Call the same onChange func for this and the one below.
              const updatedToDos = toDos.map((toDo, index) => {
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
                const splitId = event.target.id.split("-");
                const indexToString = index.toString();
                if (splitId[2] === indexToString) {
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
            // Instead, this should be in a <form>, and this onClick body should be in the form's onSubmit.
            // Look at how you're handling adding a todo and do the same here.
            onClick={(event) => {
              const toDosCopy = [...toDos];
              toDosCopy.forEach((element, index) => {
                element.editing = false;
                if (element.toDo !== toDo.toDo || element.time !== toDo.time) {
                  toDosCopy.toDo = toDo.toDo;
                  toDosCopy.time = toDo.time;
                }
              });
              const stringifiedToDoList = JSON.stringify(toDosCopy);
              localStorage.setItem("toDoList", stringifiedToDoList);
              setToDos(toDosCopy);
            }}
            type="submit"
          >
            {" "}
            Save Changes{" "}
          </button>
        </div>
        {createCheckBox(toDo, index)}
        {createDeleteButton(toDo, index)}
      </>
    );
  }
  return (
    <ol className="List">
      {toDos.map((toDo, index) => {
        return <li key={toDo.toDo}>{renderToDo(toDo, index)}</li>;
      })}
    </ol>
  );
}
