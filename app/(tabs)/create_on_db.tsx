import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, TextInput, View } from 'react-native'
import * as db from "@/db" // Import the database functions
import { useSQLiteContext } from 'expo-sqlite'

// create_db.tsx 
// Component to make a entry to the db or edit an existing entry


const create_db = () => {
  const db = useSQLiteContext();

  
  return (
    <SafeAreaView>
      <TextInput>Type Your Msathsematiscal Fasct</TextInput>
    </SafeAreaView>
  )
}

export default create_db