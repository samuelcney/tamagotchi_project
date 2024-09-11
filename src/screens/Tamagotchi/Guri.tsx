import { typeTamagotchi } from '../../types/tamagotchiType'
import { useTheme } from '../../components/ThemeProvider';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Tamagotchi from '../../components/TamagotchiModel';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getRealm } from '../../db/realm';

export default function GuriScreen({...rest}:typeTamagotchi) {
  
  const {themeColor} = useTheme()

  const navigation = useNavigation()

  const [tamagotchi, setTamagotchi] = useState(rest);

  useEffect(() => {
    
    const loadTamagotchi = async () => {
      let realm = await getRealm();
      const tamagotchiObject = realm.objectForPrimaryKey<typeTamagotchi>('Tamagotchi', rest._id);

      const listener = () => {
        if (tamagotchiObject) {
          setTamagotchi({ ...tamagotchiObject });
        }
      };

      tamagotchiObject?.addListener(listener);

      return () => {
        tamagotchiObject?.removeListener(listener);
        if (realm) realm.close();
      };
    };

    loadTamagotchi();
  }, [rest._id]);

  if(!rest){
    return(
      <View className='flex-1 items-center justify-center' style={{backgroundColor:themeColor}}>
        <Text>Carregando...</Text>
      </View>
    )
  }

  return (
    <View className='flex-1 items-center' style={{backgroundColor:themeColor}}>

        <View style={{width: '100%', height: 28, justifyContent:'center', alignItems: 'flex-start'}} className="mt-2 ml-2">
        <Pressable onPress={()=>{navigation.goBack()}}>
            <Feather name="arrow-left" size={28} color={'#fff'}/>
        </Pressable>   
        </View>

      <Tamagotchi 
        _id={tamagotchi._id}
        name={tamagotchi.name}
        imageURL={tamagotchi.imageURL}
        happiness={tamagotchi.happiness}
        sleep={tamagotchi.sleep}
        status={tamagotchi.status}
        hungry={tamagotchi.hungry}
      />
    </View>
  );
}