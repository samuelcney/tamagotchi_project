import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import DrawerRoutes from "./drawer.routes";
import OpenScreen from "../screens/Home/OpenScreen";
import TabRoutesHome from "./tab.routes";

const Stack = createNativeStackNavigator()

export default function StackRoutes(){

    return(
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen 
                name="firstScreen"
                component={OpenScreen}

            />
            <Stack.Screen
                name="secondScreen"
                component={DrawerRoutes}
            />
            <Stack.Screen 
                name="thirdScreen"
                component={TabRoutesHome}
            />
        </Stack.Navigator>
    )
}