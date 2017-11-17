/*import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import {StackNavigator} from 'react-navigation';
const sendMail = require('react-native-send-intent');

class Reservation {
    copyId: number;
    title: string;
    author: string;
    constructor(){}
    withCopyId(copyId){
        this.copyId = copyId;
        return this;
    }
    withTitle(title){
        this.title = title;
        return this;
    }
    withAuthor(author){
        this.author = author;
        return this;
    }
}


class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Cluj Public Library',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>Welcome, dear Reader!</Text>
                <Button
                    onPress={() => navigate('MakeReservation')}
                    title="Make new book"
                />
                <Button
                    onPress={() => navigate('ListReservations')}
                    title="List Reservations"
                />
            </View>
        );
    }
}

class ListReservationsScreen extends React.Component {

    static navigationOptions = {
        title: 'List of Reservations',
    };
    constructor(props){
        super(props);
        this.reservations = [];
        this.reservations.push({r: new Reservation().withCopyId(1).withAuthor('Ion Creanga').withTitle('Amintiri din copilarie')});
        this.reservations.push({r: new Reservation().withCopyId(2).withAuthor('Mihai Eminescu').withTitle('Poezii')});
        this.reservations.push({r: new Reservation().withCopyId(3).withAuthor('author').withTitle('title')});
    }

    goToDetails(reservation){
        const { navigate } = this.props.navigation;
        navigate('ReservationDetails',{reservation: reservation});
    }

    render(){
        return (
            <View>
                {
                    <FlatList
                        data={this.reservations}
                        renderItem={({item}) =>
                            <TouchableOpacity
                                style={styles.listitm}
                                onPress={() => this.goToDetails(item.r)}
                            >
                                <Text>{item.r.title}</Text>
                            </TouchableOpacity>
                        }
                    />
                }
            </View>
        );
    }
}

class MakeReservationScreen extends React.Component {
    static navigationOptions = {
        title: 'Make new reservation',
    };
    constructor(props){
        super(props);
        this.state = {copyId:'CopyId', title: 'Title', author: 'Author'}
    }

    submit(){
        sendMail.sendMail("ioana_gb@yahoo.com", "New Reservation!", this.prepareBody());
    }

    prepareBody(){
        let res = "Your reservation with the following details is registered: \n";
        res += "Copy Id: " + this.state.copyId + "\n";
        res += "Title: " + this.state.title + "\n";
        res += "Author: " + this.state.author + "\n";
        return res;
    }

    render() {
        return (
            <View>
                <Text>
                    Copy Id:
                </Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({copyId: text})}
                    value={this.state.copyId}
                />
                <Text>
                    Title:
                </Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({title: text})}
                    value={this.state.title}
                />
                <Text>
                    Author:
                </Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({author: text})}
                    value={this.state.author}
                />

                <Button
                    raised
                    icon={{name: 'check'}}
                    title='SUBMIT'
                    onPress={() => this.submit()} />

            </View>
        );
    }
}

class ReservationDetailsScreen extends React.Component {

    static navigationOptions ={
        title: 'Details',
    };

    constructor(props){
        super(props);
        reservationTmp = props.navigation.state.params.reservation;
        this.state = {copyId: reservationTmp.copyId, title: reservationTmp.title, author: reservationTmp.author};
    }

    render() {
        return(
            <View>
                <Text>
                    Copy Id:
                </Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({copyId: text})}
                    value={this.state.copyId}
                />
                <Text>
                    Title:
                </Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({title: text})}
                    value={this.state.title}
                />
                <Text>
                    Author:
                </Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({author: text})}
                    value={this.state.author}
                />
            </View>
        );
    }
}

const SimpleApp = StackNavigator({
    Home: { screen: HomeScreen },
    MakeReservation: { screen: MakeReservationScreen },
    ListReservations: { screen: ListReservationsScreen},
    ReservationDetails: { screen: ReservationDetailsScreen},
});

export default class App extends React.Component {
    render() {
        return <SimpleApp />;
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




















export default class MakeReservation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            copyId:'',
            title:'',
            author:''
        }
    }

    onPress(){
        sendMail.sendMail("ioana_gb@yahoo.com", "New Reservation!", this.state);
    }

    render() {
        return (
            <View>
                <Text>Make reservation.</Text>
                <TextInput placeholder = "CopyId"
                           onChange={(event) => this.setState({copyId: event.nativeEvent.txt})}
                           value={this.state.copyId}/>
                <TextInput placeholder = "Title"
                           onChange={(event) => this.setState({title: event.nativeEvent.txt})}
                           value={this.state.title}/>
                <TextInput placeholder = "Author"
                           onChange={(event) => this.setState({author: event.nativeEvent.txt})}
                           value={this.state.author}/>
                <Button
                    onPress={() => this.onPress()}
                    title="Make Reservation"
                    color="#841584"
                />
            </View>
        );
    }
}
*/