import React from "react";

const MovieForm = ({ match, history }) => {
  const id = match.params.id;
  return (
    <React.Fragment>
      <h1>Movie Form {id}</h1>
      <button
        type="button"
        class="btn btn-primary"
        onClick={() => history.push("/movies")}
      >
        Save
      </button>
    </React.Fragment>
  );
};

export default MovieForm;
