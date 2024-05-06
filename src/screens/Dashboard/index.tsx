import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {} from 'react-native-gesture-handler';
import AppButton from '../../components/AppButton';

const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <View style={{justifyContent: 'center', flex: 1, paddingHorizontal: 20}}>
      <AppButton
        text={'Navigate To Call'}
        onPress={() => navigation.navigate('Call' as never)}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
