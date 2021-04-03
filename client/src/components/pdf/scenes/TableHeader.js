import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    height: "10mm",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    borderBottomStyle: "solid",
    alignItems: "center",
    fontSize: 10,
    backgroundColor: "#f0f0f0",
  },
  scene: {
    paddingHorizontal: 4,
    marginLeft: "10mm",
    width: "12mm",
    backgroundColor: "red",
    textAlign: "center",

    // borderColor: "#3f51b5",
    // borderRightWidth: 2,
  },
  day: {
    paddingHorizontal: 4,
    backgroundColor: "green",
    width: "12mm",
    textAlign: "center",

    // borderColor: "#3f51b5",
    // borderRightWidth: 2,
  },
  mood: {
    width: "20mm",
    paddingHorizontal: 4,
    backgroundColor: "grey",
    textAlign: "center",
  },
  place: {
    width: "40mm",
    paddingHorizontal: 4,
  },
  content: {
    width: "100mm",
    paddingHorizontal: 4,
  },
  notes: {
    width: "100mm",
    paddingHorizontal: 4,
    backgroundColor: "grey",
  },
});

export default function TableHeader() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.scene}>Scn</Text>
      </View>
      <View>
        <Text style={styles.day}>Day</Text>
      </View>
      <View>
        <Text style={styles.mood}>Mood</Text>
      </View>
      <View>
        <Text style={styles.place}>Motif</Text>
      </View>
      <View>
        <Text style={styles.content}>Content</Text>
      </View>
      <View>
        <Text style={styles.notes}>Notes</Text>
      </View>
    </View>
  );
}
