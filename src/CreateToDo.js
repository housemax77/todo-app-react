// import React, { useState } from "react";

// export function CreateToDo(props) {
//   // the todo input
//   const [toDo, setToDo] = useState("");
//   // the time input
//   const [time, setTime] = useState("");
//   // the list of todos already entered
//   const [toDos, setToDos] = useState([]);
//   //   const setToDos = props.setToDos;
//   return (
//     <form
//       onSubmit={(event) => {
//         event.preventDefault();
//         setToDos([
//           ...toDos,
//           { toDo: toDo, time: time, done: false, editing: false },
//         ]);
//         setToDo("");
//         setTime("");
//       }}
//     >
//       <input
//         placeholder="To Do"
//         value={toDo}
//         onChange={(event) => setToDo(event.target.value)}
//         className="toDo"
//       />
//       <input
//         aria-label="To Do Time"
//         type="time"
//         value={time}
//         onChange={(event) => setTime(event.target.value)}
//         className="time"
//       />
//       <input className="submit-toDo" type="submit" value="Add To Do" />
//     </form>
//   );
// }
