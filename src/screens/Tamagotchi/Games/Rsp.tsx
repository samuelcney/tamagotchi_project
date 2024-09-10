import { Text, View, StyleSheet, Button, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';

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

  const alertGame = (message: string) => {
    Alert.alert(message, '', [
      {
        onPress: () => {
          setEnemyEmote(null);
          setMyEmote(null);
          setGameInProgress(false);
        },
        text: 'OK',
      },
    ]);
  };

  const [myEmote, setMyEmote] = useState<Emote | null>(null);
  const [enemyEmote, setEnemyEmote] = useState<Emote | null>(null);
  const [gameInProgress, setGameInProgress] = useState(false);

  const getRandomEmote = (): Emote => {
    let randomIndex = Math.floor(Math.random() * emotes.length);
    return emotes[randomIndex];
  };

  const handleSetEmote = (emote: Emote) => {
    if (!gameInProgress) {
      setMyEmote(emote);
    }
  };

  const startGame = () => {
    if (!myEmote) {
      Alert.alert('Você não selecionou sua jogada...');
      return;
    }

    setGameInProgress(true);

    const intervalId = setInterval(() => {
      setEnemyEmote(getRandomEmote());
    }, 50);

    setTimeout(() => {
      clearInterval(intervalId);

      const finalEmote = getRandomEmote();
      setEnemyEmote(finalEmote);

      if (myEmote.value === finalEmote.value) {
        alertGame('Empate!');
      } else if (
        (myEmote.value === 1 && finalEmote.value === 3) ||
        (myEmote.value === 2 && finalEmote.value === 1) ||
        (myEmote.value === 3 && finalEmote.value === 2)
      ) {
        alertGame('Você venceu!');
      } else {
        alertGame('Você perdeu!');
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.box}>
          <Text style={styles.itemBox}>{enemyEmote === null ? '???' : enemyEmote.item}</Text>
        </View>
      </View>

      <View style={styles.playerContainer}>
        <View style={styles.box}>
          <Text style={styles.itemBox}>{myEmote === null ? '???' : myEmote.item}</Text>
        </View>

        <View style={styles.row}>
          {emotes.map((item) => (
            <Pressable style={styles.miniBox} onPress={() => handleSetEmote(item)} key={item.value}>
              <Text style={styles.itemBox}>{item.item}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Button title="Jogar" onPress={startGame} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
  box: {
    width: 140,
    height: 130,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniBox: {
    width: 120,
    height: 100,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  playerContainer: {
    alignItems: 'center',
    gap: 20,
    padding: 5,
  },
  itemBox: {
    fontSize: 40,
  },
});
