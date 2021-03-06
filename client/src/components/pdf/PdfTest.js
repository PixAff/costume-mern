import { Chip } from "@material-ui/core";
import { BlobProvider } from "@react-pdf/renderer";
import axios from "axios";
import { useState } from "react";
// import { useSelector } from "react-redux";
import Output from "./scenes";
// import FaceIcon from "@material-ui/icons/Face";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
// import Output from "./resume";

// Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#E4E4E4",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });

export default function TheButton() {
  const [fetching, setFetching] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState(true);
  // const data = useSelector((state) => state.scripts);

  const fetchData = () => {
    setFetching(true);

    axios
      .get("/scenes/6037fb4eff96431791bf3815")
      .then((res) => {
        setError(false);
        setData(res.data);
        console.log("DATA", res.data);
        setFetching(false);
      })
      .catch((e) => {
        setError(true);
        setFetching(false);
        console.error(e);
      });
  };
  console.log(data);

  return data && !error && !fetching ? (
    <Pdf data={data} />
  ) : (
    <div>
      <Chip
        variant="outlined"
        color="primary"
        icon={<PictureAsPdfIcon />}
        label="create Table"
        onClick={fetchData}
      />
      {/* <Button variant="contained" color="inherit" onClick={fetchData}>
        create Table
      </Button> */}
      {/* <Button disabled variant="contained" color="inherit">
        Fetching Data
      </Button> */}
    </div>
  );
}

// function Pdf({ data }) {
//   console.log("creating PDF");
//   return (
//     <Button variant="contained" color="inherit">
//       <PDFDownloadLink
//         document={<Output data={data} />}
//         fileName="somename.pdf"
//       >
//         {({ blob, url, loading, error }) =>
//           loading ? "Loading document..." : "Download"
//         }
//       </PDFDownloadLink>
//     </Button>
//   );
// }

function Pdf({ data }) {
  console.log("creating PDF");
  return (
    <div>
      <BlobProvider document={<Output data={data} />}>
        {({ blob, url, loading, error }) => {
          // Do whatever you need with blob here
          return (
            <Chip
              variant="outlined"
              color="secondary"
              icon={<PictureAsPdfIcon />}
              label="download Table"
              component="a"
              href={url}
              target="_blank"
              clickable
            />
          );
        }}
      </BlobProvider>
    </div>
  );
}
