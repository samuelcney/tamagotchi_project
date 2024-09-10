import React, { useState } from 'react';
import { useTheme } from '../../components/ThemeProvider';
import uuid from 'react-native-uuid';

import Input from '../../components/Input';
import { View, Button, Alert, Text } from 'react-native';

import {getRealm} from '../../db/realm'
import { ScrollView } from 'react-native-gesture-handler';

export default function Register() {

  const {themeColor} = useTheme()

  const [name, setName] = useState<string>('')
  const [imageURL, setImageURL] = useState<string>('')

  async function addNewTamagotchi(){
    const realm = await getRealm()

    try {      
      realm.write(()=>{

        if(name !== '' && imageURL !== ''){
          const response = realm.create("Tamagotchi", {
          _id: uuid.v4(),
          name: name,
          imageURL: imageURL,
          hungry: 100,
          happiness: 100,
          sleep: 100,
          status: "Muito bem"
        })

        Alert.alert("Guri cadastrado.", 'Seja bem vindo '+ response.name)
      }

      else{
        Alert.alert("Preencha todos os campos!!!")
        return
      }
    })
      
      setName('')
      setImageURL('')
    }
    catch(error){
      console.log('error')
      Alert.alert("😔", 'Poxa, não deu bom...')
    }
  }


  return (
    <ScrollView>
      <View className='flex-1 gap-4 mt-24 p-7'>
        <Text className='text-xl font-bold'>Registre aqui seu Guri:</Text>
        <Input placeholder='Nome para o cupincha' value={name} onChangeText={setName}/>
        <Input placeholder='Insira o link da imagem' value={imageURL} onChangeText={setImageURL}/>
        <Button title='Salvar' color={themeColor} onPress={addNewTamagotchi}/>
      </View> 
    </ScrollView>
  );
}