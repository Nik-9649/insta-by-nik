"use client";

import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  ChevronDownIcon,
  EllipsisHorizontalIcon,
  FaceSmileIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";

const EmojiPicker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

import { useEffect, useState } from "react";
import { Disclosure, Popover } from "@headlessui/react";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

const Post = ({ id, username, userImg, img, caption, timestamp }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);

  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "asc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );
  console.log(likes);

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
        userImg: session.user.image,
      });
    }
  };

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
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatBubbleOvalLeftIcon className="btn" />
            <PaperAirplaneIcon className="btn -rotate-45" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* caption */}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1 ">
            {likes.length}
            <Disclosure>
              <Disclosure.Button className="px-2"> likes</Disclosure.Button>
              <Disclosure.Panel className="text-gray-500">
                <div className="flex items-center space-x-1">
                  <span className="text-black font-bold my-2">liked by</span>
                </div>
                <div className="">
                  {likes.map((like) => (
                    <div
                      key={like.data().username}
                      className="flex items-center space-x-2 mb-3"
                    >
                      <img
                        className="h-7 rounded-full"
                        src={like.data().userImg}
                        alt=""
                      />
                      <p className="text-sm flex-1 ">
                        <span className="font-bold px-2">
                          {like.data().username}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </Disclosure>
          </p>
        )}
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>

      {/* comments */}
      {comments.length > 0 && (
        <div className="ml-10 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          <Disclosure>
            {!open ? (
              <Disclosure.Button onClick={() => setOpen(true)} className="">
                View all {comments.length} comments
              </Disclosure.Button>
            ) : (
              <Disclosure.Button onClick={() => setOpen(false)} className="">
                Hide comments
              </Disclosure.Button>
            )}
            <Disclosure.Panel>
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex items-center space-x-2 mb-3"
                >
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
                  <Moment className="pr-5 text-xs" fromNow>
                    {comment.data().timestamp?.toDate()}
                  </Moment>
                </div>
              ))}
            </Disclosure.Panel>
          </Disclosure>
        </div>
      )}
      {/* Time stamp */}
      <Moment className="ml-10 h-20 text-sm text-gray-500" fromNow>
        {timestamp}
      </Moment>

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
