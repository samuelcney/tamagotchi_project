import Hats from '@/components/Hats';
import { getRealm } from '@/db/realm';
import { typeTamagotchi } from '@/types/tamagotchiType';
import { Feather } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'

import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'expo-router';

export default function GameTwo() {

  const route = useRoute()

  const {tamagotchi} = route.params as {tamagotchi: typeTamagotchi}

  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null); 
  const [galleryPermission, setGalleryPermission] = useState<boolean | null>(null);
  const navigation = useNavigation<any>()

  useEffect(() => {
    
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setGalleryPermission(status === 'granted');
    })();
  }, []);

  if (!permission) {
    
    return <View />
  }

  if (!permission.granted) {
    
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

 
  const handlePic = async() =>{
    try{
      let photo = await cameraRef.current.takePictureAsync()
      navigation.navigate('EditScreen', {imageUri: photo.uri, tamagotchi: tamagotchi})
    }
    catch(error){
      console.log('Error capturing photo:', error)
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef} >
        <View style={{width: '100%'}}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Feather name='refresh-ccw' size={30} color={'#fff'}/>
          </TouchableOpacity>
        </View>

        <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', marginTop: 70}}>
          <TouchableOpacity
          onPress={()=>{
            handlePic()
          }}
          style={styles.buttonPicture}>
            <Feather size={40} name='camera' color={'#fff'}/>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent'
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#00000066',
    width: 50,
    height: 40,
    borderRadius: 12
  },
  buttonPicture:{
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#00000066',
    width: 120,
    height: 55,
    borderRadius: 12,
    marginTop: 330
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});