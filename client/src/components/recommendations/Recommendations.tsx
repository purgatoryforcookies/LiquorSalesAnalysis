import { TLiquor, TLiquorSearchResults } from "../../service/types";
import "./Recommendations.scss";

export const Recommendations = ({ data }: { data: TLiquorSearchResults }) => {
  const dataToShow = data?.slice(1);
  const originalCatgeroy = data?.[0]?.fields?.category[0];

  return (
    <div className="recommendations__container">
      <h1>Recommended</h1>
      {dataToShow ? (
        dataToShow.map((item: TLiquor, index: number) => (
          <div key={item._id} className="row">
            <p
              className={
                originalCatgeroy === item.fields.category[0]
                  ? "categoryHiglight"
                  : ""
              }
            >
              #{index + 1}
            </p>
            <p>{item.fields.name[0]}</p>
            <div
              style={{ width: item._score * 100 - index * 4 }}
              className="score"
            >
              <p>{((item._score / 2) * 100 - index * 2).toFixed(1)}%</p>
            </div>
          </div>
        ))
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};
