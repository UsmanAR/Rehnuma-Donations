import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Components/Card';
import StackNavigator from './Navigation/StackNavigator';
import { ModalPortal } from 'react-native-modals';
import { UserContext } from './Context/UserContext';

export default function App() {
  return (
    <>
    <UserContext>


    <StackNavigator />
    <ModalPortal />
    </UserContext>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
