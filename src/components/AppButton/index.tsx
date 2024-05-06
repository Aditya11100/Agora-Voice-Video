import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';

interface AppButtonProps {
  text: String;
  onPress: () => void;
  buttonStyle?: ViewStyle;
}

const AppButton = ({text, onPress, buttonStyle}: AppButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#038cfc',
          paddingVertical: 10,
          paddingHorizontal: 25,
          borderRadius: 8,
        },
        buttonStyle,
      ]}
      onPress={() => onPress?.()}>
      <Text style={{color: 'white'}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({});
