import React from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  Text
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Slider from '@react-native-community/slider'
import songs from './../model/data'

const { width, height } = Dimensions.get('window')

function Button({ icon, size, color, action }) {
  console.log(icon)
  return (
    <TouchableOpacity onPress={action}>
      <Ionicons name={icon} size={size} color={color} />
    </TouchableOpacity>
  )
}

function ButtonsPanel() {
  function onPressLike() {
    console.log('Pressed like')
  }

  function onPressRepeat() {
    console.log('Pressed repeat')
  }

  function onPressShare() {
    console.log('Pressed share')
  }

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.bottomContainerIconWrapper}>
        <Button
          icon="heart-outline"
          size={30}
          color="#888888"
          action={onPressLike}
        />
        <Button
          icon="repeat"
          size={30}
          color="#888888"
          action={onPressRepeat}
        />
        <Button
          icon="share-outline"
          size={30}
          color="#888888"
          action={onPressShare}
        />
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
        {/* song info */}
        <View>
          <Text style={[styles.songInfo, styles.songTitle]}>
            {songs[0].title}
          </Text>
          <Text style={[styles.songInfo, styles.songArtist]}>
            {songs[0].artist}
          </Text>
        </View>
        {/* slider */}
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.progressBar}
            value={50}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#fff"
            onSlidingComplete={value => console.log(value)}
          />
        </View>
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
  },
  songInfo: {
    color: '#fff',
    textAlign: 'center'
  },
  songTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  songArtist: {
    fontSize: 16
  },
  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row'
  }
})

export default MusicPlayer
