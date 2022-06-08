import React from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const MusicPlayer = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <Ionicons name="heart-outline" size={30} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555'
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default MusicPlayer
