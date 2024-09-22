import React, { useEffect, useState } from "react";
import { Image, Pressable } from "react-native";
import Cartola from '../../assets/images/cartola.png'
import Duende from '../../assets/images/duende.png'
import Mago from '../../assets/images/mago.png'
import Cowboy from '../../assets/images/cowboy.png'
import Bone from '../../assets/images/bone.png'
import Fogo from '../../assets/images/fogo.gif'
import { getRealm } from "@/db/realm";
import { typeTamagotchi } from "@/types/tamagotchiType";


export default function Hats(){
    
    const hatsArray = [Cartola, Duende, Mago, Cowboy, Bone, Fogo]
    
    const [hat, setHat] = useState(Cowboy)

    const getRandomHat = ()=>{
        let random = Math.floor(Math.random() * hatsArray.length)

        let randomHat= hatsArray[random]

        setHat(randomHat)

        return randomHat
    }
    return(
        <Pressable 
        onPress={()=>{
            getRandomHat()
        }}
        style={{width: 310, height: 200, alignItems: 'center'}}>
            <Image source={hat}
            style={{width: '100%', height: '100%'}} resizeMode='contain'/>
        </Pressable>
    )
}