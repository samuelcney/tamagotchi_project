import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import DrawerRoutes from "./drawer.routes";
import TabRoutesHome from "./tab.routes";
import GameOne from "../screens/Tamagotchi/Games/GameOne";
import { useTheme } from "../components/ThemeProvider";

const Stack = createNativeStackNavigator()

export default function StackRoutes(){

    const {themeColor} = useTheme()

    return(
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }} >
         
            <Stack.Screen
                name="firstScreen"
                component={DrawerRoutes}
            />
            <Stack.Screen 
                name="secondScreen"
                component={TabRoutesHome}
            />
            <Stack.Screen 
                name="gameOne"
                component={GameOne}
                options={{
                    headerShown: true,
                    title: '',
                    headerStyle:{
                        backgroundColor: themeColor
                    },

                }}
            />
        </Stack.Navigator>
    )
}