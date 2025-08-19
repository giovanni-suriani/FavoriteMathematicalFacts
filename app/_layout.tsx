import "react-native-reanimated"
import { Tabs } from "expo-router"
import React from "react"
import { SQLiteProvider } from "expo-sqlite"
import Ionicons from "@expo/vector-icons/Ionicons"
import { initializeDatabase } from "@/helperDB"
import { Stack } from "expo-router"

export default function RootLayout() {
 
  return(
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
      {/* <Stack.Screen name="" options={{ title: "Mathematical Facts" }} /> */}
    </Stack>
  )
}
