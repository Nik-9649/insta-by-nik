import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

const handleClick = (e) => {
  e.preventDefault();
};

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div>
        <div className="flex justify-between text-sm mb-5">
          <h2 className="text-sm font-bold text-gray-500">
            Suggestions for you
          </h2>
          <button className="text-gray-600 font-semibold" onClick={handleClick}>
            See All
          </button>
        </div>
        {suggestions.map((profile) => (
          <div key={profile.userId} className="flex items-center mt-3">
            <div className="flex flex-1">
              <img
                className="h-10 w-10 rounded-full border p-[2px]"
                loading="lazy"
                src={profile.avatar}
                alt={profile.username.toLowerCase()}
              />
              <div className="ml-2">
                <h2 className="font-semibold text-sm">
                  {profile.username.toLowerCase()}
                </h2>
                <h3 className="text-xs text-gray-400">{profile.name}</h3>
              </div>
            </div>
            <button className="text-blue-400 text-xs font-bold">Follow</button>
          </div>
        ))}
      </div>
      <div className="mt-8 text-xs text-gray-300 ">
        <h2 className="space-x-1">
          <span className="hover:underline cursor-pointer">About</span>
          <span className="hover:underline cursor-pointer">Help</span>
          <span className="hover:underline cursor-pointer">Press</span>
          <span className="hover:underline cursor-pointer">API</span>
          <span className="hover:underline cursor-pointer">Jobs</span>
          <span className="hover:underline cursor-pointer">Privacy</span>
          <span className="hover:underline cursor-pointer">Terms</span>
          <span className="hover:underline cursor-pointer">Locations</span>
        </h2>
        <h3>
          <span className="hover:underline cursor-pointer">
            Language English
          </span>
        </h3>
        <h3 className="mt-8">© 2022 INSTAGRAM FROM nik :p</h3>
      </div>
    </div>
  );
};

export default Suggestions;
