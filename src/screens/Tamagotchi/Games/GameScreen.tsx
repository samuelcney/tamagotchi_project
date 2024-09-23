import { typeTamagotchi } from "@/types/tamagotchiType";
import { useTheme } from "../../../components/ThemeProvider";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

export default function GameScreen({...rest}:typeTamagotchi){

    const {themeColor} = useTheme()

    const navigation = useNavigation<any>()

    const handleNavigateOne = (rest: typeTamagotchi)=>{
        navigation.navigate("gameOne", { tamagotchi: rest })
    }

    const handleNavigateTwo = (rest: typeTamagotchi)=>{
        navigation.navigate("gameTwo", {tamagotchi: rest})
    }

    return(
        <View className='flex-1 items-center justify-center gap-20 p-4' style={{backgroundColor: themeColor}}>

            <View className="items-center mt-1">
                <MaterialCommunityIcons name="emoticon-happy-outline" size={50} color={'#fff'}/>
                <Text className="font-bold text-2xl text-white">{rest.happiness}</Text>
            </View>
            
        <View style={styles.gameContainer}>
            <Text className='font-bold text-xl text-white'>Pedra, Papel e Tesoura</Text>
            <Pressable style={styles.game} onPress={()=>handleNavigateOne(rest)}>
                <Feather name="play" size={80} color={'#fff'} style={{marginLeft:10}}/>
            </Pressable>
        </View>

        <View style={styles.gameContainer}>
            <Text className='font-bold text-xl text-white text-center'>Tirar foto com o Caipira</Text>
            <Pressable style={styles.game} onPress={()=>handleNavigateTwo(rest)}>
                <Feather name="camera" size={80} color={'#fff'} />
            </Pressable>
        </View>

        </View>
    )
}

const styles = StyleSheet.create({
    gameContainer:{
        alignItems: 'center'
    },
    game:{
       width: 150,
       height: 150,
       borderWidth: 5,
       marginTop: 10,
       borderRadius: 22,
       borderColor: '#fff',
       alignItems: 'center',
       justifyContent: 'center'
    }
})