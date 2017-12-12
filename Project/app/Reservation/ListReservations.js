import React from 'react';
import {StyleSheet, Text, View, TextInput, ListView, TouchableHighlight, TouchableOpacity, Button, AsyncStorage} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {DetailViewReservation} from './DetailViewReservation';

export class ListReservations extends React.Component {
    constructor() {
        super();
        this.state = {
            ds: global.ds.cloneWithRows([])
        }
        AsyncStorage.getAllKeys().then((keys) => {
            lst = [];
            for (k in keys) {
                AsyncStorage.getItem(keys[k]).then((reservation) => {
                    lst.push(JSON.parse(reservation));
                    this.setState({ds: global.ds.cloneWithRows(lst)});
                });
            }
        });
    }
    stateModified() {
        AsyncStorage.getAllKeys().then((keys) => {
            lst = [];
            for (k in keys) {
                AsyncStorage.getItem(keys[k]).then((reservation) => {
                    lst.push(JSON.parse(reservation));
                    this.setState({ds: global.ds.cloneWithRows(lst)});
                })
            }
        });
    }
    renderRow(rv) {
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailViewReservation', {
                    reservation: rv,
                    stateModified: this.stateModified.bind(this)
                })}>
                    <View style={{flexDirection: 'row', padding: 10}}>
                        <View stle={{flex: 1}}>
                            <Text>{rv.title}</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{textAlign: 'center'}}>{rv.author}</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{textAlign: 'right'}}>{rv.estimatedArrivalTime}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    render() {
        return (
            <View>
                <ListView
                    dataSource={this.state.ds}
                    renderRow={this.renderRow.bind(this)}
                />
                <Button title="ADD"
                        onPress={() => this.props.navigation.navigate('MakeReservation',
                            {stateModified: this.stateModified.bind(this)})}/>
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