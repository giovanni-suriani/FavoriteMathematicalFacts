import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


// Create with a add+circle blue icon
// Delete with a remove-circle red icon
// Edit on clicking the view

const index = () => {
  return (
    <SafeAreaView>
      <Text>index</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent: 'center',
    }
});
export default index