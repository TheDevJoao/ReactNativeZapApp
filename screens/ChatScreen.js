import { KeyboardAvoidingView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { TouchableOpacity, TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { useState } from "react";
import { Keyboard } from 'react-native';
import { banco, auth } from '../firebase';
import * as firebase from "firebase";


const ChatScreen = ({ navigation, route }) =>
{
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() =>
    {
        navigation.setOptions({
            title: "Chat",
            headerTitleAlign: "center",
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        rounded
                        source={{
                            uri: messages[0]?.data.photoURL ||
                                "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png",
                        }}
                    />
                    <Text style={{ color: "#FFF", marginLeft: 10, fontWeight: "700" }}
                    >
                        {route.params.chatName}
                    </Text>
                </View>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight: 5,
                    }}
                >
                </View>
            ),
        });
    }, [navigation, messages]);

    const sendMessage = () =>
    {
        Keyboard.dismiss();

        banco.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        setInput('') // Limpa o campo de mensagem
    };

    useLayoutEffect(() =>
    {
        const unsubscribe = banco
            .collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            ));
        return unsubscribe;
    }, [route]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            <StatusBar style='light' />
            <KeyboardAvoidingView
                behavior={Platform.OS === "android" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={-200}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView>
                            {messages.map(({ id, data }) => (
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.receiver}>
                                        <Avatar
                                            position="absolute"
                                            bottom={-15}
                                            right={-10}
                                            size={30}
                                            roundedP
                                            source={{
                                                uri: data.photoURL,
                                            }}
                                        />
                                        <Text key={id} style={styles.receiverText}>{data.message}</Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.sender}>
                                        <Avatar
                                            position="absolute"
                                            bottom={-15}
                                            left={-10}
                                            size={30}
                                            rounded
                                            source={{
                                                uri: data.photoURL,
                                            }}
                                        />
                                        <Text key={id} style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderName}>{data.displayName}</Text>

                                    </View>
                                )
                            ))}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                value={input}
                                onChangeText={(text) => setInput(text)}
                                onSubmitEditing={sendMessage}
                                placeholder='Mensagem'
                                style={styles.textInput}
                            />
                            <TouchableOpacity
                                onPress={sendMessage}
                                activeOpacity={0.5}
                            >
                                <Ionicons name="send" size={24} color="#1F5B36" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    receiver: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 15,
        maxWidth: "80%",
        position: "relative",
    },
    receiverText: {
        color: "black",
        fontWeight: "600",
        marginLeft: 10,
    },
    sender: {
        padding: 15,
        backgroundColor: "#3c935e",
        alignSelf: "flex-start",
        borderRadius: 20,
        marginLeft: 15,
        marginBottom: 15,
        maxWidth: "80%",
        position: "relative",
    },
    senderText: {
        color: "white",
        fontWeight: "600",
        marginLeft: 10,
        marginBottom: 5,
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30,
    },
})