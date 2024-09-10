import Routes from '../routes/index';
import React, { useEffect } from 'react';
import 'react-native-gesture-handler'
import "../styles/global.css"
import { ThemeProvider } from '../components/ThemeProvider';
import { AppRegistry } from 'react-native';
import { getRealm } from '../db/realm';
import { typeTamagotchi } from '../types/tamagotchiType';

export default function App() {

  const updateTamagotchiStatus = async()=>{
    try {
      const realm = await getRealm()

      realm.write(()=>{
        const tamagotchi = realm.objects<typeTamagotchi>("Tamagotchi")

        tamagotchi.forEach((item)=>{
            item.hungry = Math.max(0, item.hungry - 10);
            item.sleep = Math.max(0, item.sleep - 10);
            item.happiness = Math.max(0, item.happiness - 10);
        })
      })
    }
    catch(error){
      console.log("Erro ao atualizar: " + error)
    }
  }

  // useEffect(()=>{

  //   const intervalId = setInterval(() => {
  //     updateTamagotchiStatus()
  //   }, 60 * 1000)
    
  //   return () =>{
  //     clearInterval(intervalId)
  //   }
  // },[])

  return (
    <ThemeProvider>
      <Routes /> 
    </ThemeProvider>
  );
}

AppRegistry.registerComponent('MyApp', () => App);