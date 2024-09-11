import { Text, View, StyleSheet, Button, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../components/ThemeProvider';
import { typeTamagotchi } from '@/types/tamagotchiType';
import { useRoute } from '@react-navigation/native';
import { getRealm } from '../../../db/realm';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
    <View style={styles.container}>

      <View className='items-center mt-8'>
        <MaterialCommunityIcons name="sleep" size={45} color={themeColor}/>
        <Text className='font-bold text-2xl'>{happy}</Text>
      </View>

      <Text className='text-2xl font-bold mt-2'>{result}</Text>

      <View>
        <View className='flex-row items-center justify-center gap-5'>

        <View className='items-center gap-1'>
          <Text className='text-2xl font-bold'>Você</Text>
          <View style={[styles.box, {backgroundColor: themeColor}]}>
            <Text style={styles.itemBox}>{myEmote === null ? '???' : myEmote.item}</Text>  
          </View>
        </View>
        
        <View className='items-center gap-1'>
        <Text className='text-xl font-bold'>{tamagotchi?.name}</Text>
          <View style={[styles.box, {backgroundColor: themeColor}]}>
            <Text style={styles.itemBox}>{enemyEmote === null ? '???' : enemyEmote.item}</Text>
          </View>
        </View>
      </View>
        
        
        <View style={styles.row}>
              {emotes.map((item) => (
          <Pressable style={[styles.miniBox, {backgroundColor:themeColor}]} onPress={() => handleSetEmote(item)} key={item.value}>
                <Text style={styles.itemBox}>{item.item}</Text>
            </Pressable>
              ))}
          </View>
        </View>

          <Pressable onPress={()=>{
            startGame(tamagotchi._id)
          }} style={[styles.button, {backgroundColor: themeColor}]} disabled={gameInProgress === true ? true : false}>
            <Text className='font-bold text-2xl text-white'>Jogar</Text>
          </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: 30,
  },
  box: {
    width: 180,
    height: 170,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderColor: '#999'
  },
  miniBox: {
    width: 130,
    height: 110,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderColor: '#999'
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 30
  },
  itemBox: {
    fontSize: 50,
    color: '#fff'
  },
  button:{
    marginTop: 10,
    borderWidth: 2,
    padding: 10,
    width: 150,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderColor: '#999'
  }
});
