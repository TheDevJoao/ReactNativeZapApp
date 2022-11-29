import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect } from "react";
import { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, View, Button } from "react-native";
import { Input, Text } from "react-native-elements";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) =>
{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useLayoutEffect(() =>
    {
        navigation.setOptions({
            title: "Cadastrar",
            headerTitleAlign: "center",
        });
    }, [navigation]);

    const register = () =>
    {
        auth
        .createUserWithEmailAndPassword(email, password) // Se tiver sucesso 
        .then(authUser => {
            authUser.user.updateProfile({
                displayName: username, // propriedades do firebase
                photoURL: 
                    imageUrl || "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png"
            });
        })
        .catch(error => alert(error.message));
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50 }}>
                Criar uma conta
            </Text>

            <View style={styles.inputContainer}>
                <Input
                    placeholder='Usuário'
                    type='text'
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <Input
                    placeholder='Email'
                    type='text'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder='Senha'
                    type='password'
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input
                    placeholder="Link(URL) da imagem (opcional)"
                    type="text"
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>

            <Button
                containerStyle={styles.button}
                raised
                onPress={register}
                title="Cadastrar">
            </Button>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    inputContainer: {
        width: 300,
    }
});