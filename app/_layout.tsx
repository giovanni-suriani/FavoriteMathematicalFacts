import "react-native-reanimated"
import { Tabs } from "expo-router"
import React from "react"
import { SQLiteProvider } from "expo-sqlite"
import Ionicons from "@expo/vector-icons/Ionicons"
import { initializeDatabase } from "@/db"
import { Stack } from "expo-router"

export default function RootLayout() {
  // return (
  //   <SQLiteProvider databaseName="myfirstdb" onInit={initializeDatabase}>
  //     {/* console.log(`Colors: ${JSON.stringify(colors)}`); */}
  //     <Tabs>
  //       <Tabs.Screen
  //         name="index"
  //         options={{
  //           tabBarActiveTintColor: "blue",
  //           title: "Mathematical Factss",
  //           tabBarIcon: ({ color, size }) => (
  //             <Ionicons name="home" color={color} size={size} />
  //           ),
  //         }}
  //       />
  //       <Tabs.Screen
  //         name="create_on_db"
  //         options={{
  //           title: "Create/Edit Fact",
  //           tabBarIcon: (props) => (
  //             <Ionicons name="create" color={props.color} size={props.size} />
  //           ),
  //         }}
  //       />
  //     </Tabs>
  //   </SQLiteProvider>
  // )
  return(
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
      {/* <Stack.Screen name="" options={{ title: "Mathematical Facts" }} /> */}
    </Stack>
  )
}
