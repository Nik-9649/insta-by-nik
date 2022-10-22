import type { NextPage } from "next";
import Header from "../components/Header";
import Feed from "../components/Feed";

const Home: NextPage = () => {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      {/* Header */}
      <Header />

      {/* Feed */}
      <Feed />

      {/* Modal */}
    </div>
  );
};

export default Home;
