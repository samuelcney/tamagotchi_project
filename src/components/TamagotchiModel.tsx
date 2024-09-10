import { typeTamagotchi } from "@/types/tamagotchiType";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export default function Tamagotchi({ name, imageURL, sleep, happiness, hungry, status }: typeTamagotchi){
    return(
    <View className="items-center flex-1 justify-between">

        <View className="items-center">
            <Text className="font-bold text-4xl mb-3 color-white">{name}</Text>
            <Text className="font-bold">"{status}"</Text>
        </View>
            
            <View style={styles.imageContainer}>
                <Image source={{uri: !imageURL || null ? 'https://media.tenor.com/GVbLnw73qD8AAAAj/dancing-duck-karlo.gif' : imageURL}} style={styles.image} onError={(e)=>console.log(e)}/>
            </View>
            
        <View className="flex-row justify-between items-center w-10/12 mb-2">
            <View className='items-center mb-1'>
                <MaterialCommunityIcons name="food-drumstick-outline" size={40} color={'#fff'}/>
                <Text className='font-bold text-xl color-white'>{hungry}</Text>
            </View>

            <View className='items-center justify-center'>
                <MaterialCommunityIcons name="emoticon-happy-outline" size={40} color={'#fff'}/>
                <Text className='font-bold text-xl color-white'>{happiness}</Text>
            </View>

            <View className='items-center'>
                <MaterialCommunityIcons name="sleep" size={40} color={'#fff'}/>
                <Text className='font-bold text-xl color-white'>{sleep}</Text>
            </View>
        </View>       
    </View>
    )
}

const styles = StyleSheet.create({
    image:{
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
    imageContainer:{
        width: 330,
        height: 330
    }
})