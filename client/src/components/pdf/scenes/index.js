import {
  Text,
  Document,
  Font,
  Page,
  StyleSheet,
  Image,
  View,
} from "@react-pdf/renderer";

// import Header from "./Header";
// import Education from "./Education";
// import Experience from "./Experience";
// import Skills from "./Skills";
import PageHeader from "./PageHeader";
import TableHeader from "./TableHeader";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
    marginBottom: 10,
  },
  leftColumn: {
    flexDirection: "column",
    width: 170,
    paddingTop: 30,
    paddingRight: 15,
    "@media max-width: 400": {
      width: "100%",
      paddingRight: 0,
    },
    "@media orientation: landscape": {
      width: 200,
    },
  },
  footer: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 25,
    paddingTop: 10,
    borderWidth: 3,
    borderColor: "gray",
    borderStyle: "dashed",
    "@media orientation: landscape": {
      marginTop: 10,
    },
  },
});

const title = "Lena Wolf";

const Scenes = (props) => (
  <Page {...props}>
    <PageHeader title={title} />
    <TableHeader />
    {/* <View style={styles.container}>
      <View>
        {props.data.map((d) => (
          <Text key={d._id}>{d.name}</Text>
        ))}
      </View>
      <View style={styles.leftColumn}>
        <Image
          src="https://source.unsplash.com/nDqA4d5NL0k/"
          style={styles.image}
        />
        <Education />
        <Skills />
      </View>
      <Experience />
    </View>
    <Text style={styles.footer}>This IS the candidate you are looking for</Text> */}
  </Page>
);

const Output = ({ data }) => {
  return (
    <Document
      author="Luke Skywalker"
      keywords="awesome, resume, start wars"
      subject="The resume of Luke Skywalker"
      title="Resume"
    >
      <Scenes orientation="landscape" size="A4" data={data} />
    </Document>
  );
};

export default Output;
