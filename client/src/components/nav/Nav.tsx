import "./Nav.scss";

function Nav() {
  function scroll() {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  return (
    <div className="nav__container">
      <div className="links">
        <ul>
          <li onClick={scroll}>Engine</li>
          <a href="https://data.iowa.gov/Sales-Distribution/Iowa-Liquor-Sales/m3tr-qhgy">
            <li>Dataset</li>
          </a>
        </ul>
      </div>
      <div className="slogans">
        <p>Iowa</p>
        <p>Situation</p>
      </div>
    </div>
  );
}

export default Nav;
