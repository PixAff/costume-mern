import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    borderBottomStyle: "solid",
    alignItems: "center",
    fontSize: 10,
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
    width: "12mm",
    textAlign: "center",

    // borderColor: "#3f51b5",
    // borderRightWidth: 2,
  },
  mood: {
    width: "20mm",
    paddingHorizontal: 4,
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
  },
});

export default function ScenesTable({ data }) {
  console.log(data);
  return (
    <>
      {data.map((scene) => (
        <View key={scene._id} style={styles.container}>
          <View>
            <Text style={styles.scene}>{scene.sceneNumber}</Text>
          </View>
          <View>
            <Text style={styles.day}>{scene.playDay}</Text>
          </View>
          <View>
            <Text style={styles.mood}>{scene.mood}</Text>
          </View>
          <View>
            <Text style={styles.place}>{scene.place}</Text>
          </View>
          <View>
            <Text style={styles.content}>{scene.description}</Text>
          </View>
          <View>
            <Text style={styles.notes}>{scene.notes}</Text>
          </View>
        </View>
      ))}
    </>
  );
}
