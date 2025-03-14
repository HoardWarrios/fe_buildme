import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  // Use states for
  const [singleFile, setSingleFile] = useState(undefined);//Single image
  const [files, setFiles] = useState([]);//Image array
  const [uploading, setUploading] = useState(false);//Upload

  //Get intial state using gigReducer
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  // HANDLE FEATURES
  const handleFeature = (e) => {
    e.preventDefault();//prevent page refresh
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";//After adding feature make input field empty
  };

  // HANDLE UPLOAD
  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);// Upload cover image to cloudinary

      const images = await Promise.all(
        [...files].map(async (file) => {//[...files]: to avoid file list & make an array
          const url = await upload(file);// get file url to array
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // Mutation function for 
  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);//request to gigs endpoint
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  // HANDLE SUBMIT 
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/mygigs")
  };

  console.log(state)

  return (
    // Add Gigs container
    <div className="add">
      <div className="container">

        {/* Page Title */}
        <h1>Add New Project</h1>
        <div className="sections">
          <div className="info">

            {/* Get title input */}
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />

             {/* Get category optoin */}
            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option>Select your category</option>
              <option value="painter">Painter</option>
              <option value="plumber">Plumber</option>
              <option value="roofer">Roofer</option>
              <option value="tiller">Tiller</option>
              <option value="mason">Mason</option>
              <option value="electritian">Electritian</option>
              <option value="aluminiumn">Aluminiumn</option>
              <option value="helper">Helper</option>
            </select>

              {/* Get images input */}
            <div className="images">
              <div className="imagesInputs">
                {/* Single image */}
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                {/* Image array */}
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              {/* Upload images button */}
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>

            {/* Get description input */}
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>

            {/* Create gig button */}
            <button onClick={handleSubmit}>Create</button>
          </div>

          
          <div className="details">
              {/* Get service title input */}
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. Painting service"
              onChange={handleChange}
            />

              {/* Get short description input */}
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
            ></textarea>

              {/* Get delivery time numeric input */}
            <label htmlFor="">Service Time (e.g. hours per day)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />

            {/* Get Revision Number numeric input */}
            <label htmlFor="">Service Number</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />

            {/* Get features */}
            <label htmlFor="">Add Features</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. Quality, Expert, Hardworking" />

              {/* Add feature button */}
              <button type="submit">add</button>
            </form>

            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>

                {/* Remove feature button */}
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
            <label htmlFor="">Price</label>
            <input type="number" onChange={handleChange} name="price" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;