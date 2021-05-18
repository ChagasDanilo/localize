import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Dimensions,
} from 'react-native';
import Constants from 'expo-constants';
import { Title, Button, TextInput, HelperText, } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

import api from '../services/api';

const Login = ({ navigation }) => {

    const window = Dimensions.get("window");
    const screen = Dimensions.get("screen");
  
    const [dimensions, setDimensions] = useState({ window, screen });
  
    const onChange = ({ window, screen }) => {
      setDimensions({ window, screen });
    };
  
    useEffect(() => {
      Dimensions.addEventListener("change", onChange);
      return () => {
        Dimensions.removeEventListener("change", onChange);
      };
    });

    //const [email, onChangeEmail] = React.useState('danilochagas009@gmail.com');
    //const [senha, onChangeSenha] = React.useState('123456');
    const [email, onChangeEmail] = React.useState('');
    const [senha, onChangeSenha] = React.useState('');
    const [carregando, setCarregando] = React.useState(false);
    const [errorE, setErrorE] = React.useState(false);
    const [errorS, setErrorS] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorNet, setErrorNet] = React.useState(false);

    async function handleSubmit (){
        setErrorE(false)
        setErrorS(false)
        setError(false)
        setErrorNet(false)

        if(senha == '' || email == ''){
            if(email == ''){
                setErrorE(true)
            }
            if(senha == ''){
                setErrorS(true)
            }
            return false;
        }
        else 
        {
            setCarregando(true);
            try {
                const data = {
                    email : email,
                    password: senha
                }
                const response = await api.post('/login',data);
                console.log(response);
                if (response.data.token){
                    await AsyncStorage.setItem('@aciau-token', response.data.token);
                    
                    await AsyncStorage.setItem('@usermail', email);
                    // gravaTokenUser()
                    setCarregando(false);
                    navigation.navigate('Perfil');
                }else{
                    setCarregando(false);
                    setErrorE(true)
                    setErrorS(true)
                    //Alert.alert('Alerta','Verifique o email e senha e tente novamente!')
                }
            } catch (error) {
                setCarregando(false);
                if(error == `Error: Network Error`){
                    setErrorNet(true)
                    //Alert.alert(`Sem conexão`, `Verifique sua conexão com a internet`);
                }else{
                    setError(true)
                    setErrorE(true)
                    setErrorS(true)
                }
            }
        }
    }
    
    return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'transparent',
        flexDirection: 'column',
        fontSize: Constants.systemFonts.size,
        fontStyle: Constants.systemFonts.style,
        paddingHorizontal: 20,
        paddingVertical: 20,
    }}>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'height' : null}>
        <ScrollView>
            <View style={{
                backgroundColor: 'transparent',
                marginBottom: 5,
                marginTop: 5,
                borderBottomWidth: 5,
                borderBottomColor: 'transparent',
                maxHeight: 100,
            }}>
            <Image
                style={{
                    alignItems: 'stretch',
                    alignSelf: 'center',
                    alignContent: 'stretch',
                    backgroundColor: 'transparent',
                    resizeMode: 'contain',
                    height: '100%',
                    width: '100%',
                    padding: 10,
                    paddingRight: 20,
                }}
                source={require('../Images/logo.png')} 
            />
            </View>
            <View style={{
                borderBottomWidth: 20,
                borderColor: 'transparent',
            }}/>
            <Title style={{
                backgroundColor: 'transparent',
                textAlignVertical: 'center',
                textAlign: 'center',
                margin: 10,
                justifyContent: 'center',
                textAlign: 'center',
                color: '#345D7E'
            }}>
                FAÇA SEU LOGIN
            </Title>
            <View style={{
                borderBottomWidth: 20,
                borderColor: 'transparent',
            }}/>

            <View>
                <TextInput
                    label="E-mail"
                    placeholder={'Ex: john@email.com'}
                    keyboardType={'email-address'}
                    autoCapitalize='none'
                    textContentType={"emailAddress"}
                    autoFocus={false}
                    onChangeText={email => onChangeEmail(email)}
                    value={email}

                    type="flat"
                    mode="outlined"
                    selectionColor="#009750"
                    underlineColor="#009750"
                    error={errorE}
                    //icon="login"
                    theme={{ 
                        colors: { 
                            placeholder: '#828282',
                            text: '#333333',
                            primary: '#009750',
                            underlineColor:'transparent',
                            background : '#fff'
                        }
                    }}
                />
                <HelperText type="error" visible={errorE}>
                    Endereço de email inválido!
                </HelperText>
            </View>
            <View>
                <TextInput
                    label="Senha"
                    placeholder='Senha'
                    secureTextEntry={true}
                    autoCapitalize='none'
                    autoCorrect={false}
                    textContentType={"password"}
                    onChangeText={senha => onChangeSenha(senha)}
                    value={senha}

                    type="flat"
                    mode="outlined"
                    selectionColor="#009750"
                    underlineColor="#009750"
                    error={errorS}
                    //icon="login"
                    theme={{ 
                        colors: { 
                            placeholder: '#828282',
                            text: '#333333',
                            primary: '#009750',
                            underlineColor:'transparent',
                            background : '#fff'
                        }
                    }}
                />
                <HelperText type="error" visible={errorE}>
                    Senha inválida!
                </HelperText>
            </View>
            <Button 
                icon="login"
                mode="contained"
                color="#345D7E"
                loading={carregando}
                uppercase={true}
                accessibilityLabel="Clique para realizar o login"
                contentStyle={{
                    height: 51,
                    justifyContent: 'center',
                    alignContent: 'stretch',
                    fontWeight: 'bold',
                }}
                // onPress={() => handleSubmit()}
                onPress={() => navigation.navigate('Perfil')}
            >
                Login                
            </Button>
            <HelperText type="error" visible={error}>
                Verifique o email e senha!
            </HelperText>
            <HelperText type="error" visible={errorNet}>
                Verifique sua conexão com a internet!
            </HelperText>

            <View style={{
                backgroundColor: '#345D7E',
                height: 1,
                alignSelf: "center",
                width: "100%",
            }}/>
            <Button 
                icon="login" 
                mode="text" 
                color="#345D7E"
                //loading={carregando}
                uppercase={true}
                accessibilityLabel="Criar uma conta"
                contentStyle={{
                    height: 51,
                    justifyContent: 'center',
                    alignContent: 'stretch'
                }}
                onPress={() => navigation.navigate('NewUserGeral')}
            >
                Não tenho cadastro
            </Button>
        </ScrollView>
    </KeyboardAvoidingView>
    </View>
)};

export default Login;