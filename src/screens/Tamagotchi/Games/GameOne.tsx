import { Text, View, StyleSheet, Button, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../components/ThemeProvider';
import { typeTamagotchi } from '@/types/tamagotchiType';
import { useRoute } from '@react-navigation/native';
import { getRealm } from '../../../db/realm';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

type Emote = {
  value: number;
  item: string;
};

export default function GameOne() {
  const emotes: Emote[] = [
    { value: 1, item: '👊' },
    { value: 2, item: '🖐' },
    { value: 3, item: '✌' },
  ];

  const route = useRoute()

  const navigation = useNavigation()

  const {tamagotchi} = route.params as {tamagotchi: typeTamagotchi}

  const [myEmote, setMyEmote] = useState<Emote | null>(null);
  const [enemyEmote, setEnemyEmote] = useState<Emote | null>(null);
  const [gameInProgress, setGameInProgress] = useState(false);

  const [result, setResult] = useState('')
  const [happy, setHappy] = useState(tamagotchi?.happiness)

  const {themeColor} = useTheme()

  const getRandomEmote = (): Emote => {
    let randomIndex = Math.floor(Math.random() * emotes.length);
    return emotes[randomIndex];
  };

  const handleSetEmote = (emote: Emote) => {
    if (!gameInProgress) {
      setMyEmote(emote);
    }
  };

  const startGame = (id : string | undefined) => {
    if (!myEmote) {
      Alert.alert('Você não selecionou sua jogada...');
      return;
    }

    setGameInProgress(true);

    const intervalId = setInterval(() => {
      setEnemyEmote(getRandomEmote());
    }, 80);

    setTimeout(() => {
      clearInterval(intervalId)
      const finalEmote = getRandomEmote();
      setEnemyEmote(finalEmote);

      if (myEmote.value === finalEmote.value) {
        setResult("Empate!")
      } else if (
        (myEmote.value === 1 && finalEmote.value === 3) ||
        (myEmote.value === 2 && finalEmote.value === 1) ||
        (myEmote.value === 3 && finalEmote.value === 2)
      ) {
        setResult("Você venceu!")
      } else {
        setResult('Você perdeu!');
      }

      updateHappy(id)
      setTimeout(()=>{
        setEnemyEmote(null);
        setMyEmote(null);
        setGameInProgress(false)
        setResult('')
      }, 3000)
    }, 3000);
  };

  const updateHappy = async(id : string | undefined)=>{
    try {
      const realm = await getRealm()
      realm.write(()=>{
        const tamagot = realm.objectForPrimaryKey<typeTamagotchi>("Tamagotchi", id)

        if(tamagot){
          let newHappiness = tamagot.happiness + 10

          if(newHappiness > 100){
            newHappiness = 100
          }

          tamagot.happiness = newHappiness
          setHappy(newHappiness)
        }
      })

    } 
    catch(error) {
      console.log(error)  
    }
  }

  useEffect(()=>{

  },[updateHappy])

  return (
    <View style={[styles.container, {backgroundColor: themeColor}]}>

      <View style={{width: '100%', height: 28, justifyContent:'center', alignItems: 'flex-start'}} className="mt-2 ml-2">
        <Pressable onPress={()=>{navigation.goBack()}}>
            <Feather name="arrow-left" size={28} color={'#fff'}/>
        </Pressable>   
        </View>

      <View className='items-center mt-8'>
        <MaterialCommunityIcons name="emoticon-happy-outline" size={45} color={'#fff'}/>
        <Text className='font-bold text-2xl text-white'>{happy}</Text>
      </View>

      <Text className='text-2xl font-bold mt-2 text-white'>{result}</Text>

      <View className='w-full'>
        <View className='flex-row items-center justify-center gap-5'>

        <View className='items-center gap-1 w-56'>
          <Text className='text-2xl font-bold text-white'>Você</Text>
          <View style={[styles.box]}>
            <Text style={styles.itemBox}>{myEmote === null ? '?' : myEmote.item}</Text>  
          </View>
        </View>

        <Feather name='x'
        style={{position: 'absolute', top:70}} size={44}/>

        <View className='items-center gap-1 w-56'>
        <Text className='text-xl font-bold text-white' ellipsizeMode='tail' numberOfLines={1}>{tamagotchi?.name}</Text>
          <View style={[styles.box]}>
            <Text style={styles.itemBox}>{enemyEmote === null ? '?' : enemyEmote.item}</Text>
          </View>
        </View>
      </View>
        
        
        <View style={styles.row}>
              {emotes.map((item) => (
          <Pressable style={[styles.miniBox]} onPress={() => handleSetEmote(item)} key={item.value}>
                <Text style={styles.itemBox}>{item.item}</Text>
            </Pressable>
              ))}
          </View>
        </View>

          <Pressable onPress={()=>{
            startGame(tamagotchi._id)
          }} style={[styles.button]} disabled={gameInProgress === true ? true : false}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 28, letterSpacing: 1.5}}>Jogar</Text>
          </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: 20,
  },
  box: {
    width: 150,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#ffffff55',
  },
  miniBox: {
    width: 120,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#ffffff55',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 80
    
  },
  itemBox: {
    fontSize: 50,
    color: '#fff'
  },
  button:{
    marginTop: 40,
    padding: 10,
    width: 200,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#ffffff55',
  }
});
