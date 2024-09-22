import React, { useEffect, useState } from "react";
import { Alert, Image, Pressable } from "react-native";
import Chimarrao from '../../assets/images/chimarrao.png'
import Espetinho from '../../assets/images/espeto.png'
import Queijo from '../../assets/images/quejoMinas.png'
import PaoDeQueijo from '../../assets/images/paoQueijo.png'
import Pamonha from '../../assets/images/pamonha.png'
import Belina from '../../assets/images/belina.png'
import Makita from '../../assets/images/makita.png'
import { getRealm } from "../db/realm";
import { typeTamagotchi } from "@/types/tamagotchiType";

import { Audio } from 'expo-av'

type FoodId = {
    id: string,
    onUpdateHungry: (newHungryValue: number) => void;
}

export default function Foods({id, onUpdateHungry}: FoodId){
    
    const foodsArray = [Chimarrao, Espetinho, Queijo, PaoDeQueijo, Pamonha, Belina, Makita]
    
    const [food, setFood] = useState(Chimarrao)

    const [sound, setSound] = useState<any>()

    async function playSound(){
        console.log('Loading Sound')

        const { sound } = await Audio.Sound.createAsync(require('../../assets/audio/eatingSound.mp3'))
        setSound(sound)

        console.log('Playing sound')
        await sound.playAsync()
    }

    const getRandomFood = ()=>{
        let random = Math.floor(Math.random() * foodsArray.length)

        let randomFood = foodsArray[random]

        setFood(randomFood)

        return randomFood
    }

    const updateHungry = async(id : string)=>{

        try {
            const realm = await getRealm()
            realm.write(()=>{
                const tamagotchi = realm.objectForPrimaryKey<typeTamagotchi>("Tamagotchi", id)

                if(tamagotchi){
                    let newHungryValue = tamagotchi.hungry + 10

                    if(newHungryValue > 100){
                        newHungryValue = 100
                    }

                    tamagotchi.hungry = newHungryValue
                    onUpdateHungry(newHungryValue);
                }
                else{
                    Alert.alert("a")
                }
            })
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
    },[sound])
    
    return(
        <Pressable onPress={()=>{
            getRandomFood(),
            updateHungry(id)
            playSound()
            }} style={{width: '100%', height: 250}}>

            <Image source={{uri: 'https://static.vecteezy.com/system/resources/previews/016/587/263/original/wooden-tabletop-with-isolated-background-free-png.png'}} style={{width:'100%', height: '100%',position: 'absolute', resizeMode: 'cover'}}/>

            <Image source={food} style={{resizeMode:'contain', width: '100%', height: '100%'}}/>

        </Pressable>
    )
}