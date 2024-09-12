import { typeTamagotchi } from "@/types/tamagotchiType";
import { useTheme } from "../../components/ThemeProvider"
import React, { useState } from "react";
import { Image , Text, View } from "react-native";
import Foods from "../../components/Foods";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Kitchen({...rest}:typeTamagotchi){

    const [hungry, setHungry] = useState(rest.hungry);
    const {themeColor} = useTheme()

    const handleUpdate = (newHungryValue : number)=>{
        setHungry(newHungryValue)
    }

    return(
        <View className='flex-1 items-center justify-between'
        style={{backgroundColor: themeColor}}>
            <View className="items-center mb-20 mt-10">
                <MaterialCommunityIcons name="food-drumstick-outline" size={50} color={'#fff'}/>
                <Text className="font-bold text-2xl text-white">{hungry}</Text>
            </View>

            <View className="mt-10">
                <Image source={{uri: rest.imageURL}} width={250} height={250}/>
            </View>

            <Foods id={rest._id} onUpdateHungry={handleUpdate}/>    
        </View>
    )
}