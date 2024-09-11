import Routes from '../routes/index';
import React, { useEffect } from 'react';
import 'react-native-gesture-handler'
import "../styles/global.css"
import { ThemeProvider } from '../components/ThemeProvider';
import { AppRegistry } from 'react-native';
import { getRealm } from '../db/realm';
import { typeTamagotchi } from '../types/tamagotchiType';

export default function App() {

  const getStatus = (currentValue: number): string => {
    switch (true) {
      case currentValue === 0:
        return "Morto";
      case currentValue <= 50:
        return "Crítico";
      case currentValue <= 100:
        return "Muito triste";
      case currentValue <= 150:
        return "Triste";
      case currentValue <= 200:
        return "Ok";
      case currentValue <= 250:
        return "Bem";
      case currentValue <= 300:
        return "Muito bem";
      default:
        return "Tem algo errado...";
    }
  };

  const updateTamagotchiStatus = async()=>{
    try {
      const realm = await getRealm()

      realm.write(()=>{
        const tamagotchi = realm.objects<typeTamagotchi>("Tamagotchi")

        tamagotchi.forEach((item)=>{
            item.hungry = Math.max(0, item.hungry - 10);
            item.sleep = Math.max(0, item.sleep - 10);
            item.happiness = Math.max(0, item.happiness - 10);

            let somaStatus = item.happiness + item.hungry + item.sleep
            let updateStatus = getStatus(somaStatus)

            item.status = updateStatus
        })
      })
    }
    catch(error){
      console.log("Erro ao atualizar: " + error)
    }
  }

  useEffect(()=>{

    const intervalId = setInterval(() => {
      updateTamagotchiStatus()
    }, 2 * 60 * 1000)
    
    return () =>{
      clearInterval(intervalId)
    }
  },[])

  return (
    <ThemeProvider>
      <Routes /> 
    </ThemeProvider>
  );
}

