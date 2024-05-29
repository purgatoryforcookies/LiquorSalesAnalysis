import "./ChoiceOf.scss";
import ChoiceOfLines from "../../../assets/svgComponents/choiceOfLine/ChoiceOfLines";

function ChoiceOf({ title, best, least, reverse, hidden }: any) {
  return (
    <div className="choiceOf__cointainer">
      <h1>{title}</h1>

      <div className="values">
        <h2 id="best">{best}</h2>
        <p id="first">#first</p>
        <ChoiceOfLines reverse={reverse} hidden={hidden} />
        <h2 id="least">{least}</h2>
        <p id="last">#last</p>
      </div>
    </div>
  );
}

export default ChoiceOf;
