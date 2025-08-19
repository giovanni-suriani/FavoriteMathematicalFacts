import React, { useState, useEffect } from "react"
import { TouchableOpacity, View } from "react-native"
import { StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import MathematicalItem from "@/components/MathematicalItem"
import { FlatList } from "react-native"
import * as storage from "@/helperStorage"
import * as helpDB from "@/helperDB"
import { useSQLiteContext } from "expo-sqlite"
import Ionicons from "@expo/vector-icons/Ionicons"

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
  const db = useSQLiteContext()

  const [items, setItems] = useState<{ id: number; fact: string }[]>([])

  useEffect(() => {
    async function loadFacts() {
      try {
        const dbFacts = await helpDB.getAllFacts(db)
        const storageFacts = await storage.getAllFacts()
        setItems([...(dbFacts || []), ...(storageFacts || [])])
        console.log("Database facts:", dbFacts)
        console.log("Storage facts:", storageFacts)
      } catch (err) {
        console.error("Error loading facts:", err)
      }
    }

    loadFacts()

    return () => {
      // optional cleanup
    }
  }, [db])

  const scale = 1.7 // Adjust zoom level as needed

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ transform: [{ scale: 1 }] }} // Adjust zoom level
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.renderItemView}>
            <View style={styles.renderItemTwoColumns}>
              {/* <View> */}
                <View>
                  {/* Column 1 */}
                  <MathematicalItem latexFact={item.fact} scale={scale} />
                </View>
                <TouchableOpacity>
                  {/* Column 2 */}
                  <Ionicons name="trash" size={24} color="grey" />
                </TouchableOpacity>
              </View>
            {/* </View> */}
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
      <TouchableOpacity
        style={styles.deleteAllButton}
        onPress={async () => {
          try {
            await helpDB.deleteAllFacts(db)
            await storage.clearFacts()
            setItems([]) // Clear local state
            alert("All facts deleted successfully!")
            // console.log("All facts deleted from both database and storage.")
          } catch (err) {
            console.error("Error deleting all facts:", err)
          }
        }}
      >
        <Text style={{ fontSize: 18 }}>Delete All</Text>
      </TouchableOpacity>
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
    width: "100%",
    overflow: "visible",
    display: "flex",
    marginBottom:10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 50,
    // backgroundColor: "rgba(10, 9, 9, 0.5)",
    // backgroundColor: "rgb(255, 20, 20)",
    // transform: [{ scale: 4 }], // Adjust zoom level
    // minWidth: "50%",
    // minHeight: 100,
    // padding: 10,
    // marginTop: 15,
  },
  renderItemTwoColumns:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    marginRight: 10,
    // backgroundColor: "rgba(239, 245, 57, 0.76)",
    // width: "100%",
  },
  deleteAllButton: {
    // minWidth: "100%",
    fontSize: 24,
    backgroundColor: "rgb(64, 212, 249)",
    padding: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
})

export default index
