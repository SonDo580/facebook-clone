import { FaUser } from "react-icons/fa";
import "./style.scss";

function LeftBar() {
  return (
    <aside className="leftBar">
      <ul className="items">
        <li>
          <FaUser />
          <span>Thor Odin's son</span>
        </li>
        <li className="todo">
          <img src="/leftBar/friends.png" alt="friends" />
          <span>Friends</span>
        </li>
        <li className="todo">
          <img src="/leftBar/saved.png" alt="saved" />
          <span>Saved</span>
        </li>
        <li className="todo">
          <img src="/leftBar/groups.png" alt="groups" />
          <span>Groups</span>
        </li>
        <li className="todo">
          <img src="/leftBar/memories.png" alt="memories" />
          <span>Memories</span>
        </li>
        <li className="todo">
          <img src="/leftBar/video.png" alt="video" />
          <span>Video</span>
        </li>
        <li className="todo">
          <img src="/leftBar/ads.png" alt="ads manager" />
          <span>Ads Manager</span>
        </li>
        <li className="todo">
          <img src="/leftBar/climate.png" alt="climate center" />
          <span>Climate Science Center</span>
        </li>
        <li className="todo">
          <img src="/leftBar/events.png" alt="events" />
          <span>Events</span>
        </li>
        <li className="todo">
          <img src="/leftBar/feeds.png" alt="feeds" />
          <span>Feeds</span>
        </li>
        <li className="todo">
          <img src="/leftBar/fundraisers.png" alt="fundraisers" />
          <span>Fundraiser</span>
        </li>
        <li className="todo">
          <img src="/leftBar/gaming.png" alt="gaming" />
          <span>Gaming Video</span>
        </li>
        <li className="todo">
          <img src="/leftBar/marketplace.png" alt="marketplace" />
          <span>Marketplace</span>
        </li>
        <li className="todo">
          <img src="/leftBar/messenger.png" alt="messenger" />
          <span>Messenger</span>
        </li>
        <li className="todo">
          <img src="/leftBar/messengerKids.png" alt="messenger kids" />
          <span>Messenger Kids</span>
        </li>
        <li className="todo">
          <img src="/leftBar/payments.png" alt="orders and payments" />
          <span>Orders and payments</span>
        </li>
        <li className="todo">
          <img src="/leftBar/pages.png" alt="pages" />
          <span>Pages</span>
        </li>
        <li className="todo">
          <img src="/leftBar/play.png" alt="play" />
          <span>Play Games</span>
        </li>
        <li className="todo">
          <img src="/leftBar/recentAd.png" alt="recent ad" />
          <span>Recent ad activity</span>
        </li>
      </ul>
    </aside>
  );
}

export default LeftBar;
