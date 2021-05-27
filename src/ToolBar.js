import React from "react";

export function ToolBar(props) {
  // Suggest renaming this to sort and supporting 3 potential values: off, todo, or time.

  const setSortingBy = props.setSortingBy;

  function sortingClicked(sortingBy) {
    setSortingBy(sortingBy);
    localStorage.setItem("sortBy", sortingBy);
  }

  function createSortRadioButton(value) {
    const inputProps = {
      type: "radio",
      onClick: (event) => sortingClicked(event.target.value),
      name: "sortBy",
      value: value,
    };

    if (value === props.sortingBy) {
      inputProps.checked = "Bananna";
    }
    return (
      <>
        <input aria-label={value} {...inputProps} />
        <label for={value}>{value}</label>
      </>
    );
  }

  return (
    <>
      <form className="sortingBy">
        {createSortRadioButton("Don't Sort")}
        {createSortRadioButton("Sort Alphabetically")}
        {createSortRadioButton("Sort By Time")}
      </form>
      <input
        aria-label="Text To Search To Do"
        type="search"
        className="search"
        placeholder="🔍 Search"
        onChange={(event) => props.setSearchContent(event.target.value)}
      />
      <div value={props.sortingBy} className="sort-text">
        Not Sorting
      </div>
    </>
  );
}
