import { IoMdDoneAll } from "react-icons/io";
import "./column.scss";

const Card = (props) => {
  const { data } = props;
  return (
    <div>

      <ul className="card-list" >

        <li>
          <div className="card-item_header">
            {data && data.length > 0 &&
              data.map((item, index) => {
                <div>{item.title}</div>

              })
            }


          </div>
        </li>
      </ul>

    </div>
  );
};

export default Card;