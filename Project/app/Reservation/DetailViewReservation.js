import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, AsyncStorage, processColor, Alert, Picker, Item} from 'react-native';
import {Bar} from 'react-native-pathjs-charts'

export class DetailViewReservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.navigation.state.params.reservation.title,
            author: this.props.navigation.state.params.reservation.author,
            estimatedArrivalTime: this.props.navigation.state.params.reservation.estimatedArrivalTime,
            nr:1,
            data: [[{"nrReservations": "4", "author": "a1"}, {"nrReservations": "6", "author":"author2"}]]
        };
        AsyncStorage.getAllKeys().then((keys) => {
            lst = [];
            for (k in keys) {
                AsyncStorage.getItem(keys[k]).then((rv) => {
                    reservation = JSON.parse(rv);
                    lst.push([{type: reservation.title, author: reservation.author}])
                    this.setState({data: lst})
                });
            }
        });
    }

    render() {
        AsyncStorage.getAllKeys().then((keys) => {
            for (k in keys) {
                AsyncStorage.getItem(keys[k]).then((rv) => {
                    this.state.nr+=1
                });
            }
        });
        let d=[[{"nrReservations":this.state.nr,"allReservations":"Number of all your reservations"}]]
        opts = {
            width: 300,
            height: 100,
            margin: {
                top: 20,
                left: 25,
                bottom: 50,
                right: 20
            },
            color: '#2980B9',
            gutter: 20,
            animate: {
                type: 'oneByOne',
                duration: 200,
                fillTransition: 3
            },
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#34495E',
                    rotate: 45
                }
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#34495E'
                }
            }
        };
        return (
            <View>
                <Text>{this.props.navigation.state.params.reservation.title}</Text>
                <TextInput value={this.state.author} onChangeText={(author) => this.setState({author})}/>
                <Picker selectedValue={this.state.estimatedArrivalTime}
                        onValueChange={(value)=>this.setState({estimatedArrivalTime:value})}>
                    <Item value={"Before 14:00"} label={"Before 14:00"}></Item>
                    <Item value={"After 14:00"} label={"After 14:00"}></Item>
                </Picker>
                <Button title="DELETE" color='#660000' onPress={() => {
                    AsyncStorage.removeItem(this.props.navigation.state.params.reservation.title).then(() => {
                        this.props.navigation.state.params.stateModified();
                        this.props.navigation.goBack();
                    });
                }
                }
                />
                <Button title="SAVE CHANGES" onPress={() => {
                    AsyncStorage.mergeItem(this.props.navigation.state.params.reservation.title, JSON.stringify({
                            author: this.state.author,
                            estimatedArrivalTime: this.state.estimatedArrivalTime
                        })
                    ).then(() => {
                        this.props.navigation.state.params.stateModified();
                        this.props.navigation.goBack();
                    })
                }
                }/>
                <Bar
                    data={d} options={opts} accessorKey="nrReservations"
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
        justifyContent: 'space-between',
    },
    chart: {
        flex: 1
    }
});