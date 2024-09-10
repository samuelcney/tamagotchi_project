import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../components/ThemeProvider"
import React from "react";
import { Text, View, Button } from "react-native";

export default function OpenScreen(){

    const {themeColor} = useTheme()
    
    const navigation = useNavigation<any>()

    return(
        <View className='flex-1 items-center justify-center gap-3'>
            <Text className='font-bold text-2xl'>OpenScreen</Text>

            <Button title='Entrar' color={themeColor} onPress={()=>{
                navigation.navigate('secondScreen') 
            }} />
        </View>
    )
}