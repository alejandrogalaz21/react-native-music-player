import React from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import songs from './../model/data'

const { width, height } = Dimensions.get('window')

function Button(icon, size, color) {
  return (
    <TouchableOpacity onPress={() => {}}>
      <Ionicons name="ellipsis-horizontal" size={30} color="#888888" />
    </TouchableOpacity>
  )
}

function ButtonsPanel() {
  return (
    <View style={styles.bottomContainer}>
      <View style={styles.bottomContainerIconWrapper}>
        <Button name="heart-outline" size={30} color="#888888" />
        <Button name="repeat" size={30} color="#888888" />
        <Button name="share-outline" size={30} color="#888888" />
      </View>
    </View>
  )
}

const MusicPlayer = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        {/* image */}
        <View style={[styles.imageWrapper, styles.elevation]}>
          <Image style={styles.musicImage} source={songs[0].artwork} />
        </View>
        {/* slider */}
        {/* music controls */}
      </View>
      <ButtonsPanel />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831'
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomContainer: {
    width,
    alignItems: 'center',
    paddingVertical: 15,
    borderTopColor: '#393E46',
    borderWidth: 1
  },
  bottomContainerIconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%'
  },
  imageWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25
  },
  musicImage: { width: '100%', height: '100%', borderRadius: 15 },
  elevation: {
    elevation: 5,
    shadowColor: '#ccc',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84
  }
})

export default MusicPlayer
