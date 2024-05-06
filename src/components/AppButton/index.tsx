import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

interface AppButtonProps {
  text: String;
  onPress: () => void;
}

const AppButton = ({text, onPress}: AppButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#038cfc',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 8,
      }}
      onPress={() => onPress?.()}>
      <Text style={{color: 'white'}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({});
