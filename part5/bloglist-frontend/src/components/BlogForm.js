import React from "react";
import PropTypes from "prop-types";

const BlogForm = ({
  title, author, url,
  handleSubmit,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
        title:
          <input
            value={title.value}
            type={title.type}
            onChange={title.onChange}/>
        </div>
        <div>
        author:
          <input
            value={author.value}
            type={author.type}
            onChange={author.onChange}/>
        </div>
        <div>
        url:
          <input
            value={url.value}
            type={url.type}
            onChange={url.onChange}/>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired
};

export default BlogForm;