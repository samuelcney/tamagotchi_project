import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer'

import { Feather,  } from "@expo/vector-icons";
import Settings from "../screens/Settings/Settings";

import { useTheme } from "../components/ThemeProvider";
import HomeScreen from "../screens/Home/Home";
import Register from "../screens/Settings/Register";

const Drawer = createDrawerNavigator()

export default function DrawerRoutes(){

    const { themeColor } = useTheme()

    return(
        <Drawer.Navigator screenOptions={{
            headerStyle:{height: 80, borderBottomWidth:2}, 
            drawerStyle:{width: 250},
            drawerActiveTintColor: themeColor,
            headerLeftContainerStyle:{paddingBottom: 10}
        }}>
            <Drawer.Screen 
                name="Home"
                component={HomeScreen}
                options={{
                    drawerLabel: 'Início',
                    drawerIcon: ({color,size})=><Feather name="home" color={color} size={size}/>,
                    title: '',
                }}
            />
            <Drawer.Screen 
                name="Caipira"
                component={Register}
                options={{
                    drawerLabel: 'Adicionar Caipira',
                    drawerIcon: ({color,size})=><Feather name="smile" color={color} size={size}/>,
                    headerTitleAlign: 'center',
                    title: ''
                }}
            />
            <Drawer.Screen 
                name='Configurações'
                component={Settings}
                options={{
                    drawerIcon: ({color,size})=> <Feather name='settings' size={size} color={color}/>,
                }}
            />
        </Drawer.Navigator>
    )
}