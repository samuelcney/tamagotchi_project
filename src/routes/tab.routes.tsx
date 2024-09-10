import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from '../components/ThemeProvider'

import Kitchen from '../screens/Tamagotchi/Kitchen'
import Games from '../screens/Tamagotchi/GameScreen'
import GuriScreen from '../screens/Tamagotchi/Guri'

import { Feather } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { typeTamagotchi } from '@/types/tamagotchiType'

const Tab = createBottomTabNavigator()

export default function TabRoutesHome(){

    const {themeColor} = useTheme()

    const route = useRoute()
    const {tamagotchi} = route.params as {tamagotchi: typeTamagotchi}

    const ComponentInline = () =>(
        <GuriScreen {...tamagotchi}/>
    )

    return(
        <Tab.Navigator screenOptions={{
            tabBarStyle:{height: 68},
            tabBarLabelStyle:{
                fontSize: 14,
                marginBottom: 5,
            },
            tabBarActiveTintColor: themeColor,
        }}>
            <Tab.Screen 
                name='Início'
                component={ComponentInline}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color,size})=> <Feather name='home' size={size} color={color} />,
                }}
            />
            <Tab.Screen 
                name='Cozinha'
                component={Kitchen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color,size})=> <Feather name='coffee' size={size} color={color}/>,
                    
                }}
            />
            <Tab.Screen 
                name='Jogos'
                component={Games}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color,size})=> <Feather name='play' size={size} color={color}/>,
                    
                }}
            />
        </Tab.Navigator>
    )
}

