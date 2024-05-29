import "./AgeModal.scss";

function AgeModal({ handle }: { handle: (value: boolean) => void }) {
  return (
    <div className="ageModal__container">
      <h1>Please confirm</h1>
      <p>Are you of legal drinking age in your country of residence?</p>
      <div className="ageModal__btnContainer">
        <button onClick={() => handle(true)} className="ageModal__btn">
          Yes
        </button>
        <a href="https://purgatoryforcookies.com">
          <button className="ageModal__btn">No</button>
        </a>
      </div>
    </div>
  );
}

export default AgeModal;
