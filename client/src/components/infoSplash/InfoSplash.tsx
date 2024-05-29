import "./InfoSplash.scss";

import ChoiceOf from "./subcomp/ChoiceOf";

function InfoSplash({ hidden }: any) {
  return (
    <div className="infosplash__container">
      <ChoiceOf
        title="Choice of Drink"
        best="Black Velvet Whisky"
        least="Lemonade Moonshine"
        hidden={hidden}
      />
      <ChoiceOf
        title="Choice of Day"
        best="Tuesday"
        least="Sunday"
        reverse={true}
        hidden={hidden}
      />
    </div>
  );
}

export default InfoSplash;
