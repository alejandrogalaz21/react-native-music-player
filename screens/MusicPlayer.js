import React, { useEffect, useState, useRef } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
  Animated
} from 'react-native'
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents
} from 'react-native-track-player'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Slider from '@react-native-community/slider'

import songs from './../model/data'

const { width, height } = Dimensions.get('window')

function Button({ icon, size, color, action }) {
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

function ImageSong({ item, index }) {
  return (
    <Animated.View style={styles.imageContainer}>
      <View style={[styles.imageWrapper, styles.elevation]}>
        <Image style={styles.musicImage} source={item.artwork} />
      </View>
    </Animated.View>
  )
}

function SongInfo({ index = 0 }) {
  return (
    <View>
      <Text style={[styles.songInfo, styles.songTitle]}>
        {songs[index].title}
      </Text>
      <Text style={[styles.songInfo, styles.songArtist]}>
        {songs[index].artist}
      </Text>
    </View>
  )
}

function SongSlider() {
  return (
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
  )
}

function SongDuration() {
  return (
    <View style={[styles.progressDuration]}>
      <Text style={[styles.progressDurationLabel]}>00:00</Text>
      <Text style={[styles.progressDurationLabel]}>00:00</Text>
    </View>
  )
}

const setUpTrackPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer()
    await TrackPlayer.add(songs)
  } catch (error) {
    console.error(error)
  }
}

const MusicPlayer = () => {
  // custom states
  const playBackState = usePlaybackState()
  const [songIndex, setSongIndex] = useState(0)
  // custom refs
  const scrollX = useRef(new Animated.Value(0)).current
  // flatlist ref
  const songSlider = useRef(null)

  useEffect(() => {
    setUpTrackPlayer()
    scrollX.addListener(({ value }) => {
      const index = getIndex(value, width)
      console.log(
        `scrollX: ${value} | Device width: ${width} | Index: ${index}`
      )
      setSongIndex(index)
    })

    // return () => {
    //   scrollX.removeAllListeners()
    // }
  }, [])

  const getIndex = (value, width) => Math.round(value / width)

  const togglePlayback = async playBackState => {
    const currentTrack = await TrackPlayer.getCurrentTrack()
    if (currentTrack !== null) {
      if (playBackState === State.Playing) {
        await TrackPlayer.pause()
      } else {
        await TrackPlayer.play()
      }
    }
  }

  const skipToNext = () => {
    const nextSong = (songIndex + 1) * width
    songSlider.current.scrollToOffset({ offset: nextSong })
    const index = getIndex(nextSong, width)
    console.log(`Skip to next song: ${nextSong}, index : ${index}`)
  }

  const skipToPrevious = () => {
    const previousSong = (songIndex - 1) * width
    console.log({ previousSong })
    songSlider.current.scrollToOffset({ offset: previousSong })
    const index = getIndex(previousSong, width)
    console.log(`Skip to previous song: ${previousSong}, index : ${index}`)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        {/* image */}
        <Animated.FlatList
          ref={songSlider}
          renderItem={ImageSong}
          data={songs}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: scrollX }
                }
              }
            ],
            { useNativeDriver: true }
          )}
        />
        {/* song info */}
        <SongInfo index={songIndex} />
        {/* slider */}
        <SongSlider />
        {/* song duration */}
        <SongDuration />
        {/* music controls */}
        <View style={styles.musicControlsContainer}>
          <Button
            icon="play-skip-back-outline"
            size={35}
            color="#FFD369"
            action={skipToPrevious}
          />
          <Button
            icon={
              playBackState === State.Playing
                ? 'ios-pause-circle'
                : 'ios-play-circle'
            }
            size={75}
            color="#FFD369"
            action={() => togglePlayback(playBackState)}
          />
          <Button
            icon="play-skip-forward-outline"
            size={35}
            color="#FFD369"
            action={skipToNext}
          />
        </View>
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

  imageContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageWrapper: {
    width: 300,
    height: 340,
    marginBottom: 20,
    marginTop: 20
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
  },
  progressDuration: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  progressDurationLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500'
  },
  musicControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 15
  }
})

export default MusicPlayer
