import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const MusicPlayer = () => {
  return (
    <View style={styles.container}>
      <Text>React Native Music Player</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default MusicPlayer
