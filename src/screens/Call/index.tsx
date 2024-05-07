import {
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  ChannelProfileType,
} from 'react-native-agora';
import {SafeAreaView} from 'react-native-safe-area-context';

// Channel Name --> Temp Channel
// Token --> 007eJxTYMi8HVq5hJnpkOyf+ayPX5seCzneNav+0F7rmesMUrcVeuYoMKSlGpqamFoYWKQmJ5tYJFpamJmYWhqYJlumWqYZpSZZLuyySGsIZGQ4q9vPysgAgSA+D0NIam6BgnNGYl5eag4DAwCCdyKg

// Another name and token
// New Channel
// 007eJxTYKju3lDpvnvt5Zd3YmWv1iRx+npJq0b1TGKa0q/o1V6su1+BIS3V0NTE1MLAIjU52cQi0dLCzMTU0sA02TLVMs0oNclSstsirSGQkYEhcjcrIwMEgvjcDH6p5QrOGYl5eak5DAwAthAfdQ==

const appId = 'fe1545808ecc48a98645905c9e9f2eb9';
const channelName = 'Temp Channel';
const token =
  '007eJxTYMi8HVq5hJnpkOyf+ayPX5seCzneNav+0F7rmesMUrcVeuYoMKSlGpqamFoYWKQmJ5tYJFpamJmYWhqYJlumWqYZpSZZLuyySGsIZGQ4q9vPysgAgSA+D0NIam6BgnNGYl5eag4DAwCCdyKg';
const uid = Math.floor(Math.random() * 900) + 100;

const Call = () => {
  const engine = useRef(createAgoraRtcEngine());
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState('');

  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  const initialize = () => {
    try {
      getPermission();
      engine.current.initialize({appId: appId});
      engine.current.registerEventHandler({
        onJoinChannelSuccess: () => {
          console.log('Successfully joined the channel ' + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          console.log('Remote user joined with uid ' + Uid);
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          console.log('Remote user left the channel. uid: ' + Uid);
          setRemoteUid(0);
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const join = async () => {
    if (isJoined) {
      return;
    }
    try {
      engine.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication,
      );
      engine.current?.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
      engine.current?.enableAudio();
      console.log('You joined the channel');
    } catch (e) {
      console.log(e);
    }
  };

  const leave = () => {
    try {
      engine.current?.leaveChannel();
      engine.current?.disableAudio();
      setRemoteUid(0);
      setIsJoined(false);
      console.log('You left the channel');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.head}>Agora Video Calling Quickstart</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={join}>
          <Text style={styles.button}>Join</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={leave}>
          <Text style={styles.button}>Leave</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}>
        {isJoined ? (
          <Text>Local user uid: {uid}</Text>
        ) : (
          <Text>Join a channel</Text>
        )}
        {isJoined && remoteUid !== 0 ? (
          <Text>Remote user uid: {remoteUid}</Text>
        ) : (
          <Text>Waiting for a remote user to join</Text>
        )}
        <Text>{message}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Call;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: {flex: 1, alignItems: 'center'},
  scroll: {flex: 1, backgroundColor: '#ddeeff', width: '100%'},
  scrollContainer: {alignItems: 'center'},
  videoView: {width: '90%', height: 200},
  btnContainer: {flexDirection: 'row', justifyContent: 'center'},
  head: {fontSize: 20},
});
