import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Alert
} from 'react-native';
import Constants from 'expo-constants';
import { Title, Button, TextInput, HelperText, Snackbar, Headline, } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';
import { TextInputMask } from 'react-native-masked-text'
import cep from 'cep-promise'

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

    const [index, setIndex] = React.useState(0);
    const [cadastrou, setCadastrou] = React.useState(false);

    //const [email, onChangeEmail] = React.useState('danilochagas009@gmail.com');
    //const [senha, onChangeSenha] = React.useState('123456');
    const [email, onChangeEmail] = React.useState('');
    const [senha, onChangeSenha] = React.useState('');
    const [carregando, setCarregando] = React.useState(false);
    const [errorE, setErrorE] = React.useState(false);
    const [errorS, setErrorS] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorNet, setErrorNet] = React.useState(false);

    const [user, onChangeUser] = useState('');
    const [senhaConf, onChangeSenhaConf] = useState('');
    const [tel1, onChangeTel1] = useState('');
    const [tel2, onChangeTel2] = useState('');
    const [vazio, setVazio] = React.useState(false);
    const [user_cad, setUser_cad] = React.useState(false);
    const [email_cad, setEmail_cad] = React.useState(false);

    const [cep_input, setCep] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep_valido, setCep_Valido] = useState(true);

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
                if (response.data.token){
                    console.log(response.data.token);
                    await AsyncStorage.setItem('@localize-token', response.data.token);
                    gravaTokenUser()
                    setCarregando(false);
                    navigation.navigate('Perfil');
                }else{
                    setCarregando(false);
                    setErrorE(true)
                    setErrorS(true)
                    // Alert.alert('Alerta','Verifique o email e senha e tente novamente!')
                }
            } catch (error) {
                setCarregando(false);
                if(error == `Error: Network Error`){
                    setErrorNet(true)
                    // Alert.alert(`Sem conexão`, `Verifique sua conexão com a internet`);
                }else{
                    setError(true)
                    setErrorE(true)
                    setErrorS(true)
                }
            }
        }
    }

    useEffect(()=>{
        const temToken  = async () =>{
            try{
                const log = await AsyncStorage.getItem('@localize-token');
                if(log){
                    const response = await api.get('/loginCheck');
                    console.log(response.data);
                    if(response.data){
                        gravaTokenUser()
                        navigation.navigate('Perfil')
                        return true
                    }
                    return false
                }
                return false
            } catch(err){
                console.log(err);
                return false
            }
        }
        temToken();
    },[])

    async function gravaTokenUser(){
        try{
            if (Constants.isDevice) {
              const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
              let finalStatus = existingStatus;
              if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
              }
              if (finalStatus !== 'granted') {
                console.log('Falha ao obter token push para notificação push!');
                return;
              }
              const tokenPush = (await Notifications.getExpoPushTokenAsync()).data;
  
              const data = {
                token: tokenPush,
                notifica: true,
              }
              console.log(tokenPush);
              const response = await api.post('/tokenUpdateUserId', data);
              if(!response.data){
                console.log('Não foi possível gravar token push no banco de dados');
              }
            } else {
              console.log('Deve usar dispositivo físico para notificações push');
            }
          
            if (Platform.OS === 'android') {
              Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
              });
            }
        } catch(err){
          console.log('Erro token push: ' + err)
        }
    }

    function fazValidacoesCadastro(){
        if(user == '' || email == '' || senha.length < 6 || senha != senhaConf ){            
            return false
        } else {
            return true
        }
    }

    async function temEmailCad(){
        try{
            const response = await api.get('/temEmailCad?texto='+email);
            console.log(response.data);
            setEmail_cad(response.data);
        } catch (error) {
            console.log(error);
        } 
    }

    async function handleSubmitCadastro (){
        setCadastrou(false)
        setVazio(false)
        setError(false)
        setUser_cad(false)
        if(!fazValidacoesCadastro()){
            setVazio(true)
        }
        else
        {
            setCarregando(true);
            try {                            
                const data = {                    
                    username: user,
                    email : email,
                    password: senha,
                    telefone1: tel1,
                    telefone2: tel2,
                }
                const response = await api.post('/userCreate',data);
                setCarregando(false);
                setCadastrou(true);
                // Alert.alert('Sucesso','Usuário cadastrado com sucesso!')
                onChangeSenha('')
                onChangeSenhaConf('')
                setIndex(0)
            } catch (error) {
                setCarregando(false);
                setError(true)
                //Alert.alert('Alerta','Não foi possível cadastrar o usuário. Verifique os dados e tente novamente.')
            } 
        }
    }

    function validaCEP(){
        if(cep_input){
          cep(RemoveCaracteresEspec(cep_input))
          .catch( () => {
            setCep_Valido(false)
            setCidade('')
            setEstado('')
          })
          .then(texto => {
            // console.log(texto)
            setCidade(texto.city)
            setEstado(texto.state)
            setCep_Valido(true)
          })
        }
    }
    function RemoveCaracteresEspec(texto){
      var er = /[^0-9,]/gi;
      var er2 = /[^0-9]/gi;
      texto = texto.replace(er, "");
      texto = texto.replace(er2, ".");
      return texto;
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
                source={require('../Images/logo_completa.png')} 
            />
            </View>
            <View style={{
                borderBottomWidth: 20,
                borderColor: 'transparent',
            }}/>

            <View style={{
                padding: 8,
                // height: 80,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                borderTopEndRadius: 15,
                borderTopStartRadius: 15,
                borderBottomWidth: 2,
                borderBottomColor: '#b3b3b3',
                padding: 20,
            }}>
                <View style={{
                    justifyContent: 'space-evenly',
                    flexDirection: 'row',
                    width: '100%'
                }}>
                    <TouchableOpacity onPress={() => setIndex(0) }>
                        <Headline style={{
                            backgroundColor: 'transparent',
                            textAlignVertical: 'center',
                            textAlign: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            color: index == 0 ? '#F27281' : '#000'
                        }}>
                            Entrar
                        </Headline>
                    </TouchableOpacity>

                    <View style={{
                        borderWidth: 0.5,
                        borderColor: '#b3b3b3',
                        height: '100%'
                    }}/>

                    <TouchableOpacity onPress={() => setIndex(1) }>
                    <Headline style={{
                        backgroundColor: 'transparent',
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: index == 1 ? '#F27281' : '#000'
                    }}>
                        Cadastrar
                    </Headline>
                    </TouchableOpacity>
                </View>
            </View>

            {index == 0 ?
            <View style={{
                backgroundColor: '#fff',
                paddingTop: 30,
                borderBottomEndRadius: 15,
                borderBottomStartRadius: 15,
            }}>
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
                    selectionColor="#345D7E"
                    underlineColor="#345D7E"
                    error={errorE}
                    //icon="login"
                    theme={{ 
                        colors: { 
                            placeholder: '#828282',
                            text: '#333333',
                            primary: '#345D7E',
                            underlineColor:'transparent',
                            background : '#fff'
                        }
                    }}
                    style={{
                        width: '90%',
                        alignSelf: 'center'
                    }}
                />
                <HelperText type="error" visible={errorE} style={{paddingStart: 20}}>
                    Endereço de email inválido!
                </HelperText>

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
                    selectionColor="#345D7E"
                    underlineColor="#345D7E"
                    error={errorS}
                    //icon="login"
                    theme={{ 
                        colors: { 
                            placeholder: '#828282',
                            text: '#333333',
                            primary: '#345D7E',
                            underlineColor:'transparent',
                            background : '#fff'
                        }
                    }}
                    style={{
                        width: '90%',
                        alignSelf: 'center'
                    }}
                />
                <HelperText type="error" visible={errorE} style={{paddingStart: 20}}>
                    Senha inválida!
                </HelperText>

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
                    style={{
                        width: '90%',
                        alignSelf: 'center',
                    }}
                    onPress={() => handleSubmit()}
                    // onPress={() => navigation.navigate('Perfil')}
                >
                    Login                
                </Button>
                <HelperText type="error" visible={error}>
                    Verifique o email e senha!
                </HelperText>
                <HelperText type="error" visible={errorNet}>
                    Verifique sua conexão com a internet!
                </HelperText>
            </View>
            : 
            <View style={{
                backgroundColor: '#fff',
                paddingTop: 30,
                borderBottomEndRadius: 15,
                borderBottomStartRadius: 15,
            }}>
                <TextInput
                    label="Nome completo"
                    placeholder={'Ex: John Doe'}
                    //keyboardType={''}
                    autoCapitalize='words'
                    textContentType={"name"}
                    autoFocus={false}
                    onChangeText={email => onChangeUser(email)}
                    value={user}

                    type="flat"
                    mode="outlined"
                    selectionColor="#345D7E"
                    underlineColor="#345D7E"
                    error={vazio && !user}
                    // onBlur={() => temUserNome()}
                    //icon="login"
                    theme={{ 
                        colors: { 
                            placeholder: '#828282',
                            text: '#333333',
                            primary: '#345D7E',
                            underlineColor:'transparent',
                            background : '#fff'
                        }
                    }}
                    style={{
                        width: '90%',
                        alignSelf: 'center',
                        marginBottom: 20,
                    }}
                />
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
                    selectionColor="#345D7E"
                    underlineColor="#345D7E"
                    error={vazio && !email}
                    onBlur={() => temEmailCad()}
                    //icon="login"
                    theme={{ 
                        colors: { 
                            placeholder: '#828282',
                            text: '#333333',
                            primary: '#345D7E',
                            underlineColor:'transparent',
                            background : '#fff'
                        }
                    }}
                    style={{
                        width: '90%',
                        alignSelf: 'center',
                    }}
                />
                <HelperText type="error" visible={email_cad} style={{paddingStart: 20}}>
                    Email já cadastrado!
                </HelperText>
                <TextInput
                    label= {'Telefone'}
                    placeholder={'Ex: (62) 93357-5678'}
                    secureTextEntry={false}
                    autoCapitalize='words'
                    autoCorrect={true}
                    textContentType={'name'}
                    onChangeText={text => onChangeTel1(text)}
                    value={tel1}

                    type="flat"
                    mode="outlined"
                    selectionColor="#345D7E"
                    underlineColor="#345D7E"
                    // error={vazio && !tel1}
                    //icon="login"
                    theme={{ 
                        colors: { 
                            placeholder: '#828282',
                            text: '#333333',
                            primary: '#345D7E',
                            underlineColor:'transparent',
                            background : '#fff'
                        }
                    }}
                    style={{
                        width: '90%',
                        alignSelf: 'center',
                        marginBottom: 20,
                    }}
                    render={props =>
                    <TextInputMask
                        {...props}
                        type={'cel-phone'}
                        options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) '
                        }}
                    />
                    }
                />
                <TextInput
                    label= {'Celular'}
                    placeholder={'Ex: (62) 91234-5678'}
                    secureTextEntry={false}
                    autoCapitalize='words'
                    autoCorrect={true}
                    textContentType={'name'}
                    onChangeText={text => onChangeTel2(text)}
                    value={tel2}

                    type="flat"
                    mode="outlined"
                    selectionColor="#345D7E"
                    underlineColor="#345D7E"
                    // error={vazio && !tel2}
                    //icon="login"
                    theme={{ 
                        colors: { 
                            placeholder: '#828282',
                            text: '#333333',
                            primary: '#345D7E',
                            underlineColor:'transparent',
                            background : '#fff'
                        }
                    }}
                    render={props =>
                    <TextInputMask
                        {...props}
                        type={'cel-phone'}
                        options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) '
                        }}
                    />
                    }
                    style={{
                        width: '90%',
                        alignSelf: 'center',
                        marginBottom: 20,
                    }}
                />
                <TextInput
                    label= {'CEP'}
                    placeholder={'Ex: 76400-000'}
                    secureTextEntry={false}
                    autoCapitalize='sentences'
                    autoCorrect={true}
                    //textContentType={''}
                    onChangeText={text => setCep(text)}
                    value={cep_input}

                    type="flat"
                    mode="outlined"
                    selectionColor="#345D7E"
                    underlineColor="#345D7E"
                    error={(vazio && !cep_input) || (!cep_valido)}
                    onBlur={() => validaCEP() }
                    //icon="login"
                    theme={{ 
                        colors: { 
                            placeholder: '#828282',
                            text: '#333333',
                            primary: '#345D7E',
                            underlineColor:'transparent',
                            background : '#fff'
                        }
                    }}
                    style={{
                        width: '90%',
                        alignSelf: 'center',
                    }}
                    render={props =>
                    <TextInputMask
                        {...props}
                        type={'zip-code'}
                    />
                    }
                />
                <HelperText type="error" visible={!cep_valido && cep_var} style={{paddingStart: 20}}>
                    CEP inválido!
                </HelperText>
                <View style={{
                    flexDirection: "row",
                    alignContent: 'center',
                    alignItems: 'flex-start',
                    //paddingTop: 5,
                    width: '90%',
                    alignSelf: 'center',
                    marginBottom: 20,
                }}>
                    <TextInput
                    label= {'Cidade'}
                    placeholder={'Cidade'}
                    disabled={true}
                    editable={false}
                    secureTextEntry={false}
                    autoCapitalize='words'
                    autoCorrect={true}
                    textContentType={'addressCity'}
                    onChangeText={text => setCidade(text)}
                    value={cidade}

                    type="flat"
                    mode="outlined"
                    selectionColor="#345D7E"
                    underlineColor="#345D7E"
                    error={vazio && !cidade}
                    //icon="login"
                    theme={{ 
                        colors: { 
                            placeholder: '#828282',
                            text: '#333333',
                            primary: '#345D7E',
                            underlineColor:'transparent',
                            background : '#fff'
                        }
                    }}
                    style={{
                        paddingEnd: 10,
                        width: '75%',
                    }}
                    />
                    <TextInput
                    label= {'Estado'}
                    placeholder={'Estado'}
                    disabled={true}
                    editable={false}
                    secureTextEntry={false}
                    autoCapitalize='words'
                    autoCorrect={true}
                    textContentType={'addressState'}
                    onChangeText={text => setEstado(text)}
                    value={estado}

                    type="flat"
                    mode="outlined"
                    selectionColor="#345D7E"
                    underlineColor="#345D7E"
                    error={vazio && !estado}
                    //icon="login"
                    theme={{ 
                        colors: { 
                            placeholder: '#828282',
                            text: '#333333',
                            primary: '#345D7E',
                            underlineColor:'transparent',
                            background : '#fff'
                        }
                    }}
                    style={{
                        width: '25%',
                    }}
                    />
                </View>
                <TextInput
                    label="Senha"
                    placeholder='Senha'
                    secureTextEntry={true}
                    autoCapitalize='none'
                    autoCorrect={false}
                    textContentType={"newPassword"}
                    onChangeText={senha => onChangeSenha(senha)}
                    value={senha}

                    type="flat"
                    mode="outlined"
                    selectionColor="#345D7E"
                    underlineColor="#345D7E"
                    error={vazio && !senha}
                    //icon="login"
                    theme={{ 
                        colors: { 
                            placeholder: '#828282',
                            text: '#333333',
                            primary: '#345D7E',
                            underlineColor:'transparent',
                            background : '#fff'
                        }
                    }}
                    style={{
                        width: '90%',
                        alignSelf: 'center',
                        marginBottom: 20,
                    }}
                />
                <TextInput
                    label="Confirmar senha"
                    placeholder='Confirmar senha'
                    secureTextEntry={true}
                    autoCapitalize='none'
                    autoCorrect={false}
                    textContentType={"newPassword"}
                    onChangeText={senha => onChangeSenhaConf(senha)}
                    value={senhaConf}

                    type="flat"
                    mode="outlined"
                    selectionColor="#345D7E"
                    underlineColor="#345D7E"
                    error={(vazio && !senhaConf) || ((senha && senhaConf) && (senha != senhaConf))}
                    //icon="login"
                    theme={{ 
                        colors: { 
                            placeholder: '#828282',
                            text: '#333333',
                            primary: '#345D7E',
                            underlineColor:'transparent',
                            background : '#fff'
                        }
                    }}
                    style={{
                        width: '90%',
                        alignSelf: 'center',
                    }}
                />
                {(senha && senhaConf) && (senha != senhaConf) ?
                <HelperText type="error" visible={(senha && senhaConf) && (senha != senhaConf)} style={{paddingStart: 20}}>
                    As senhas não conferem!
                </HelperText>
                : null}
                {senha && senha.length < 6 ?
                <HelperText type="info" visible={senha && senha.length < 6} style={{paddingStart: 20}}>
                    A senha deve ter no mínimo 6 caracteres!
                </HelperText>
                : null}
                <View style={{
                    borderBottomWidth: 20,
                    borderColor: '#fff'
                }}/>
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
                    style={{
                        width: '90%',
                        alignSelf: 'center',
                    }}
                    onPress={() => handleSubmitCadastro()}
                >
                    Cadastrar
                </Button>
                <HelperText type="error" visible={error} style={{paddingStart: 20}}>
                    Verifique os dados!
                </HelperText>
                <HelperText type="error" visible={vazio} style={{paddingStart: 20}}>
                    *Todos os campos são obrigatórios
                </HelperText>
            </View>
            }

        </ScrollView>
    </KeyboardAvoidingView>
    <Snackbar
        visible={cadastrou}
        onDismiss={() => setCadastrou(false)}
        action={{
          label: 'Fechar',
          onPress: () => {
            // Do something
          },
        }}>
        Cadastro realizado com sucesso!
    </Snackbar>
    </View>
)};

export default Login;