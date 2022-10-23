const Story = ({ img, username, stylingProps }) => {
  return (
    <div>
      <img
        className={`h-14 w-14 p-[1.5px] rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out ${stylingProps}`}
        loading="lazy"
        src={img}
        alt="story"
      />
      <p className="text-xs w-14 truncate text-center">
        {username.toLowerCase()}
      </p>
    </div>
  );
};

export default Story;
