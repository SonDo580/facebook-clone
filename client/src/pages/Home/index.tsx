import "./style.scss";
import TopBar from "@/components/TopBar";
import LeftBar from "@/components/LeftBar";
import RightBar from "@/components/RightBar";
import Feed from "@/components/Feed";

function Home() {
  return (
    <div className="home">
      <TopBar />
      <main>
        <LeftBar />
        <Feed />
        <RightBar />
      </main>
    </div>
  );
}

export default Home;
