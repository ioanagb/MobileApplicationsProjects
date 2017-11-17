import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MakeReservation from "./app/MakeReservation/MakeReservation";

export default class App extends React.Component {
  render() {
    return (
      <View >
        <Text>Cluj Public Library</Text>
        <MakeReservation/>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
