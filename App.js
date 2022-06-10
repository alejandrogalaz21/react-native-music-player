// import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import MusicPlayer from './screens/MusicPlayer'

export default function App() {
  return (
    <View style={styles.container}>
      <MusicPlayer />
      <StatusBar style="light-content" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
