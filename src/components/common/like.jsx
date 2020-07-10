import React from "react";

//stateless functional component

const Like = (props) => {
  const movie = props.movie;

  let classes = "fa fa-heart";
  if (!movie.liked) classes += "-o";

  return (
    <span title={movie.title} onClick={() => props.onClick(movie)}>
      <i className={classes}></i>
    </span>
  );
};

export default Like;
