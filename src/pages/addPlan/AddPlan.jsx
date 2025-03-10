import React, { useReducer, useState } from "react";
import "./AddPlan.scss";
import { planReducer, INITIAL_STATE } from "../../reducers/planReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient ,useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate, useParams, Link } from "react-router-dom";

const AddPlan = () => {

    // Fetch gigID from URL
    const { gigId } = useParams();

  // Use states for
  const [singleFile, setSingleFile] = useState(undefined);//Single image
  const [files, setFiles] = useState([]);//Image array
  const [uploading, setUploading] = useState(false);//Upload

  //Get intial state using gigReducer
  const [state, dispatch] = useReducer(planReducer, INITIAL_STATE);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  // HANDLE FEATURES
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  // HANDLE UPLOAD
  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );

      // Fetch gig details using gigId
      const res = await newRequest.get(`/gigs/single/${gigId}`);
      const gigData = res.data;


      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });

      dispatch({
        type: "CHANGE_INPUT",
        payload: { name: "gigId", value: gigData._id }
      });
  
      dispatch({
        type: "CHANGE_INPUT",
        payload: { name: "sellerId", value: gigData.userId }
      });

      setUploading(false);

    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // Mutation functio 
    const mutation = useMutation({
      mutationFn: (plan) => {
        return newRequest.post(`/plans/${gigId}`, plan);//request to plans endpoint
      },
    
    onSuccess: () => {
      queryClient.invalidateQueries(["pay"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate(state);

    navigate(`/pay/${gigId}`)
  };

  console.log(state)

  return (
    <div className="add">
      <div className="container">
        <h1>Service Request Form</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Request Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Need to paint my house"
              onChange={handleChange}
            />

            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Upload House/Building Plan</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Any Related Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              placeholder="Brief description about your request"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
           
            <label htmlFor="">Home Address</label>
            <textarea
              name="address"
              onChange={handleChange}
              id=""
              placeholder="Address where the service is needed"
              cols="30"
              rows="10"
            ></textarea>
            
            <label htmlFor="">Time-bound (e.g. 7 days)</label>
            <input type="number" name="requestTime" onChange={handleChange} />

            <label htmlFor="">Service Features</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. Urgent, Good Quility" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <button onClick={handleSubmit}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlan;