import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import MusicPlayer from './screens/MusicPlayer'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function App() {
  return (
    <View style={styles.container}>
      <Ionicons name="heart-outline" size={30} />
      <MusicPlayer />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
