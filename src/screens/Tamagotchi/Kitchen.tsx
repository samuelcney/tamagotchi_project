import { useTheme } from "../../components/ThemeProvider"
import React from "react";
import { Text, View } from "react-native";

export default function Kitchen(){

    const {themeColor} = useTheme()

    return(
        <View className='flex-1 items-center justify-center'
        style={{backgroundColor: themeColor}}>
            <Text className='font-bold text-2xl'>Em manutenção...</Text>
        </View>
    )
}