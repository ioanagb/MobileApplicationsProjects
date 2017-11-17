import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList,TouchableOpacity, Linking} from 'react-native';
import {StackNavigator} from 'react-navigation';
//import BackgroundColor from 'react-native-background-color';

class Reservation {
    copyId: string;
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
            <View style={{backgroundColor:'beige'}}>
              <Text>Welcome, dear Reader!</Text>
              <Button
                  onPress={() => navigate('MakeReservation')}
                  title="Make new reservation"
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
        this.reservations.push({r: new Reservation().withCopyId('1').withAuthor('Ion Creanga').withTitle('Amintiri din copilarie')});
        this.reservations.push({r: new Reservation().withCopyId('2').withAuthor('Mihai Eminescu').withTitle('Poezii')});
        this.reservations.push({r: new Reservation().withCopyId('3').withAuthor('author').withTitle('title')});
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
                      keyExtractor={item => item.copyId}
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
        this.state = {copyId:'CopyId: ', title: 'Title: ', author: 'Author: '}
    }
    prepareBody(){
        let res = "Your reservation with the following details is registered: \n";
        res += this.state.copyId + "\n";
        res += this.state.title + "\n";
        res += this.state.author + "\n";
        return res;
    }
    render() {
        return (
            <View>
              <Text style={{height:20}}>
                Copy Id:
              </Text>
              <TextInput
                  style={{height: 40, borderColor: 'brown', borderWidth: 1}}
                  onChangeText={(text) => this.setState({copyId: text})}
                  value={this.state.copyId}
              />
              <Text style={{height:20}}>
                Title:
              </Text>
              <TextInput
                  style={{height: 40, borderColor: 'brown', borderWidth: 1}}
                  onChangeText={(text) => this.setState({title: text})}
                  value={this.state.title}
              />
              <Text style={{height:20}}>
                Author:
              </Text>
              <TextInput
                  style={{height: 40, borderColor: 'brown', borderWidth: 1}}
                  onChangeText={(text) => this.setState({author: text})}
                  value={this.state.author}
              />

              <Button
                  raised
                  icon={{name: 'check'}}
                  title='Make Reservation'
                  //onPress={() => this.submit()} />
                  onPress={()=> Linking.openURL(`mailto:ioana_gb@yahoo.com?subject=New Reservation&body=${this.prepareBody()}`)}
              />
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
              <Text style={{height:20}}>
                Copy Id:
              </Text>
              <TextInput
                  style={{height: 40, borderColor: 'brown', borderWidth: 1}}
                  onChangeText={(text) => this.setState({copyId: text})}
                  value={this.state.copyId}
              />
              <Text style={{height:20}}>
                Title:
              </Text>
              <TextInput
                  style={{height: 40, borderColor: 'brown', borderWidth: 1}}
                  onChangeText={(text) => this.setState({title: text})}
                  value={this.state.title}
              />
              <Text style={{height:20}}>
                Author:
              </Text>
              <TextInput
                  style={{height: 40, borderColor: 'brown', borderWidth: 1}}
                  onChangeText={(text) => this.setState({author: text})}
                  value={this.state.author}
              />
            </View>
        );
    }
}

const Application = StackNavigator({
    Home: { screen: HomeScreen },
    MakeReservation: { screen: MakeReservationScreen },
    ListReservations: { screen: ListReservationsScreen},
    ReservationDetails: { screen: ReservationDetailsScreen},
});

export default class App extends React.Component {
    //componentWillMount(){
    //    BackgroundColor.setColor('beige');
    //}
    render() {
        return <Application />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'beige',
        alignItems: 'center',
    },
    listitm: {
        padding: 10,
        marginTop: 3,
        backgroundColor: 'burlywood',
        alignItems: 'center',
    }
});


