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

    return(
        <View className='flex-1 items-center justify-center gap-24' style={{backgroundColor: themeColor}}>

            <View className="items-center mt-1">
                <MaterialCommunityIcons name="emoticon-happy-outline" size={50} color={'#fff'}/>
                <Text className="font-bold text-2xl text-white">{rest.happiness}</Text>
            </View>
            
        <View style={styles.gameContainer}>
            <Text className='font-bold text-xl text-white'>Clique aqui para jogar pedra, papel e tesoura</Text>
            <Pressable style={styles.game} onPress={()=>handleNavigateOne(rest)}>
                <Feather name="play" size={150} color={'#fff'} style={{marginLeft:10}}/>
            </Pressable>
        </View>

        <View style={styles.gameContainer}>
            <Text className='font-bold text-xl text-white'>Clique aqui para tirar uma foto com seu Cupincha</Text>
            <Pressable style={styles.game}>
                <Feather name="play" size={150} color={'#fff'} style={{marginLeft:10}}/>
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
       width: 200,
       height: 200,
       borderWidth: 4,
       marginTop: 10,
       borderRadius: 16,
       borderColor: '#fff',
       alignItems: 'center',
       justifyContent: 'center'
    }
})