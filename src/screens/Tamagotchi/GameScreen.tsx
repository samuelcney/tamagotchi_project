import { useTheme } from "../../components/ThemeProvider";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function GameScreen(){

    const {themeColor} = useTheme()

    return(
        <View className='flex-1 items-center justify-evenly' style={{backgroundColor: themeColor}}>
            
        <View style={styles.gameContainer}>
            <Text>Clique aqui para jogar pedra, papel e tesoura</Text>
            <Pressable style={styles.game} onPress={()=>''}></Pressable>
        </View>

        <View style={styles.gameContainer}>
            <Text>Clique aqui para tirar uma foto com seu Cupincha</Text>
            <Pressable style={styles.game}></Pressable>
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
       borderWidth: 2,
       marginTop: 10 
    }
})