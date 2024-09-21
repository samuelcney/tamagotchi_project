import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from '../components/ThemeProvider'

import Kitchen from '../screens/Tamagotchi/Kitchen'
import Games from '../screens/Tamagotchi/Games/GameScreen'
import CaipiraScreen from '../screens/Tamagotchi/Caipira'

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { typeTamagotchi } from '@/types/tamagotchiType'
import Room from '../screens/Tamagotchi/Room'

const Tab = createBottomTabNavigator()

export default function TabRoutesHome(){

    const {themeColor} = useTheme()

    const route = useRoute()
    const {tamagotchi} = route.params as {tamagotchi: typeTamagotchi}

    const ComponentCaipira = () =><CaipiraScreen {...tamagotchi}/>
    const ComponentKitchen = () =><Kitchen {...tamagotchi}/>
    const ComponentGames = () =><Games {...tamagotchi}/>
    const ComponentRoom = () =><Room {...tamagotchi}/>
    

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
                component={ComponentCaipira}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color,size})=> <Feather name='home' size={size} color={color} />,
                }}
            ></Tab.Screen>
            <Tab.Screen 
                name='Cozinha'
                component={ComponentKitchen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color,size})=> <Feather name='coffee' size={size} color={color}/>,
                    
                }}
            />
            <Tab.Screen 
                name='Quarto'
                component={ComponentRoom}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color,size})=> <MaterialCommunityIcons name='bed-king-outline' size={size} color={color}/>,
                    
                }}
            />
            <Tab.Screen 
                name='Jogos'
                component={ComponentGames}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color,size})=> <Feather name='play' size={size} color={color}/>,
                    
                }}
            />
        </Tab.Navigator>
    )
}

