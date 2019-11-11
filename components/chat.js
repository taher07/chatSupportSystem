import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, View, FlatList, Dimensions, TouchableWithoutFeedback, Keyboard, Platform, SafeAreaView} from 'react-native';
import user from './user'
import bot from './bot'
import {Input, Item, Button} from 'native-base'
import * as firebase from 'firebase'

let {height,width} = Dimensions.get('window');
let key = 0;
export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    sender: bot,
                    text: 'Hey there, how may I help you?',
                    sentAt: Date.now()
                }
            ],
            text: '',
            time: '',
            name: '',
            key: 0
        }
    }
    static navigationOptions = ({navigation}) => ({
        title: "Chat Room",
        headerStyle: {
            backgroundColor: "#dc143c"
        },
        headerTintColor: "#fff"
    });
    componentWillMount() {
        firebase.database().ref('messages').on('child_added',val => {
            let user = val.val();
            this.setState(prevState => {
                return {
                    data: [...prevState.data,user]
                }
            })
        })
    }
    componentWillUnmount() {
        firebase.database().ref('messages').off();
    }
    sendMessage = async () => {
        if(this.state.text.length > 0) {
            let msgId = firebase.database().ref('messages').push().key;
            let message = {
                id: msgId,
                sender: user,
                text: this.state.text,
                sentAt: Date(Date.now())
            }
            let updates = {}

            this.setState({
                data: [...this.state.data,message],
            })
            updates['messages/' + msgId] = message
            firebase.database().ref().update(updates).then(() => {
                this.evaluateMessage()
                this.setState({text: ''})
            }).then(err => console.log(err))
        } else {
            alert('Please write a message')
        }
    }
    evaluateMessage = () => {
        let sorry = new RegExp('issue*|problem*|unfortunate*|disrupt*|distort*|damage*|warp*|shatter*|sever*|cleave*|sunder*|rend*|disappoint*','gmi')
        let ty = new RegExp('delighted*|thrilled*|overjoyed*|elated*|ecstatic*|joyful*|enchanted*|excited*|blissful*|^okay','gmi');
        let bye = new RegExp("nothing else*|that's it*|thats it*|bye|^see you|^good day",'gmi');
        let hi = new RegExp('^hi*|^hello*|^hey*','gmi');

        if(hi.test(this.state.text)) {
            let msgId = firebase.database().ref('messages').push().key;
            let message = {
                id: msgId,
                sender: bot,
                text: 'Hey there, how are you doing?',
                sentAt: Date(Date.now())
            }
            let updates = {}
            this.setState({
                data: [...this.state.data,message],
            })
            updates['messages/' + msgId] = message
            firebase.database().ref().update(updates)
        }
        else if(sorry.test(this.state.text)) {
            let msgId = firebase.database().ref('messages').push().key;
            let message = {
                id: msgId,
                sender: bot,
                text: 'I am sorry you had to face an issue, I assure you we would do our best to not let such an issue bug you anymore',
                sentAt: Date(Date.now())
            }
            let updates = {}
            this.setState({
                data: [...this.state.data,message],
            })
            updates['messages/' + msgId] = message
            firebase.database().ref().update(updates)
        }

        else if(ty.test(this.state.text)) {
            let msgId = firebase.database().ref('messages').push().key;
            let message = {
                id: msgId,
                sender: bot,
                text: "I am happy to hear from you and I thank you for having the trust in me, I hope I've positively been of use to you!",
                sentAt: Date(Date.now())
            }
            let updates = {}
            this.setState({
                data: [...this.state.data,message],
            })
            updates['messages/' + msgId] = message
            firebase.database().ref().update(updates)
        }

        else if(bye.test(this.state.text)) {
            let msgId = firebase.database().ref('messages').push().key;
            let message = {
                id: msgId,
                sender: bot,
                text: 'Get back to me for any further queries, Have a nice day dear :)',
                sentAt: Date(Date.now())
            }
            let updates = {}
            this.setState({
                data: [...this.state.data,message],
            })
            updates['messages/' + msgId] = message
            firebase.database().ref().update(updates)
        }

        else {
            let msgId = firebase.database().ref('messages').push().key;
            let message = {
                id: msgId,
                sender: bot,
                text: "I am sorry I couldn't get you, would you please elaborate?",
                sentAt: Date(Date.now())
            }
            let updates = {}
            this.setState({
                data: [...this.state.data,message],
            })
            updates['messages/' + msgId] = message
            firebase.database().ref().update(updates)
        }
    }
    convertTime = time => {
        let d = new Date(time);
        let c = new Date;
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':'
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()
        if(c.getDay() !== d.getDay())
            result = d.getDay() + '/' + d.getMonth() + '/' + d.getFullYear();
        return result;
    }
    renderRow = ({item}) => {
        return (
            <View style={{
                backgroundColor: item.sender.id == 1 ? '#B83227' : '#3C40C6', alignSelf: item.sender.id == 1 ? 'flex-start' : 'flex-end',
                marginVertical: 15,
                borderRadius: 20,
                padding: 10,
            }}>
                <Text style={styles.text}>{item.text}</Text>
                <Text style={{
                    fontSize: 10,
                    alignSelf: item.sender.id == 1 ? 'flex-start' : 'flex-end',
                    color: '#fff',
                    marginTop: 5
                }}>{this.convertTime(item.sentAt)}</Text>
            </View>
        );
    }
    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1 }}
            >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView>
                    <FlatList
                    style={{height: height * 0.8,padding: 5}} 
                    data = {this.state.data}
                    keyExtractor = {(key,index) => index.toString()}
                    renderItem = {this.renderRow}
                    />
                    <Item style={{flexDirection: "row", alignItems: "center"}}>
                        <Input
                            onChangeText={text => this.setState({text})}
                            placeholder="Type a message"
                            value={this.state.text}
                            style={styles.txtBox}
                            />
                            <Button 
                            style={{padding: 10, height: 45, marginBottom: 5}}
                            onPress={msg => {
                                key++
                                this.sendMessage()
                            }} bordered small primary>
                                <Text style={styles.btnText}>Send</Text>
                            </Button>
                        </Item>
                </SafeAreaView>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        "backgroundColor":  "#fff",
        "alignItems":   "center",
        "justifyContent":   "center"
    },
    text: {
        fontSize: 20,
        textTransform: 'none',
        color: '#fff',
    },
    txtBox: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '70%',
        marginBottom: 10,
        borderRadius: 5
    },
})