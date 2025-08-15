import React, { useState, useEffect } from "react"
import { View } from "react-native"
import { StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import MathematicalItem from "@/components/MathematicalItem"
import { FlatList } from "react-native"
import { useSQLiteContext } from "expo-sqlite"

// Create with a add+circle blue icon
// Delete with a remove-circle red icon
// Edit on clicking the view of the item
// List with a flat list of items

const index = () => {
  // const setItems = (item) => {
  //   // setItems([...items, item])
  //   console.log("Item added:", item)
  // }

  // Reading from the database
  const db = useSQLiteContext();    

  const [items, setItems] = useState<{ id: number, fact: string }[]>([]);
  useEffect(() => {
    async function setup() {
      const result: { id: number, fact: string }[] = await db.getAllAsync('SELECT * FROM mathematicalFacts');
      setItems(result);
      console.log(`Fetched items: ${JSON.stringify(result)}`);
    }
    setup();
  }, []);
  

  const scale = 1.7; // Adjust zoom level as needed

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
      style={{transform: [{ scale: 1 }]}} // Adjust zoom level
        data={items}
        // keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.renderItemView, {marginBottom: 30 * scale}]}>
            <MathematicalItem latexFact={item.fact} scale={scale}/>
            {/* Put a grey trash ionicon here */}
          </View>
        )}
        // removeClippedSubviews={true}
        ListEmptyComponent={
        <View style={[styles.renderItemView]}>
          <MathematicalItem latexFact="No facts yet" scale={scale} />
        </View>
      }
      />
      {/* <MathematicalItem latexFact="No facts yet" scale={1.4} /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    // padding: "15%",
  },
  renderItemView: {
    overflow: "visible",
    display: "flex",
    // backgroundColor: "rgba(10, 9, 9, 0.5)",
    // backgroundColor: "rgb(255, 20, 20)",
    // transform: [{ scale: 4 }], // Adjust zoom level
    // minWidth: "50%",
    // minHeight: 100, 
    // padding: 10,
    // marginTop: 15,
  },
})

export default index
