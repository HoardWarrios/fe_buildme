import React from "react";
import "./PlanCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const PlanCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <Link to={`/plan/${item._id}`} className="link">
      <div className="planCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              <img src={data.img || "./src/public/img/noavatar.jpg"} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <p>{item.desc}</p>
         
        </div>
        <hr />
        <div className="detail">
          <img src="./src/public/img/heart.png" alt="" />
          {/* <div className="price">
            <span>STARTING AT</span>
            <h2>$ {item.price}</h2>
          </div> */}
        </div>
      </div>
    </Link>
  );
};

export default PlanCard;