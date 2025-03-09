//Initial state of a gig (Use gig reducers to update this content)
export const INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
  title: "",
  cat: "",
  cover: "",
  images: [],
  desc: "",
  shortTitle: "",
  shortDesc: "",
  deliveryTime: 0,
  revisionNumber: 0,
  features: [],
  price: 0,
};

//GIG REDUCERS
export const gigReducer = (state, action) => {
  switch (action.type) {
    //Reducer to update changed text in input box
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    
    //Reducer to update images
    case "ADD_IMAGES":
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };

    //Reducer to add features 
    case "ADD_FEATURE":
      return {
        ...state,
        features: [...state.features, action.payload],
      };

     //Reducer to remove features 
    case "REMOVE_FEATURE":
      return {
        ...state,
        features: state.features.filter(
          (feature) => feature !== action.payload
        ),
      };

    default:
      return state;
  }
};
