import React from "react";
import Like from "./common/like";

const MoviesTable = (props) => {
  const { movies, onLike, onDelete, onSort } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort("title")} scope="col">
            Title
          </th>
          <th onClick={() => onSort("genre.name")} scope="col">
            Genre
          </th>
          <th onClick={() => onSort("numberInStock")} scope="col">
            Stock
          </th>
          <th onClick={() => onSort("dailyRentalRate")} scope="col">
            Rate
          </th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>

      {movies.map((movie) => (
        <tbody key={movie._id}>
          <tr>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like movie={movie} onClick={() => onLike(movie)} />
            </td>
            <td>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(movie)}
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};

export default MoviesTable;
