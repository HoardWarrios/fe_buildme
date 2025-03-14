import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";

const Message = () => {

  const { id } = useParams();//get the conversation id from the url parameter

  //Get current user from localstorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // query manages the cache for server state
  const queryClient = useQueryClient();

  //geting messages for the current conversation
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });
//mutation for sending new messages
  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);//getting messages after a new one is sent // if success refresh message 
    },
  });

  const handleSubmit = (e) => {//get event from form
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,//Send e: input box text (input event) as desc
    });
    e.target[0].value = "";// Clear the input field after submission
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> 
        </span>
         {/* Display messages or loading/error states */}
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
