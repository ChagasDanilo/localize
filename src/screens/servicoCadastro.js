import React, { useState, useEffect } from 'react';
import {
    View,
    KeyboardAvoidingView,    
    Alert,
    ScrollView,
    Image,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import { Button,
    TextInput,
    HelperText,
    FAB,
    Appbar,
    Title,
    Text
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import {ImageBrowser} from 'expo-image-picker-multiple';
import { AssetsSelector } from 'expo-images-picker'
import { Ionicons } from '@expo/vector-icons'

const app = ({ navigation, route }) => {
  
    const [servico, setServico] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [imagens, setImagens] = useState([]);

    const [carregando, setCarregando] = React.useState(false);
    const [vazio, setVazio] = React.useState(false);

    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
        //   aspect: [4, 3],
          quality: 1,
          allowsMultipleSelection: true
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

    function validaCampos(){        
        if(servico == '' || descricao == ''){
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
                <Appbar.Content title={<Title style={{color: '#345D7E', fontWeight: 'bold'}}>Adicionar Serviço</Title>} />
            </Appbar.Header>

            <ScrollView style={{backgroundColor: '#fff', paddingStart: 15, paddingEnd: 15, height: '100%'}}>
              <Button 
                icon="new-box"
                mode="outlined"
                color="#345D7E"
                loading={carregando}
                uppercase={true}
                accessibilityLabel="Inserir Imagem"
                contentStyle={{
                    height: 51,
                    justifyContent: 'center',
                    alignContent: 'stretch',
                    fontWeight: 'bold',
                    borderWidth: 1,
                    borderColor: '#345D7E'
                }}
                style={{
                    marginTop: 10,
                    marginBottom: 10
                }}
                onPress={() => pickImage()}
              >
              Inserir imagem
            </Button>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200}} />}

                <TextInput
                    label= {'Título do Serviço'}
                    placeholder={'Pintor'}
                    autoCapitalize='sentences'
                    autoCorrect={true}
                    onChangeText={text => setServico(text)}
                    value={servico}

                    type="flat"
                    mode="outlined"
                    selectionColor="#009750"
                    underlineColor="#009750"
                      error={vazio && !servico}
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
                <HelperText type="info" visible={!servico}>
                    Campo obrigatório!
                </HelperText>
                <TextInput
                    label= {'Descrição do Serviço'}
                    placeholder={'Pintura residencial'}
                    autoCapitalize='sentences'
                    autoCorrect={true}
                    onChangeText={text => setDescricao(text)}
                    value={descricao}

                    type="flat"
                    mode="outlined"
                    selectionColor="#009750"
                    underlineColor="#009750"
                      error={vazio && !descricao}
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
                <HelperText type="info" visible={!descricao}>
                    Campo obrigatório!
                </HelperText>
                <TextInput
                    label= {'Valor'}
                    placeholder={'Ex: 1.100'}
                    secureTextEntry={false}
                    autoCapitalize='words'
                    autoCorrect={true}
                    textContentType={'name'}
                    onChangeText={text => setValor(text)}
                    value={valor}

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