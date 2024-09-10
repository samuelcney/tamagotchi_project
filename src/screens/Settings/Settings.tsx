import { getRealm } from '../../db/realm';
import { useTheme } from '../../components/ThemeProvider';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { User } from '../../types/userInterface';

const Colors = [
    {name: 'Azul', value: '#3b82f6'},
    {name: 'Laranja', value: '#fb923c'},
    {name: 'Vermelho', value: '#ef4444'},
    {name: 'Verde', value: '#22c55e'},
    {name: 'Roxo', value: '#a855f7'},
    {name: 'Amarelo', value: '#eab308'},
    {name: 'Ciano', value: '#2dd4bf'}
]

const data = [
    {key: 1, value: "Azul"},
    {key: 2, value: "Laranja"},
    {key: 3, value: "Vermelho"},
    {key: 4, value: "Verde"},
    {key: 5, value: "Roxo"},
    {key: 6, value: "Amarelo"},
    {key: 7, value: "Ciano"}
]

export default function Settings() {

    const {setThemeColor, themeColor} = useTheme()

    const changeColor = async(value: string)=>{
        const color = Colors.find(item => item.name === value)?.value

        if(color){
            setThemeColor(color)

            const realm = await getRealm()
            const user = realm.objects<User>('User')[0]

            realm.write(()=>{
                if(user){
                    user.appColor = color
                }
                else {
                    realm.create('User',{
                        _id: 'user-id',
                        appColor: color
                    })
                }
            })
    }
}

    useEffect(()=>{
        const loadAppColor = async()=>{
            const realm = await getRealm()
            const user = realm.objects<User>('User')[0]

            if(user && user.appColor){
                setThemeColor(user.appColor)
            }
        }

        loadAppColor()
    }, [])
  return (
    <View className="flex-1 bg-or">
        
    <View className='p-3'>    
        <Text className='text-xl ml-2 mb-2 underline-offset-0'>Selecione uma cor para o seu menu:</Text>
        <SelectList 
            setSelected={changeColor}
            data={data}
            save='value'
            boxStyles={{width: 220, borderColor: themeColor, borderWidth:2, marginLeft: 10}}
            placeholder=''
            dropdownStyles={{borderColor: themeColor}}
            dropdownTextStyles={{color: themeColor, fontSize: 16}}
            inputStyles={{fontSize:16}}
        />   
    </View> 
    </View>
  );
}