import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { Button, Input } from 'react-native-elements';
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { banco } from '../firebase';

const AddChatScreen = ({ navigation }) =>
{
    const [input, setInput] = useState('');

    useLayoutEffect(() =>
    {
        navigation.setOptions({
            title: "Adicionar conversa",
            headerTitleAlign: "center",
        });
    }, [navigation])

    const createChat = async () =>
    {
        await banco.collection('chats').add({
            chatName: input
        }).then(() =>
        {
            navigation.goBack()
        }).catch((error) => alert(error));
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder='Digite o nome do chat'
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="#1F5B36" />
                }
            />
            <Button disabled={!input} onPress={createChat} title='Criar novo chat' />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        padding: 30,
        height: "100%",
    },
})