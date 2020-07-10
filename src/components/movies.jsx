import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
  }

  handleLike = (movie) => {
    // let liked = !this.state.liked;
    // this.setState({ liked });

    // copy current state into array
    let movies = [...this.state.movies];
    //find array index of movie object
    let index = movies.indexOf(movie);
    // clone the object
    movies[index] = { ...movies[index] };
    // toggle the liked property of the cloned object
    movies[index].liked = !movies[index].liked;
    // update the state
    this.setState({ movies });
  };

  handleDelete = (movie) => {
    let movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenres = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (path) => {
    const sortColumn = { ...this.state.sortColumn };

    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.setState({ sortColumn });
    console.log(sortColumn);
  };

  render() {
    const { length: count } = this.state.movies;

    const {
      currentPage,
      pageSize,
      movies: allMovies,
      genres,
      selectedGenre,
      sortColumn,
    } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    console.log(sortColumn);
    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenres}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <p className="font-weight-bold">
            Showing {filtered.length} movies in the database
          </p>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
