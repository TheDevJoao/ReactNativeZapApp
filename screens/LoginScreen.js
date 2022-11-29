import React from 'react';
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { useLayoutEffect } from 'react';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) =>
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useLayoutEffect(() =>
    {
        navigation.setOptions({
            title: "Login do Zap",
            headerTitleAlign: "center",
        });
    }, [navigation])

    useEffect(() =>
    {
        const unsubscribe = auth.onAuthStateChanged((authUser) =>
        {
            if (authUser)
            {
                navigation.replace('Home')
            }
        });
        return unsubscribe;
    }, []);

    const signIn = () =>
    {
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error));
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />

            <Image
                source={{
                    uri: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                }}
                style={{
                    width: 200,
                    height: 200,
                    borderRadius: 50
                }} />
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Email'
                    type="email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry type="password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>

            <Button containerStyle={styles.button} onPress={signIn} title="Entrar" />
            <Button
                onPress={() => navigation.navigate('Register')}
                containerStyle={styles.button}
                title="Cadastrar" />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
})