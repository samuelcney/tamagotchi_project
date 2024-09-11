import { typeTamagotchi } from "@/types/tamagotchiType";
import { useTheme } from "../../components/ThemeProvider"
import React, { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getRealm } from "../../db/realm";

export default function Room({...rest}:typeTamagotchi){

    const [sleep, setSleep] = useState(rest.sleep)
    const [sleeping, setSleeping] = useState(false)
    const {themeColor} = useTheme()

    const updateSleep = async()=>{
        try {
            const realm = await getRealm()
            realm.write(()=>{
                const tamagotchi = realm.objectForPrimaryKey<typeTamagotchi>("Tamagotchi", rest._id)

                if(tamagotchi){
                    setSleep(tamagotchi.sleep)
                    sleepingLoading(tamagotchi.sleep)
                }

                else{
                    console.log("Tamagotchi não encontrado")
                }
            })
        }
        catch(error) {
            console.log(error)
        }
    }

    const sleepingLoading = async(currentSleep: number) => {
        setSleeping(true);

        const intervalId = setInterval(async () => {
            if (currentSleep < 100) {
                currentSleep += 1;
                setSleep(currentSleep);

                try {
                    const realm = await getRealm();
                    realm.write(() => {
                        const tamagotchi = realm.objectForPrimaryKey<typeTamagotchi>("Tamagotchi", rest._id);
                        if (tamagotchi) {
                            tamagotchi.sleep = currentSleep;
                        }
                    });
                } catch (error) {
                    console.log(error);
                }

            } else {
                clearInterval(intervalId);
                setSleeping(false);
            }
        }, 150); 
    };

    return(
        <View className='flex-1 items-center justify-between'
        style={{backgroundColor: themeColor}}>
            <View className="items-center mb-20 mt-10">
                <MaterialCommunityIcons name="sleep" size={50} color={'#fff'}/>
                <Text className="font-bold text-xl text-white">{sleep}</Text>
            </View>

            <View className=" justify-center items-center mb-16">

            <Image source={{uri: 'https://i.pinimg.com/originals/d6/09/13/d60913c58c5f25dbb7b517e6d4c78413.png'}} style={{width: 350, height: 350, position: 'absolute'}}/>

            <Image source={{uri: rest.imageURL}} width={200} height={200} className="mb-24"/>
            </View>  

            <View>
                <Pressable style={{width: 160, height: 60, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderRadius: 12, borderColor: '#fff', marginBottom: 30}} onPress={updateSleep}>
                    <Text className="font-bold text-xl text-white">Dormir</Text>
                </Pressable>
            </View>

            {
                <View style={!sleeping ? {display: 'none' } : {position: 'absolute', width: '100%', height: "100%", backgroundColor: '#11111199', alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={{uri: 'https://media.baamboozle.com/uploads/images/417119/1628763057_9171_gif-url.gif'}} width={300} height={500}/>
                </View>
            }
        </View>
    )
}