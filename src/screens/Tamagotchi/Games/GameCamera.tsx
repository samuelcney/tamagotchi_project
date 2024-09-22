import Hats from '@/components/Hats';
import { getRealm } from '@/db/realm';
import { typeTamagotchi } from '@/types/tamagotchiType';
import { Feather } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Camera, CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'
import {captureRef} from 'react-native-view-shot'

import { useEffect, useRef, useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView } from 'react-native';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GameTwo () {

  const route = useRoute()

  const {tamagotchi} = route.params as {tamagotchi: typeTamagotchi}

  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null); 
  const viewRef = useRef(null)
  const [galleryPermission, setGalleryPermission] = useState<boolean | null>(null);

  const [capturedImage, setCapturedImage] = useState(null)

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

  const updateHappy = async(id : string | undefined)=>{
    try {
      const realm = await getRealm()
      realm.write(()=>{
        const tamagot = realm.objectForPrimaryKey<typeTamagotchi>("Tamagotchi", id)

        if(tamagot){
          let newHappiness = tamagot.happiness + 10

          if(newHappiness > 100){
            newHappiness = 100
          }

          tamagot.happiness = newHappiness
        }
      })

    } 
    catch(error) {
      console.log(error)  
    }
  }

  const handlePic = async () => {
    if (cameraRef.current) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        const uri = await captureRef(cameraRef.current, {
          format: 'jpg',
          quality: 1,
        });

        if (galleryPermission) {
          await MediaLibrary.createAssetAsync(uri);
          Alert.alert('Screenshot capturado', 'Screenshot salvo na galeria!');
        } else {
          Alert.alert('Permissão necessária', 'Precisamos de permissão para salvar na galeria');
        }
      } catch (error) {
        console.error('Erro ao capturar screenshot:', error);
      }
    }
  }

  // const handlePic = async() =>{
  //   try{
  //     let photo = await cameraRef.current.takePictureAsync()
  //     setCapturedImage(photo)

  //     const asset = await MediaLibrary.createAssetAsync(photo.uri)
  //     await MediaLibrary.createAlbumAsync('Expo Tamagotchi', asset, false)      
  //   }
  //   catch(error){
  //     console.log(error)
  //   }
  // }

  return (
    <View style={styles.container} ref={viewRef}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef} >
        <View style={{width: '100%'}}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Feather name='refresh-ccw' size={30} color={'#fff'}/>
          </TouchableOpacity>
        </View>

        <Hats />
        
        <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', marginTop: 70}}>
          <Image source={{uri: tamagotchi.imageURL}} width={100} height={100} />
          <Pressable
          onPress={()=>{
            updateHappy(tamagotchi._id)
            handlePic()
          }}
          style={styles.buttonPicture}>
            <Feather size={40} name='camera' color={'#fff'}/>
          </Pressable>
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
    justifyContent: 'center',
    paddingTop: 165,
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
    marginTop: 16
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

});