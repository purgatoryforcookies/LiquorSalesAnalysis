import { TLiquorFields } from "../../service/types"
import "./OneResult.scss"
export const OneResult = ({ name, pack, vol_ml, category }: TLiquorFields) => {


    return (
        <div className="oneResult__container">

            <div className="header">
                <h1>{name[0]}</h1>
                <div className="stamp">
                    <p>{vol_ml[0] / 1000}</p>
                    <p>Vol (L)</p>
                </div>
                <div className="stamp">
                    <p>{pack[0]}</p>
                    <p>pack</p>
                </div>
            </div>

            <div className="infoSection">
                <div className="row">
                    <p>Average Price</p>
                    <p>13,98 $</p>
                </div>
                <div className="row">
                    <p>Busiest Store</p>
                    <p>Hartmans Market</p>
                </div>
                <div className="row">
                    <p>Category</p>
                    <p>{category[0]}</p>
                </div>
                <div className="row">
                    <p>Sold</p>
                    <p>200L</p>
                </div>
            </div>


        </div>
    )
}
