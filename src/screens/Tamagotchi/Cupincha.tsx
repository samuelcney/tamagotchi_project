import { typeTamagotchi } from '../../types/tamagotchiType'
import { useTheme } from '../../components/ThemeProvider';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Tamagotchi from '../../components/TamagotchiModel';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CupinchaScreen({...rest}:typeTamagotchi) {
  
  const {themeColor} = useTheme()

  const navigation = useNavigation()

  if(!rest){
    return(
      <View className='flex-1 items-center' style={{backgroundColor:themeColor}}>
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
        name={rest.name}
        imageURL={rest.imageURL}
        happiness={rest.happiness}
        sleep={rest.sleep}
        status={rest.status}
        hungry={rest.hungry}
      />
    </View>
  );
}