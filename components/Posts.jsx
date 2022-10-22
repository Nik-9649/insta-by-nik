import { CheckCircleIcon, CheckIcon } from "@heroicons/react/24/outline";
import Post from "./Post";

const DUMMY_DATA = [
  {
    id: 1,
    username: "melatoninik",
    userImg: "https://cutt.ly/4BFkfRh",
    img: "https://cutt.ly/4BFkfRh",
    caption: "...",
  },
  {
    id: 2,
    username: "typical.egirl",
    userImg:
      "https://i.pinimg.com/736x/70/b5/0d/70b50dade1a8742a8ee0ef4f4bbc4f15.jpg",
    img: "https://i.pinimg.com/736x/70/b5/0d/70b50dade1a8742a8ee0ef4f4bbc4f15.jpg",
    caption: "new pfp UwU",
  },
];

const Posts = () => {
  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {DUMMY_DATA.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userImg={post.userImg}
          img={post.img}
          caption={post.caption}
          handleClick={handleClick}
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
