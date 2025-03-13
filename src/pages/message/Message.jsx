import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";

const Message = () => {
  //Use user params to get conversation id
  const { id } = useParams();

  //Get current user from localstorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);//pass the message to endpoint
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);// if success refresh message
    },
  });

  const handleSubmit = (e) => {//get event from form
    e.preventDefault();
    mutation.mutate({
      conversationId: id,// Get conversationId from use params
      desc: e.target[0].value,//Send e: input box text (input event) as desc
    });
    e.target[0].value = "";
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> 
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages">
            {data.map((m) => (//unique key for massage
            
              //Display message seperate from owner & other persons messages
              <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                {/* <img src={currentUser.img || "/img/noavatar.jpg"} alt="" /> */}
                <img src={"/img/noavatar.jpg"} alt="" />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
