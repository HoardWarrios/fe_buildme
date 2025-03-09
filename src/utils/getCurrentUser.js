//Common method to get current user from local storage
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
  };
  
  export default getCurrentUser