import React, { useEffect, useState } from 'react';
import { 
    View,
    TouchableOpacity,
    KeyboardAvoidingView,    
    Alert,
    ScrollView,
    Modal,
} from 'react-native';
import {
    Subheading,
    Button,
    TextInput,
    HelperText,
    Appbar,
    Title,
} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import Constants from 'expo-constants';
import { TextInputMask } from 'react-native-masked-text'
import Cards from 'react-credit-cards';

const App = ({ navigation, route }) => {

    const [nrCartao, onChangeNrCartao] = useState('');
    const [titular, onChangeTitular] = useState('');

    const [obs, onChangeObs] = useState('');
  
    const [nome, onChangeNome] = useState('');
    const [endereco, onChangeEndereco] = useState('');
    const [tel1, onChangeTel1] = useState('');
    const [tel2, onChangeTel2] = useState('');
    
    const [timeIni1, setTimeIni1] = useState('00:00');
    const [timeFim1, setTimeFim1] = useState('00:00');
    
    const [timeIni2, setTimeIni2] = useState('00:00');
    const [timeFim2, setTimeFim2] = useState('00:00');
    
    const [timeIni3, setTimeIni3] = useState('00:00');
    const [timeFim3, setTimeFim3] = useState('00:00');

    const [horaSel, setHora] = useState('00');
    const [minutoSel, setMinuto] = useState('00');
    const [dia, setDia] = useState('');
    const [selecionaHoraMinuto, setSelecionaHoraMinuto] = useState(false);

    const [carregando, setCarregando] = React.useState(false);
    const [vazio, setVazio] = useState(false);

    return (        
        <KeyboardAvoidingView behavior="height" enabled>
        <Appbar.Header
        style={{
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0.5,
            borderBottomColor: '#345D7E',
        }}>
            <Appbar.BackAction color={'#345D7E'} onPress={() => navigation.goBack()} />
            <Appbar.Content title={<Title style={{color: '#345D7E', fontWeight: 'bold'}}>Adicionar Cartão</Title>} />
        </Appbar.Header>
            <ScrollView style={{backgroundColor: '#fff', paddingStart: 15, paddingEnd: 15, height: '100%'}}>
            <TextInput
                    label= {'Número do cartão'}
                    placeholder={'Ex: ???? ???? ???? ????'}
                    secureTextEntry={false}
                    autoCapitalize='sentences'
                    onChangeText={text => onChangeNrCartao(text)}
                    value={nrCartao}

                    type="flat"
                    mode="outlined"
                    selectionColor="#009750"
                    underlineColor="#009750"
                    // error={vazio && !tel1}
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
                    style={{paddingTop: 5}}
                    render={props =>
                        <TextInputMask
                            {...props}
                            type={'credit-card'}
                            options={{
                                obfuscated: false,
                                issuer: 'visa-or-mastercard'
                            }}
                        />
                    }
                />
                <TextInput
                    label= {'Nome do titular'}
                    placeholder={'Nome escrito no cartão'}
                    secureTextEntry={false}
                    autoCapitalize='sentences'
                    onChangeText={text => onChangeTitular(text)}
                    value={titular}

                    type="flat"
                    mode="outlined"
                    selectionColor="#009750"
                    underlineColor="#009750"
                    error={vazio && !nome}
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
                    style={{paddingTop: 5}}
                />

                <Button 
                    icon="new-box"
                    mode="contained"
                    color="#345D7E"
                    loading={carregando}
                    uppercase={true}
                    accessibilityLabel="Cadastrar"
                    contentStyle={{
                        height: 51,
                        justifyContent: 'center',
                        alignContent: 'stretch',
                        fontWeight: 'bold',
                    }}
                    style={{
                      marginTop: 20,
                    }}
                    onPress={() => handleSubmit()}
                >
                    Cadastrar
                </Button>
                <HelperText type="error" visible={vazio}>
                    Campo obrigatório não informado. Verifique!
                </HelperText>
            </ScrollView>
        </KeyboardAvoidingView>
)
};

export default App;