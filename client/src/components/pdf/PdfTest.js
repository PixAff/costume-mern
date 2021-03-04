import { Button } from "@material-ui/core";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Output from "./scenes";
// import Output from "./resume";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default function TheButton() {
  // const [fetching, setFetching] = useState(true);
  // const [data, setData] = useState();
  // const [error, setError] = useState(true);
  const data = useSelector((state) => state.scripts);

  // const fetchData = () => {
  //   setFetching(true);

  //   axios
  //     .get("/scripts")
  //     .then((res) => {
  //       setError(false);
  //       setData(res.data);
  //       console.log("DATA", res.data);
  //       setFetching(false);
  //     })
  //     .catch((e) => {
  //       setError(true);
  //       setFetching(false);
  //       console.error(e);
  //     });
  // };
  console.log(data);

  return data ? (
    <Pdf data={data} />
  ) : (
    <Button disabled variant="contained" color="inherit">
      Fetching Data
    </Button>
  );
}

function Pdf({ data }) {
  console.log("creating PDF");
  return (
    <Button variant="contained" color="inherit">
      <PDFDownloadLink
        document={<Output data={data} />}
        fileName="somename.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download"
        }
      </PDFDownloadLink>
    </Button>
  );
}
