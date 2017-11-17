import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class MakeReservation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            copyId:'',
            title:'',
            author:''
        }
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
                    onPress={}
                    title="Make Reservation"
                    color="#841584"
                />
            </View>
        );
    }
}
