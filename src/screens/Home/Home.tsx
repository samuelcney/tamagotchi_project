import { typeTamagotchi } from "../../types/tamagotchiType";
import { getRealm } from "../../db/realm";

import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../components/ThemeProvider";
import React, {useState, useCallback, useEffect} from "react";

import { View, FlatList, Text, Alert, StyleSheet, Image, Pressable } from "react-native";
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons'

export default function HomeScreen(){

    const {themeColor} = useTheme()
    const [tamagotchis, setTamagotchis] = useState<typeTamagotchi[]>([])

    const navigation = useNavigation<any>()

    const getTamagotchis = useCallback(async()=>{

        const realm = await getRealm()
        try{
            const response = realm.objects<typeTamagotchi>("Tamagotchi")
            const ArrayResponse = Array.from(response)

            setTamagotchis(ArrayResponse)    
        }
        catch(error){
            Alert.alert("Erro", "Não foi possível carregar os cupincha...")
            console.log(error)
        }
    },[]) 

    function alertRemove(id :string | undefined){
        Alert.alert("Atenção!!!", "Deseja mesmo remover?", [
            {
                text: 'Cancelar',
                style: 'cancel'
            },
            {
                text: "Sim",
                onPress: ()=>{removeTamagotchi(id)}
            }
        ])
    }

    async function removeTamagotchi(id: string | undefined){
        const realm = await getRealm()
        
        try{
            realm.write(()=>{
                const toRemove = realm.objectForPrimaryKey<typeTamagotchi>('Tamagotchi', id)

                if(toRemove){
                    setTamagotchis(rest => rest.filter(item=> item._id !== id))
                    realm.delete(toRemove)
                }
            })

            getTamagotchis()
        }
        catch(error) {
            console.log(error)
        }
        
    }

    function handleNavigate(tamagotchi: typeTamagotchi){
        navigation.navigate('thirdScreen', {tamagotchi})
    }

      useEffect(()=>{
        getTamagotchis()
    },[])

    return(
        <View style={[{backgroundColor: themeColor}, styles.containerList]}>

        <View style={{width: '100%', height: 20, justifyContent:'center', alignItems: 'flex-end'}} className="mb-3">
            <Pressable onPress={getTamagotchis}>
                <Feather name="refresh-cw" size={22} color={'#fff'}/>
            </Pressable>    
        </View>
        
        <FlatList 
            data={tamagotchis}
            keyExtractor={(item)=> item._id?.toString() || item.name}
            renderItem={({item})=>(

                <Pressable style={styles.item} onPress={()=> handleNavigate(item)} key={item._id}>

                    <Feather color={'#fff'} size={24} name="trash-2" style ={styles.trashIcon} onPress={()=>alertRemove(item._id)}/>

                     <View className="items-center">
                        <Text className="font-bold text-2xl color-slate-200 mb-2 mt-7">{item.name}
                        </Text>
                        
                        <Text>"{item.status}"</Text>
                    </View>
                    
                    <Image source={{uri: !item.imageURL ? 'https://media.tenor.com/GVbLnw73qD8AAAAj/dancing-duck-karlo.gif' : item.imageURL}}
                        style={styles.itemImage}
                        onError={(e)=>console.log(e)}
                        resizeMode="contain"
                    />
                    

                    <View className="flex-row w-full items-center justify-between ">
                            <View className="items-center gap-0">
                                <MaterialCommunityIcons name="food-drumstick-outline" size={20} color={'#fff'}/>
                                <Text style={styles.text}>{item.hungry}</Text>
                            </View>
                            <View className="items-center">
                                <MaterialCommunityIcons name="emoticon-happy-outline" size={20} color={'#fff'}/>
                                <Text style={styles.text}>{item.happiness}</Text>
                            </View>
                            <View className="items-center"> 
                                <MaterialCommunityIcons name="sleep" size={20} color={'#fff'}/>
                                <Text style={styles.text}>{item.sleep}</Text>
                            </View>
                        </View>
                </Pressable>
            )}
            contentContainerStyle={styles.list}/>
        </View>
    )
}

const styles = StyleSheet.create({
    containerList:{
        flex: 1,
        padding: 4,
    },
    list:{
        gap: 8,
        flexDirection: 'row',
        justifyContent:'center',
        flexWrap: 'wrap'
    },
    item:{
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor:'#e2e8f0',
        padding: 20,
        paddingBottom:25,
        width:197,
        maxHeight: 350,
        position: 'relative'
    },
    itemImage:{
        width: '100%',
        height: '70%'
    },
    trashIcon:{
        position: 'absolute',
        left: 166,
        bottom: 319
    },
    text:{
        fontWeight: 'bold',
        color: '#fff'
    }
})