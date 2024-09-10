import React from 'react';
import { TextInputProps, TextInput } from 'react-native';

export default function Input({...rest}: TextInputProps ) {
  return (
    <TextInput style={{
      height: 54,
      borderWidth: 1,
      borderRadius: 7,
      borderColor: '#999',
      paddingHorizontal: 16,
    }}
    {...rest}/>
  );
}