import axios from "axios";
import { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import { useParams } from "react-router";

export default function AllImages() {
  const [imageIds, setImageIds] = useState();
  const { id } = useParams(); // role ID

  const loadImages = async () => {
    try {
      const res = await axios.get(`/img/${id}`);
      //   const { data } = await res.json();
      console.log(res.data);
      setImageIds(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div>
      {imageIds &&
        imageIds.map((imageId) => (
          <Image
            key={imageId}
            cloudName={"pixelaffairs"}
            publicId={imageId}
            width={200}
            crop="scale"
          />
        ))}
    </div>
  );
}
