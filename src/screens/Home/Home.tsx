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
    const [loading, setLoading] = useState(false)
    const [imageError, setImageError] = useState(false)

    const navigation = useNavigation<any>()

    const getTamagotchis = useCallback(async()=>{

        setLoading(true)
        const realm = await getRealm()
        try{
            const response = realm.objects<typeTamagotchi>("Tamagotchi")
            const ArrayResponse = Array.from(response)
            setTamagotchis(ArrayResponse)

            if(ArrayResponse.length === 0){
               setLoading(true)  
            }
            else{
                setLoading(false)
            }
               
        }
        catch(error){
            setLoading(false)
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
                    const updatedTamagotchis = tamagotchis.filter(item => item._id !== id);
                    realm.delete(toRemove);
                    setTamagotchis(updatedTamagotchis);
                    
                }
            })           
        }
        catch(error) {
            console.log(error)
        }  
        
    }

    function handleNavigate(tamagotchi: typeTamagotchi){
        navigation.navigate('secondScreen', {tamagotchi})
    }

    useEffect(() => {
        const loadTamagotchis = async () => {
            const realm = await getRealm();
            const tamagotchis = realm.objects<typeTamagotchi>("Tamagotchi");

            const listener = () => {
                const currentTamagotchis = Array.from(tamagotchis).filter(item => item.isValid());
                setTamagotchis(currentTamagotchis);
            };

            tamagotchis.addListener(listener);

            return () => {
                if (tamagotchis && tamagotchis.removeListener) {
                    tamagotchis.removeListener(listener);
                }
            }}

        loadTamagotchis();
    }, []);

    if(loading){
        return <View style={[{backgroundColor: themeColor, alignItems: 'center'}, styles.containerList]}>
            <View style={{width: '100%', height: 20, justifyContent:'center', alignItems: 'flex-end'}} className="mb-3">
            <Pressable onPress={getTamagotchis}>
                <Feather name="refresh-cw" size={22} color={'#fff'}/>
            </Pressable>    
        </View>
                    <Text className="text-xl">Não há caipiras cadastrados...</Text>
                </View>
    }

    return(
        <View style={[{backgroundColor: themeColor}, styles.containerList]}>

        <View style={{width: '100%', height: 20, justifyContent:'center', alignItems: 'flex-end', marginBottom:10}}>
            <Pressable onPress={getTamagotchis}>
                <Feather name="refresh-cw" size={22} color={'#fff'}/>
            </Pressable>    
        </View>
        
        <FlatList
            key={'_'}
            numColumns={2}

            data={tamagotchis}
            keyExtractor={(item)=> item._id}
            renderItem={({item})=>(

                <Pressable style={[styles.item]} onPress={()=> handleNavigate(item)} key={item._id} disabled={item.status === "Morto" ? true : false}>

                    <Image source={{uri: 'https://static.vecteezy.com/system/resources/thumbnails/017/178/409/small/red-cross-check-mark-on-transparent-background-free-png.png'}} style={item.status === "Morto" ? {position: 'absolute', width: '100%', height: "100%", alignItems: 'center', justifyContent: 'center', zIndex: 1, resizeMode: 'contain'} : {display:'none'}}/>

                    <Feather color={'#fff'} size={24} name="trash-2" style ={styles.trashIcon} onPress={()=>alertRemove(item._id)}/>

                     <View className="items-center">
                        <Text className="font-bold text-2xl color-slate-200 mb-2 mt-7"
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        >{item.name}
                        </Text>
                        
                        <Text className="font-semibold">"{item.status}"</Text>
                    </View>
                    
                    <Image source={{uri: !item.imageURL ? 'https://www.imagui.com/i/gifs-animados-ambiente-imagui-2512184.gif' : item.imageURL}}
                        style={styles.itemImage}
                        onError={()=>setImageError(true)}
                        resizeMode="contain"
                    />
                    

                    <View className="flex-row w-full items-center justify-between">
                            <View className="items-center">
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
        padding:5
    },
    list:{
        gap: 10,
        justifyContent:'center',
        alignItems: 'center',
    },
    item:{
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor:'#e2e8f0',
        padding: 25,
        width: 186,
        maxHeight: 350,
        position: 'relative',
        marginHorizontal: 4
    },
    itemImage:{
        width: '100%',
        height: '70%',
        aspectRatio: 0.7
        
    },
    trashIcon:{
        position: 'absolute',
        left: 156,
        bottom: 319
    },
    text:{
        fontWeight: 'bold',
        color: '#fff'
    }
})