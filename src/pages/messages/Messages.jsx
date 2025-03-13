import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));//Use local storage to fetch currentuser 

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });


  const mutation = useMutation({
    //Update conversations on id using mutation function
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    // on success run conversations usequary function/ refresh conversations quary
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
           {/* Converstaion table */}
          <table>
            <tr>
              <th>{currentUser.isSeller ? "Homeowner ID" : "Builder ID"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data.map((c) => (// map data to c: conversation
              <tr
                className={
                  ((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) &&
                  "active" // Display active message bold for unread messages
                }
                key={c.id}//Using a custom id for conversation
              >
                {/* If current user is the seller get buyerId : Else get sellerId */}
                <td>{currentUser.isSeller ? c.buyerId : c.sellerId}</td>
                <td>
                  <Link to={`/message/${c.id}`} className="link">
                  {/* Any last message if existed */}
                    {c?.lastMessage?.substring(0, 100)}...
                  </Link>
                </td>
                {/* using moment library, get updatedTime from Now */}
                <td>{moment(c.updatedAt).fromNow()}</td>
                <td>
                  {((currentUser.isSeller && !c.readBySeller) ||//If current user is seller & readby seller will be false 
                    (!currentUser.isSeller && !c.readByBuyer)) && (//if current user is buyer & readby buyer will be false
                    // Display Mark as read button to readby party: true 
                    <button onClick={() => handleRead(c.id)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
