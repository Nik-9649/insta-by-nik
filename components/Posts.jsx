import { CheckCircleIcon, CheckIcon } from "@heroicons/react/24/outline";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),

    [db]
  );

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
          timestamp={post.data().timestamp?.toDate()}
        />
      ))}
      <div className="items-center text-center py-5 bg-white">
        <p className="font-semibold">You're all caught up</p>
        <p className="text-sm">You've seen all the new posts</p>
        <button onClick={handleClick} className="text-blue-500 font-semibold">
          View older posts
        </button>
      </div>
    </div>
  );
};

export default Posts;
