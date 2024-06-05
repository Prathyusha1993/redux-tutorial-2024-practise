import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onUserChanged = (e) => setUserId(e.target.value);

  const handleSave = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId));
      setContent("");
      setTitle("");
      setUserId("");
    }
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
          style={{
            marginLeft: "8px",
            borderRadius: "5px",
            border: "1px solid black",
            padding: "9px",
          }}
        />
        <label style={{ marginLeft: "8px" }} htmlFor="postAuthor">
          Author:
        </label>
        <select
          id="postAuthor"
          value={userId}
          onChange={onUserChanged}
          style={{
            marginLeft: "8px",
            borderRadius: "5px",
            border: "1px solid black",
            padding: "9px",
          }}
        >
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent" style={{ marginLeft: "8px" }}>
          Content:
        </label>
        <textarea
          name="postContent"
          id="postContent"
          value={content}
          onChange={onContentChanged}
          style={{
            marginLeft: "8px",
            // marginTop: "80px",
            borderRadius: "5px",
            border: "1px solid black",
            padding: "9px",
          }}
        />
        <button
          onClick={handleSave}
          type="button"
          disabled={!canSave}
          style={{
            marginLeft: "10px",
            borderRadius: "5px",
            border: "1px solid black",
            padding: "9px",
          }}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
