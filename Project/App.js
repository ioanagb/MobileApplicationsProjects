import {AppRegistry, ListView, StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert} from 'react-native';
import * as React from "react/cjs/react.production.min";
import {ListReservations} from "./app/Reservation/ListReservations";
import {DetailViewReservation} from "./app/Reservation/DetailViewReservation";
import {MakeReservation} from "./app/Reservation/MakeReservation";
import {StackNavigator} from "react-navigation";

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Library',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>Choose:</Text>
                <Button
                    onPress={() => navigate('ListReservations')}
                    title="List current reservations"
                />
            </View>
        );
    }
}

const SimpleApp = StackNavigator({
    Home: {screen: HomeScreen},
    DetailViewReservation: {screen: DetailViewReservation},
    ListReservations: {screen: ListReservations},
    MakeReservation: {screen: MakeReservation},
});

global.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class App extends React.Component {
    render() {
        return <SimpleApp/>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    listitm: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#d9f9b1',
        alignItems: 'center',
    }
});