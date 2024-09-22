import React, { useState } from 'react';
import { useTheme } from '../../components/ThemeProvider';
import uuid from 'react-native-uuid';

import Input from '../../components/Input';
import { View, Button, Alert, Text, Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native';


import {getRealm} from '../../db/realm'
import { ScrollView } from 'react-native-gesture-handler';

type typeRegister = {
  id: number,
  url: string
}

export default function Register() {

  const {themeColor} = useTheme()

  const [name, setName] = useState<string>('')
  const [imageURL, setImageURL] = useState<string>('')

  const [actualID, setActualID] = useState<number>(0)
  
  const [checkedURL, setCheckedURL] = useState(false)
  const [checkedDefault, setCheckedDefault] = useState(true)

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

        Alert.alert("Caipira cadastrado.", 'Seja bem vindo '+ response.name)
      }

      else{
        Alert.alert("Preencha todos os campos!!!")
      }
    })
      
    setActualID(0)
      setName('')
      setImageURL('')
    }
    catch(error){
      console.log('error')
      Alert.alert("😔", 'Poxa, não deu bom...')
    }
  }

  const caipiras = [
    {id: 1, url: 'https://foxtrotters.tripod.com/acwby7.gif'},
    {id: 2, url: 'https://i.pinimg.com/originals/e0/27/6c/e0276c6c146a7c73b9c9e5b0c6d8f3d1.gif'},
    {id: 8, url: 'https://www.gifs-animados.net/musica/musica126.gif'},
    {id: 3, url: 'https://i.pinimg.com/originals/a0/13/2d/a0132d5f962e0349c3bad68930e32f1b.gif'},
    {id: 4, url: 'https://www.imagui.com/i/gifs-animados-ambiente-imagui-2512184.gif'} ,
    {id: 10, url: 'https://www.imagensanimadas.com/data/media/1457/carteiro-imagem-animada-0064.gif'},
    {id: 5, url: 'https://i.pinimg.com/originals/69/e3/1c/69e31c906053ba70dfb1e7dc9120b41d.gif'},
    {id: 7, url: 'https://i.pinimg.com/originals/06/31/c7/0631c795ce154e40d50ed9d8ab535893.gif'},
    {id: 6, url: 'https://campi2015.wordpress.com/wp-content/uploads/2015/10/campesino-agricultor-04.gif'},
    {id: 9, url: 'https://www.gifs-animados.net/musica/musica260.gif'},

  ]

  const theCaipira = ({id,url} : typeRegister)=>{
      setImageURL(url)
      setActualID(id)
  }

  const setUrlOption = ()=>{
    setCheckedURL(true)
    setCheckedDefault(false)
    setImageURL('')
  }

  const setDefaultOption = ()=>{
    setCheckedDefault(true)
    setCheckedURL(false)
  }

  return (
    <ScrollView>
      <View className='flex-1 gap-4 p-5'>
        <Text className='text-xl font-bold'>Registre aqui um Caipira:</Text>
        <Input placeholder='Nome' value={name} onChangeText={setName}/>
        
        <View style={{flexDirection: 'row', gap: 6}}>
            <TouchableOpacity style={styles.externalButton} onPress={setDefaultOption}>
              <View style={[styles.radioButton, checkedURL !== true ? {backgroundColor: themeColor} : {backgroundColor: '#Fff'}]}>

              </View>
            </TouchableOpacity>
            <Text>Caipiras</Text>
            <TouchableOpacity style={[styles.externalButton, {marginLeft: 9}]} onPress={setUrlOption}>
              <View style={[styles.radioButton, checkedURL === true ? {backgroundColor: themeColor} : {backgroundColor: '#Fff'}]}>

              </View>
            </TouchableOpacity>
            <Text>URL</Text>
        </View>

        {
          checkedDefault === true ? 
          <View style={styles.imageContainer}>
        {
          caipiras.map(item =>(
          <Pressable key={item.id} style={[styles.itemImage, actualID === item.id? {borderColor: themeColor} : {borderColor:'#999'}]} onPress={()=>{
            theCaipira(item)
          }}>
            <Image source={{uri: item.url}} style={{width: '100%', height: '100%', resizeMode: 'contain'}}/> 
          </Pressable>           
          ))
        }
        </View>

        :

        <Input placeholder='Insira o link da imagem ou selecione um guri abaixo' value={imageURL} onChangeText={setImageURL} />

        }
        

        <Button title='Salvar' color={themeColor} onPress={addNewTamagotchi}/>
      </View> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer:{
    flexDirection:'row',
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    gap: 5
  },
  itemImage: {
    width: 170, 
    height: 150,
    borderWidth: 3
  },
  radioButton:{
    width: 12,
    height: 12,
    borderRadius: 50
  },
  externalButton:{
    borderWidth: 2,
    width: 20,
    height: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
})