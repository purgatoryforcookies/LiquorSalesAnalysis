import { TEngineResults } from "../../service/types";
import "./OneResult.scss";

export const OneResult = ({ result, stats }: TEngineResults) => {
  const { pack, vol_ml, category, name } = result[0].fields;

  return (
    <div className="oneResult__container">
      <div className="header">
        <h1>{name[0]}</h1>
        <div className="stamps">
          <div className="stamp">
            <p>{vol_ml[0] / 1000}</p>
            <p>Vol (L)</p>
          </div>
          <div className="stamp">
            <p>{pack[0]}</p>
            <p>pack</p>
          </div>
        </div>
      </div>

      <div className="infoSection">
        <div className="row">
          <p>Average Price</p>
          <p>{stats.price_avg_usd.toFixed(2)} $</p>
        </div>
        <div className="row">
          <p>Busiest Store</p>
          <p>{stats.store_name}</p>
        </div>
        <div className="row">
          <p>Category</p>
          <p>{category[0]}</p>
        </div>
        <div className="row">
          <p>Sold</p>
          <p>{stats.sold_liters.toFixed(2)} Liters</p>
        </div>
      </div>
    </div>
  );
};
