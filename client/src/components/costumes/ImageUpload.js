import { Button } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";

export default function ImageUpload() {
  const [fileInputState, setFileInputState] = useState("");
  // const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  function handleFileInput(e) {
    const file = e.target.files[0];
    previewFile(file);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    console.log("sub");
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    try {
      await axios.post(
        "/img/upload",
        JSON.stringify({ data: base64EncodedImage }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmitFile}>
        <input
          type="file"
          name="image"
          accept="image/x-png,image/gif,image/jpeg"
          onChange={handleFileInput}
          value={fileInputState}
        />
        <Button color="primary" type="submit">
          Submit
        </Button>
      </form>
      {previewSource && (
        <img
          src={previewSource}
          alt="chosen image"
          style={{ height: "200px" }}
        />
      )}
    </div>
  );
}
