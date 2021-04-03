import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { SET_ERROR } from "../../constants/actionTypes";
// import { createRole } from "../../actions/roles";
import { useParams } from "react-router";
import {
  CircularProgress,
  // FormControl,
  // FormControlLabel,
  // FormLabel,
  // Radio,
  // RadioGroup,
} from "@material-ui/core";
import axios from "axios";

export default function CostumeDialog({ role }) {
  const scriptId = useParams().id;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [costumeData, setCostumeData] = useState({
    name: "",
    role: role._id,
    script: scriptId,
  });
  const [fileInputState, setFileInputState] = useState("");
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
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    setLoading(true);
    try {
      await axios.post(
        "/img/upload",
        JSON.stringify({ data: base64EncodedImage, costumeData }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      handleClose();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCostumeData({
      name: "",
      role: role._id,
      script: scriptId,
    });
    setPreviewSource("");
    setFileInputState("");
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>ADD COSTUME</Button>
      <Dialog
        open={open}
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmitFile}>
          <DialogTitle id="form-dialog-title">Add a new costume</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Upload Images for this costume
            </DialogContentText>
            <TextField
              autoFocus
              fullWidth
              margin="normal"
              variant="outlined"
              id="name"
              placeholder="name"
              value={costumeData.name}
              onChange={(e) =>
                setCostumeData({ ...costumeData, name: e.target.value })
              }
              label="name"
              type="text"
            />
            <input
              style={{ display: "none" }}
              type="file"
              // multiple
              name="image"
              id="image-upload"
              accept="image/*"
              onChange={handleFileInput}
              value={fileInputState}
            />
            <label htmlFor="image-upload">
              <Button variant="contained" color="primary" component="span">
                Select Image to upload or a very nice and long text
              </Button>
            </label>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
        <div style={{ height: 40, textAlign: "center", padding: "1rem" }}>
          {loading && <CircularProgress />}
        </div>

        <div style={{ height: 200, textAlign: "center", padding: "1rem" }}>
          {previewSource && (
            <img
              src={previewSource}
              alt="chosen"
              style={{ maxHeight: "200px" }}
            />
          )}
        </div>
      </Dialog>
    </>
  );
}
