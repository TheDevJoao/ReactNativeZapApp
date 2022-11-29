import React, { useLayoutEffect, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import { StyleSheet, Text } from 'react-native'
import { Avatar } from 'react-native-elements';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import CustomListItem from '../components/ListItem';
import { auth, banco } from "../firebase";

const HomeScreen = ({ navigation }) =>
{

    const [chats, setChats] = useState([]);

    const signOutUser = () => 
    {
        auth
            .signOut()
            .then(() =>
            {
                navigation.replace('Login')
            });
    };

    useEffect(() =>
    {
        const unsubscribe = banco
        .collection("chats")
        .onSnapshot((snapshot) =>
            setChats(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );
        return unsubscribe;
    }, []);


    useLayoutEffect(() =>
    {
        navigation.setOptions({
            title: "Zap",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#1F5B36" },
            headerTitleStyle: { color: "#FFF" },
            headerTintColor: "#FFF",
            headerLeft: () => (
                <View>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Avatar onPress={signOutUser} rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: "flex-end",
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('AddChat')} activeOpacity={0.5}>
                        <SimpleLineIcons name='pencil' size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation]);

    const enterChat = (id, chatName) =>
    {
        navigation.navigate('Chat', {
            id,
            chatName,
        });
    };

    return (
        // Protege o conteudo dentro da tela para não cortar componentes
        // Deconstroi a prop chat e o item data
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem 
                    key={id} 
                    id={id} 
                    chatName={chatName}
                    enterChat={enterChat} 
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: "100%",

    }
})