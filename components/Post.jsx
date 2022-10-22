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

import { useState } from "react";
import { Popover } from "@headlessui/react";

const Post = ({ id, username, userImg, img, caption, handleClick }) => {
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [liked, setLiked] = useState(false);

  function onClick(emojiData, event) {
    setSelectedEmoji(emojiData.unified);
  }

  const toggleLiked = () => {
    setLiked((current) => !current);
  };
  // console.log(liked);

  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5">
        <img className="h-10 w-10 rounded-full" src={userImg} alt={username} />
        <p className="flex-1 font-bold">{username}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>
      {/* img */}
      <img src={img} className="object-cover w-full" alt="" />

      {/* Buttons */}
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

      {/* caption */}
      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>

      {/* comments */}

      {/* input box */}
      <form className="flex items-center p-4">
        <div>
          <Popover className="relative">
            <Popover.Button>
              <FaceSmileIcon className="h-7" />
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
          placeholder={`Add a comment...`}
          className="border-none flex-1 focus:ring-0 outline-none"
        />
        {selectedEmoji ? (
          <Emoji
            unified={selectedEmoji}
            emojiStyle={EmojiStyle.APPLE}
            size={22}
          />
        ) : null}
        <button
          onClick={handleClick}
          className="text-blue-400 ml-2 font-semibold"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Post;
