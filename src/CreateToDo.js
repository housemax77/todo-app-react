import React from "react";

export function CreateToDo(props) {
  const time = props.time;
  const toDo = props.toDo;
  const setToDo = props.setToDo;
  const setToDos = props.setToDos;
  const setTime = props.setTime;
  const toDos = props.toDos;
  return (
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
  );
}
