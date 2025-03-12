import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

//Fetch and display user details inside GigCard
const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    // Web page navvigates to the relevant gig based on it's ID
    <Link to={`/gig/${item._id}`} className="link">

      {/* Display Gig cover */}
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              {/* diplay user profile pic */}
              <img src={data.img || "./src/public/img/noavatar.jpg"} alt="" />
              <span>{data.username}</span>
            </div>
          )}

          {/* diplay desc*/}
          <p>{item.title}</p>

          {/* diplay star*/}
          <div className="star">
            <img src="./src/public/img/star.png" alt="" />
            {/* diplay rating no*/}
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./src/public/img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>LKR {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;