"use client";

import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  FaceSmileIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import { Emoji, EmojiStyle } from "emoji-picker-react";
import dynamic from "next/dynamic";

const EmojiPicker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

import { useEffect, useState } from "react";
import { Popover } from "@headlessui/react";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

const Post = ({ id, username, userImg, img, caption }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [liked, setLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [db]
  );

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  function onClick(emojiData, event) {
    setSelectedEmoji(emojiData.unified);
  }

  const toggleLiked = () => {
    setLiked((current) => !current);
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          className="h-10 w-10 rounded-full"
          loading="lazy"
          src={userImg}
          alt={username}
        />
        <p className="flex-1 font-bold px-2">{username}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>
      {/* img */}
      <img src={img} loading="lazy" className="object-cover w-full" alt="" />

      {/* Buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            <div onClick={toggleLiked}>
              {liked === false ? (
                <HeartIcon className="btn" />
              ) : (
                <HeartIconFilled className="btn text-red-500" />
              )}
            </div>

            <ChatBubbleOvalLeftIcon className="btn" />
            <PaperAirplaneIcon className="btn -rotate-45" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* caption */}
      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>

      {/* comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                className="h-7 rounded-full"
                src={comment.data().userImg}
                alt=""
              />
              <p className="text-sm flex-1 ">
                <span className="font-bold px-2">
                  {comment.data().username}
                </span>
                {comment.data().comment}
              </p>
              <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
            </div>
          ))}
        </div>
      )}

      {/* input box */}
      {session && (
        <form className="flex items-center p-4">
          <div>
            <Popover className="relative">
              <Popover.Button>
                <FaceSmileIcon className="h-7 ring-0" />
              </Popover.Button>

              <Popover.Panel className="absolute z-10">
                <EmojiPicker
                  onEmojiClick={onClick}
                  previewConfig={{
                    defaultCaption: "Pick one!",
                    defaultEmoji: "1f92a", // 🤪
                  }}
                />
              </Popover.Panel>
            </Popover>
          </div>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={`Add a comment...`}
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="text-blue-400 ml-2 font-semibold disabled:text-gray-300"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
