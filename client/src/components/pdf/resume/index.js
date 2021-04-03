import {
  Text,
  Document,
  Page,
  StyleSheet,
  Image,
  View,
} from "@react-pdf/renderer";

import Header from "./Header";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    "@media max-width: 400": {
      flexDirection: "column",
    },
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

// Font.register({
//   family: "Open Sans",
//   src: `${__dirname}/fonts/fonts/Open_Sans/OpenSans-Regular.ttf`,
// });
// Font.register({
//   family: "Lato",
//   src: `${__dirname}/fonts/fonts/Lato/Lato-Regular.ttf`,
// });
// Font.register({
//   family: "Lato Italic",
//   src: `${__dirname}/fonts/fonts/Lato/Lato-Italic.ttf`,
// });
// Font.register({
//   family: "Lato Bold",
//   src: `${__dirname}/fonts/fonts/Lato/Lato-Bold.ttf`,
// });

const Resume = (props) => (
  <Page {...props}>
    <Header title={title} />
    <View style={styles.container}>
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
    <Text style={styles.footer}>This IS the candidate you are looking for</Text>
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
      {/* <Resume size="A4" /> */}
      <Resume orientation="landscape" size="A4" data={data} />
      {/* <Resume size={[380, 1250]} /> */}
    </Document>
  );
};

export default Output;
