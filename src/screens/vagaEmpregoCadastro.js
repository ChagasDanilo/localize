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
                    selectionColor="#009750"
                    underlineColor="#009750"
                      error={vazio && !vaga}
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
                    selectionColor="#009750"
                    underlineColor="#009750"
                      error={vazio && !detalhes}
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
                    selectionColor="#009750"
                    underlineColor="#009750"
                    //   error={vazio && !cidade}
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
                <TextInput
                    label= {'Vínculo'}
                    placeholder={'CLT'}
                    autoCapitalize='words'
                    autoCorrect={true}
                    onChangeText={text => setVinculo(text)}
                    value={vinculo}

                    type="flat"
                    mode="outlined"
                    selectionColor="#009750"
                    underlineColor="#009750"
                    //   error={vazio && !cidade}
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
                    style={{paddingTop: 10}}
                />
                <TextInput
                    label= {'Salário'}
                    placeholder={'Ex: 1.045'}
                    secureTextEntry={false}
                    autoCapitalize='words'
                    autoCorrect={true}
                    textContentType={'name'}
                    onChangeText={text => setSalario(text)}
                    value={salario}

                    type="flat"
                    mode="outlined"
                    selectionColor="#009750"
                    underlineColor="#009750"
                    // error={vazio && !celula}
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
                    selectionColor="#009750"
                    underlineColor="#009750"
                    // error={vazio && !email}
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
                    selectionColor="#009750"
                    underlineColor="#009750"
                    // error={vazio && !celular}
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
                    onPress={() => validaCampos()}
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