import axios from "axios";

const upload = async (file) => {
  const data = new FormData();//send files & form data in request
  data.append("file", file);//Add file to formdata object
  data.append("upload_preset", "buildme");//Upload file to 'buildme' folder

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dov6pvinq/image/upload", data);

    const { url } = res.data;
    return url;//Get URL of the image stored in Cloudinary
  } catch (err) {
    console.log(err);
  }
};

export default upload;