function Contacts() {
  return (
    <div className="contacts">
      <h3>Contacts</h3>
      <ul>
        {Array.from({ length: 20 }).map((_, index) => (
          <li key={index} className="todo">
            <div className="profile">
              <img src="/samples/profiles/doraemon.png" alt="profile picture" />
              <span className="badge"></span>
            </div>
            <span className="name">Mon clone {index}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contacts;
