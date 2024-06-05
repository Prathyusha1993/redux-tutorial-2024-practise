import "./App.css";
import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";
// import Counter from "./features/counter/Counter";

function App() {
  return (
    <div className="App">
      {/* <h4>Counter App</h4>
      <Counter /> */}
      <AddPostForm />
      <PostsList />
    </div>
  );
}

export default App;
