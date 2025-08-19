import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react"
import { StyleSheet } from "react-native"
import MathematicalItem from "@/components/MathematicalItem"
import * as storage from "@/helperStorage"

// create_on_async_storage.tsx
// Component to make a entry to the db or edit an existing entry

const create_db = () => {

  const [fact, setFact] = useState("a^2 = b^2 + c^2") // Default fact, can be changed

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.childContainer}> */}
      <View style={styles.child1}>
        <Text style={styles.title}>Type Your Mathematical Fact</Text>
        <View  style={{width:"100%"}}>
          <TextInput style={styles.input} value={fact} onChangeText={setFact} />
          <TouchableOpacity
            style={styles.saveButton}
            // on press, save on async storage
            onPress={async () => {
              if (!fact.trim()) {
                alert("Please enter a fact")
                return
              }
              try {
                storage.addFact(fact)
                alert("Fact saved successfully!")
                const facts = storage.getAllFacts()
                // console.log(`Stored facts: ${JSON.stringify(facts)}`);
                setFact("") // Clear the input after saving
                // log all facts saved
              } catch (error) {
                console.error("Error saving fact:", error)
                alert("Failed to save fact. Please try again.")
              }
            }}
          >
            <Text style={{ fontSize: 18 }}>Save Fact</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Rendering in real time */}
      <View style={styles.renderItemView}>
        <MathematicalItem latexFact={fact} scale={1.5} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  child1: {
    // flex: 1,
    width: "75%",
    alignItems: "center",
    // backgroundColor: "rgba(239, 245, 57, 0.76)",

  },
 
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    // backgroundColor: "rgba(239, 245, 57, 0.76)",
  },
  input: {
    // width: 240,
    // width:
    // minWidth: "100%",
    // width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
    // height: 40,
    fontSize: 18,
    textAlign: "center",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
  },
  saveButton: {
    // minWidth: "100%",
    fontSize: 24,
    backgroundColor: "rgb(67, 249, 64)",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  renderItemView: {
    display: "flex",
    overflow: "visible",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    // backgroundColor: "rgba(100, 255, 218, 0.39)",
  },
})

export default create_db
