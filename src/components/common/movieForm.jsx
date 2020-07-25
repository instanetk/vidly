import React from "react";
import Joi from "joi-browser";
import Form from "./form";

class MovieForm extends Form {
  state = {
    data: { title: "", genre: "", stock: "", rate: "" },
    errors: {},
  };

  schema = {
    title: Joi.string().required().label("Title"),
    genre: Joi.string().label("Genre"),
    stock: Joi.number().required().min(1).max(100).label("Stock"),
    rate: Joi.number().required().min(1).max(10).label("Rate"),
  };

  doSubmit = () => {
    const { history } = this.props;

    const movie = { ...this.state.data };
    this.props.handleAdd(movie);

    return history.push("/movies");
  };

  render() {
    console.log(this.state.data, this.props);
    const id = () => {
      const { match } = this.props;

      if (match.params.id !== "new") {
        return match.params.id;
      } else {
        return null;
      }
    };
    return (
      <React.Fragment>
        <h1>Movie Form {id()}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderOption("genre", "Genre", [
            "",
            "Action",
            "Thriller",
            "Comedy",
          ])}
          {this.renderInput("stock", "Number in Stock")}
          {this.renderInput("rate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
