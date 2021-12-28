export const checkImage = (file) => {
  const types = ["image/png", "image/jpeg"];
  let err = "";
  if (!file) return (err = "File does not exist.");

  if (file.size > 1024 * 1024)
    // 1mb
    err = "The largest image size is 1mb";

  if (!types.includes(file.type)) err = "The image type is png / jpeg";

  return err;
};


export const imageUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ey04dkjy");
  formData.append("cloud_name", "deehogrgu");

  const res = await fetch("https://api.cloudinary.com/v1_1/deehogrgu/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  console.log(data);
  return { public_id: data.public_id, url: data.secure_url };
};

export const imagesUpload = async (images) => {
  let imgArr = []
    for(const item of images){
        const formData = new FormData()
        formData.append("file", item);
        formData.append("upload_preset", `${process.env.REACT_APP_PRESET}`);
        formData.append("cloud_name", `${process.env.REACT_APP_CLOUD}`);

        const res = await fetch(`${process.env.REACT_APP_API}`, {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        imgArr.push({public_id: data.public_id, url: data.secure_url})
    }
    return imgArr;
};
