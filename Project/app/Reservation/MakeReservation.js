import React from 'react';
import {AsyncStorage, StyleSheet, Text, View, TextInput, Button, FlatList, Picker, Item} from 'react-native';
import {StackNavigator} from 'react-navigation';

export class MakeReservation extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            copyId: '',
            title: '',
            author: '',
            estimatedArrivalTime: ''
        }
    }
    render() {
        return (
            <View>
                <TextInput placeholder="Title" onChangeText={(title) => this.setState({title})}></TextInput>
                <TextInput placeholder="Author" onChangeText={(author) => this.setState({author})}/>
                <Picker selectedValue={this.state.estimatedArrivalTime}
                        onValueChange={(value)=>this.setState({estimatedArrivalTime:value})}>
                    <Item value={"Before 14:00"} label={"Before 14:00"}></Item>
                    <Item value={"After 14:00"} label={"After 14:00"}></Item>
                </Picker>
                <Button title="ADD" onPress={() => {
                    AsyncStorage.setItem(this.state.title, JSON.stringify({
                        title: this.state.title,
                        author: this.state.author,
                        estimatedArrivalTime: this.state.estimatedArrivalTime,
                    })).then(() => {
                        this.props.navigation.state.params.stateModified();
                        this.props.navigation.goBack();
                    });
                }}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});