import { useRoute } from '@react-navigation/native';
import { Image, PanResponder, Animated, Alert, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot'
import { Feather } from '@expo/vector-icons';
import Hats from '@/components/Hats'; 
import { useEffect, useRef, useState } from 'react';
import { typeTamagotchi } from '@/types/tamagotchiType';
import { getRealm } from '@/db/realm';

export default function EditScreen() {
  const route = useRoute();
  const { imageUri, tamagotchi } = route.params as { imageUri: string , tamagotchi: typeTamagotchi};
  const viewRef = useRef<any>(null);

  const hatPosition = useRef(new Animated.ValueXY({ x: 100, y: 100 })).current;
  const tamagotchiPosition = useRef(new Animated.ValueXY({ x: 50, y: 200 })).current;
  const [galleryPermission, setGalleryPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de permissão para salvar na galeria');
        return;
      }
      setGalleryPermission(true);
    })();
  }, []);

  const panResponderHat = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: hatPosition.x, dy: hatPosition.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {},
  });

  const panResponderTamagotchi = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: tamagotchiPosition.x, dy: tamagotchiPosition.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {},
  });

  const handleScreenshot = async () => {
    if (viewRef.current) {
      try {
        const uri = await captureRef(viewRef.current, {
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

  return (
    <View style={[styles.container, { borderColor: 'transparent', borderWidth: 2 }]} ref={viewRef}>
      <Image source={{ uri: imageUri }} style={styles.backgroundImage} />

      <Animated.View style={[styles.hat, { transform: [{ translateX: hatPosition.x }, { translateY: hatPosition.y }] }]} {...panResponderHat.panHandlers}>
        <Hats />
      </Animated.View>

      <Animated.View style={[styles.tamagotchi, { transform: [{ translateX: tamagotchiPosition.x }, { translateY: tamagotchiPosition.y }] }]} {...panResponderTamagotchi.panHandlers}>
        <Image source={{ uri: tamagotchi?.imageURL }} style={styles.tamagotchiImage} />
      </Animated.View>

      <TouchableOpacity style={styles.saveButton} onPress={()=>{
        handleScreenshot()
        updateHappy(tamagotchi._id)
      }}>
        <Feather name="save" size={40} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  hat: {
    position: 'absolute',
  },
  tamagotchi: {
    position: 'absolute',
  },
  tamagotchiImage: {
    width: 150,
    height: 150,
    aspectRatio: 1
  },
  saveButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#00000066',
    padding: 15,
    borderRadius: 50,
  },
});
