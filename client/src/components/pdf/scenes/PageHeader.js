import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    height: "23mm",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#3f51b5",
    borderBottomStyle: "solid",
    alignItems: "center",
    textAlign: "center",
  },
  leftColumnn: {
    width: "90mm",
    // borderColor: "#3f51b5",
    // borderRightWidth: 2,
  },
  midColumnn: {
    flex: 1,
    // borderColor: "#3f51b5",
    // borderRightWidth: 2,
  },
  rightColumnn: {
    width: "90mm",
  },
  name: {
    fontSize: 24,
    color: "grey",
  },
  number: {
    fontSize: 12,
    color: "grey",
  },
  // subtitle: {
  //   fontSize: 10,
  //   justifySelf: "flex-end",
  // },
  // link: {
  //   fontSize: 10,
  //   color: "black",
  //   textDecoration: "none",
  // },
});

export default function PageHeader({ title }) {
  return (
    <View style={styles.container}>
      <View style={styles.leftColumnn}>
        <Text style={styles.name}>{title}</Text>
      </View>
      <View style={styles.midColumnn}>
        <Text style={styles.name}>I</Text>
      </View>
      <View style={styles.rightColumnn}>
        <Text style={styles.number}>Page 1/2</Text>
      </View>
    </View>
  );
}
