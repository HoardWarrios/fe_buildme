import React from "react";
import "./ViewPlan.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function Plan() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["plan"],
    queryFn: () =>
      newRequest.get(`/plans/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

   return (
      // User plan view
      <div className="plan">
        {isLoading ? (
          "loading"
        ) : error ? (
          "Something went wrong!"
        ) : (
          <div className="container">
            <div className="left">
              <span className="breadcrumbs">
                BuildME {">"} UserPlan {">"}
              </span>
  
              <h1>{data.title}</h1>
              
              {/* User Profile Info */}
              {isLoadingUser ? (
                "loading"
              ) : errorUser ? (
                "Something went wrong!"
              ) : (
                <div className="user">
                  <img
                    className="pp"
                    src={dataUser.img || "/img/noavatar.jpg"}
                    alt=""
                  />
                  <span>{dataUser.username}</span>
                </div>
              )}
  
                {/* User Plan */}
                <div className="userplan">
                  <img
                    src={data.cover}
                    alt=""
                  />
                </div>
  
              {/* Additional images */}
              <Slider slidesToShow={1} arrowsScroll={1} className="slider">
                {data.images.map((img) => (
                  <img key={img} src={img} alt="" />
                ))}
              </Slider>
              
              {/* Plan Description */}
              <h2>Request description </h2>
              <p>{data.desc}</p>
              {isLoadingUser ? (
                "loading"
              ) : errorUser ? (
                "Something went wrong!"
              ) : (
  
                // About the user
                <div className="seller">
                  <h2>About The User</h2>
                  <div className="user">
                    <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                    <div className="info">
                      <span>{dataUser.username}</span>
                      <button>Contact Me</button>
                    </div>
                  </div>
                  <div className="box">
                    <div className="items">
                      <div className="item">
                        <span className="title">From</span>
                        <span className="desc">{dataUser.city}</span>
                      </div>
                      <div className="item">
                        <span className="title">Contact</span>
                        <span className="desc">{dataUser.phone}</span>
                      </div>
                      <div className="item">
                        <span className="title">Description</span>
                        <span className="desc">{dataUser.desc}</span>
                      </div>
                      <div className="item">
                        <span className="title">Member since</span>
                        <span className="desc">{dataUser.createdAt}</span>
                      </div>
                    </div>
                    <hr />
                    <p>{dataUser.desc}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
}

export default Plan;
