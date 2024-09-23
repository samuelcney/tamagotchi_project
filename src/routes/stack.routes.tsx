import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import DrawerRoutes from "./drawer.routes";
import TabRoutesHome from "./tab.routes";
import GameOne from "../screens/Tamagotchi/Games/GameOne";
import GameTwo from "../screens/Tamagotchi/Games/GameCamera";
import EditScreen from "../screens/Tamagotchi/Games/EditScreen";

const Stack = createNativeStackNavigator()

export default function StackRoutes(){

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
            />
            <Stack.Screen 
                name="gameTwo"
                component={GameTwo}
                options={{
                    headerShown: true,
                    title: ''
                }}
            />
            <Stack.Screen 
            name="EditScreen"
            component={EditScreen}
            options={{
                headerShown: true,
                title: ''
            }}
        />
        </Stack.Navigator>
    )
}