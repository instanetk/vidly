import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import _ from "lodash";
import { ToastContainer } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: {
      path: "title",
      order: "asc",
    },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [
      {
        _id: "",
        name: "All Genres",
      },
      ...data,
    ];

    const { data: movies } = await getMovies();
    this.setState({
      movies: movies,
      genres,
    });
  }

  handleLike = (movie) => {
    // copy current state into array
    let movies = [...this.state.movies];
    //find array index of movie object
    let index = movies.indexOf(movie);
    // clone the object
    movies[index] = {
      ...movies[index],
    };
    // toggle the liked property of the cloned object
    movies[index].liked = !movies[index].liked;
    // update the state
    this.setState({
      movies,
    });
  };

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    let movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({
      movies,
    });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted.");
        this.setState({ movies: originalMovies });
      }
    }
  };

  handlePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  handleGenres = (genre) => {
    this.setState({
      selectedGenre: genre,
      searchQuery: "",
      currentPage: 1,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({
      sortColumn,
    });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedGenre: null,
      currentPage: 1,
    });
  };

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      selectedGenre,
      searchQuery,
      sortColumn,
      movies: allMovies,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return {
      totalCount: filtered.length,
      data: movies,
    };
  };

  render() {
    const { length: count } = this.state.movies;

    const { currentPage, pageSize, genres, sortColumn } = this.state;

    if (count === 0) return <p> There are no movies in the database. </p>;

    const { totalCount, data: movies, searchQuery } = this.getPagedData();

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
          <Link to="/movies/new" className="btn btn-primary">
            New Movie
          </Link>
          <p className="font-weight-bold">
            Showing {totalCount} movies in the database
          </p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemCount={totalCount}
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
