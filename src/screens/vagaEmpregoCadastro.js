import React, { useState } from 'react';
import {
    View,
    KeyboardAvoidingView,    
    Alert,
    ScrollView,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import { Button,
    TextInput,
    HelperText,
    FAB,
    Appbar,
    Title
} from 'react-native-paper';

import api from '../services/api';

const app = ({ navigation, route }) => {
  
    const [vaga, setVaga] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [vinculo, setVinculo] = useState('');
    const [salario, setSalario] = useState('');
    const [detalhes, setDetalhes] = useState('');
    const [celular, onChangeCelular] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [carregando, setCarregando] = React.useState(false);
    const [vazio, setVazio] = React.useState(false);

    function validaCampos(){        
        if(vaga == '' || detalhes == ''){
            setVazio(true)
            return false
        } else {
            setVazio(false)
            return true
        }        
    }

    function RemoveCaracteresEspec(texto){
        var er = /[^0-9,]/gi;
        var er2 = /[^0-9]/gi;
        texto = texto.replace(er, "");
        texto = texto.replace(er2, ".");
        return texto == '' ? '0' : texto;
    }

    async function handleSubmit (){        
        if(validaCampos()){
            setCarregando(true);
            try {
                const data = {                    
                    vaga : vaga,
                    empresa: empresa == '' ? ' ' : empresa,
                    vinculo: vinculo,
                    valor: RemoveCaracteresEspec(salario),
                    requisitos: detalhes,
                    contato_email: email,
                    contato_telefone: celular
                }
                const response = await api.post('/vagaEmpregoStore', data);
                // sendNotificacao(`Nova Vaga de Emprego`, vaga);
                setCarregando(false);
                Alert.alert('Sucesso','Vaga cadastrada com sucesso!')
                navigation.goBack();
            } catch (error) {
                setCarregando(false);
                Alert.alert('Alerta','Não foi possível finalizar o cadastro. Verifique os dados e tente novamente. ' + error)
            }
        } else {
            setCarregando(false);
            Alert.alert('Alerta', 'Há campo obrigatório não informado!');            
        }
    }

    async function sendNotificacao( _title, _body ) {
        try{
            const data = {
                titulo: _title,
                conteudo: _body,
            }
            const response = await api.post('/pushTokenSend', data);
        } catch(err){
            console.log('Alerta', err);
        }
    }

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
                <Appbar.Content title={<Title style={{color: '#345D7E', fontWeight: 'bold'}}>Adicionar Vaga de Emprego</Title>} />
            </Appbar.Header>

            <ScrollView style={{backgroundColor: '#fff', paddingStart: 15, paddingEnd: 15, height: '100%'}}>
                <TextInput
                    label= {'Descrição da vaga'}
                    placeholder={'Desenvolvedor de software'}
                    autoCapitalize='sentences'
                    autoCorrect={true}
                    onChangeText={text => setVaga(text)}
                    value={vaga}

                    type="flat"
                    mode="outlined"
                      error={vazio && !vaga}
                    //icon="login"
                    tselectionColor="#345D7E"
                    underlineColor="#345D7E"
                    theme={{ 
                        colors: { 
                            placeholder: '#828282',
                            text: '#333333',
                            primary: '#345D7E',
                            underlineColor:'transparent',
                            background : '#fff'
                        }
                    }}
                    style={{paddingTop: 5}}
                />
                <HelperText type="info" visible={!vaga}>
                    Campo obrigatório!
                </HelperText>
                <TextInput
                    label= {'Requisitos da vaga'}
                    placeholder={'Conhecer linguagens de programação'}
                    autoCapitalize='sentences'
                    autoCorrect={true}
                    onChangeText={text => setDetalhes(text)}
                    value={detalhes}

                    type="flat"
                    mode="outlined"
                    error={vazio && !detalhes}
                    selectionColor="#345D7E"
                    underlineColor="#345D7E"
                    theme={{ 
                        colors: { 
                            placeholder: '#828282',
                            text: '#333333',
                            primary: '#345D7E',
                            underlineColor:'transparent',
                            background : '#fff'
                        }
                    }}
                />
                <HelperText type="info" visible={!detalhes}>
                    Campo obrigatório!
                </HelperText>
                <TextInput
                    label= {'Empresa'}
                    placeholder={'ACIAU'}
                    autoCapitalize='words'
                    autoCorrect={true}
                    onChangeText={text => setEmpresa(text)}
                    value={empresa}

                    type="flat"
                    mode="outlined"
                    selectionColor="#345D7E"
                    underlineColor="#345D7E"
                    theme={{ 
                        colors: { 
                            placeholder: '#828282',
                            text: '#333333',
                            primary: '#345D7E',
                            underlineColor:'transparent',
                            background : '#fff'
                        }
                    }}
                />
                <TextInput
                    label= {'Vínculo'}
                    placeholder={'CLT'}
                    autoCapitalize='words'
                    autoCorrect={true}
                    onChangeText={text => setVinculo(text)}
                    value={vinculo}

                    type="flat"
                    mode="outlined"
                    selectionColor="#345D7E"
                    underlineColor="#345D7E"
                    theme={{ 
                        colors: { 
                            placeholder: '#828282',
                            text: '#333333',
                            primary: '#345D7E',
                            underlineColor:'transparent',
                            background : '#fff'
                        }
                    }}
                    style={{paddingTop: 10}}
                />
                <TextInput
                    label= {'Salário'}
                    placeholder={'Ex: 2.000'}
                    secureTextEntry={false}
                    autoCapitalize='words'
                    autoCorrect={true}
                    textContentType={'name'}
                    onChangeText={text => setSalario(text)}
                    value={salario}

                    type="flat"
                    mode="outlined"
                    selectionColor="#345D7E"
                    underlineColor="#345D7E"
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
                        type={'money'}
                        options={{
                            precision: 2,
                            separator: ',',
                            delimiter: '.',
                            unit: 'R$',
                            suffixUnit: ''
                        }}
                    />
                    }
                    style={{paddingTop: 10}}
                />
                <TextInput
                    label= {'Email para Contato'}
                    placeholder={'Ex: john@email.com'}
                    secureTextEntry={false}
                    autoCapitalize='none'
                    autoCorrect={true}
                    textContentType={'emailAddress'}
                    onChangeText={text => onChangeEmail(text)}
                    value={email}

                    type="flat"
                    mode="outlined"
                    selectionColor="#345D7E"
                    underlineColor="#345D7E"
                    theme={{ 
                        colors: { 
                            placeholder: '#828282',
                            text: '#333333',
                            primary: '#345D7E',
                            underlineColor:'transparent',
                            background : '#fff'
                        }
                    }}
                    style={{paddingTop: 10}}
                />
                <TextInput
                    label= {'Telefone para Contato'}
                    placeholder={'Ex: (62) 91234-5678'}
                    secureTextEntry={false}
                    autoCapitalize='words'
                    autoCorrect={true}
                    textContentType={'name'}
                    onChangeText={text => onChangeCelular(text)}
                    value={celular}

                    type="flat"
                    mode="outlined"
                    selectionColor="#345D7E"
                    underlineColor="#345D7E"
                    theme={{ 
                        colors: { 
                            placeholder: '#828282',
                            text: '#333333',
                            primary: '#345D7E',
                            underlineColor:'transparent',
                            background : '#fff'
                        }
                    }}
                    style={{paddingTop: 10}}
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
                    Confirmar
                </Button>
                <HelperText type="error" visible={vazio}>
                    Verifique os dados e tente novamente!
                </HelperText>

                <View style={{marginBottom: 10}}/>
            </ScrollView>
        </KeyboardAvoidingView>
)
};

export default app;