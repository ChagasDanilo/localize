import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    KeyboardAvoidingView,    
    Alert,
    ScrollView,
    Image,
    FlatList,
    Dimensions,
    Pressable,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import { Button,
    TextInput,
    HelperText,
    FAB,
    Appbar,
    Title,
    Text,
} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

import api from '../services/api';

const app = ({ navigation, route }) => {

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
  
    const [servico, setServico] = useState('');
    const [detalhes, setDetalhes] = useState('')
    const [valor, setValor] = useState('');
    const [unidade_medida, setUnidadeMedida] = useState('')
    const [palavra_chave, setPalavraChave] = useState('')

    const [categoria, setCategoria] = useState(null);
    const [categorias, setCategorias] = useState([]);

    const [carregando, setCarregando] = React.useState(false);
    const [vazio, setVazio] = React.useState(false);

    const [image, setImage] = useState(null);
    const [imagens, setImagens] = useState([]);
    const [imageAlterou, setImageAlterou] = useState(false);

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

    useEffect(() =>{
        const getCategorias  = async () =>{
          try {
            
            const response = await api.get('/servicoCategoriaShow');
            if (response.data){
                setCategorias(response.data);
            }
          } catch (error) {
            Alert.alert('Alerta', 'Não foi possível carregar a lista de categorias.');
          }            
        }
    
        getCategorias();
    },[]) 

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
        //   aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
          adicionaLista(result.uri)
          setImageAlterou(!imageAlterou)
        }
      };

    async function adicionaLista (uri_local){
        let dataHora = new Date().getDate() + '-' + new Date().getMonth() + 1 + '-' + new Date().getFullYear() 
            + '-' + new Date().getHours() + '-' + new Date().getMinutes() + '-' + new Date().getSeconds();

        let uriParts = uri_local.split('.');
        let fileType = uriParts[uriParts.length - 1];  
        let name = 'servico-' + dataHora + '.' + fileType
        let clientName = `servico-` + dataHora + '.' + fileType
        let type =  'image/' + fileType
        let uri = Platform.OS === "android" ? uri_local : uri_local.replace("file://", "")

        var lista2 = 
            {
                id: (imagens.length > 0 ? imagens[imagens.length - 1].id + 1 : imagens.length + 1).toString(),
                uri_local: uri_local,
                name: name,
                clientName: clientName,
                type: type,
                uri: uri
            }
        imagens.push(lista2);
    }

    async function removeLista(cod){
        var novaLista = imagens.filter((item) => item.id !== cod)
        setImagens(novaLista)
        setImageAlterou(!imageAlterou)
    }

    const createTwoButtonAlert = (cod) =>
    Alert.alert(
      "Remover imagem",
      "Tem certeza que deseja remover essa imagem?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Confirmar", onPress: () => removeLista(cod) }
      ]
    );

    function validaCampos(){        
        if(servico == '' || detalhes == ''){
            setVazio(true)
            return false
        } else {
            setVazio(false)
            return true
        }        
    }

    function RemoveCaracteresEspec(texto){
        var er = /[^a-z0-9]/gi;
        texto = texto.replace(er, "");
        return texto;
      }

    async function handleSubmit (){        
        if(validaCampos()){
            setCarregando(true);
            try {                
                const data = new FormData();
                data.append('servico_categoria_id', categoria);
                data.append('descricao', servico);
                data.append('detalhes', detalhes);
                data.append('valor', RemoveCaracteresEspec(valor));
                data.append('unidade_medida', unidade_medida);
                data.append('palavra_chave', palavra_chave);
                data.append('imagens_path', imagens);
                imagens.forEach((item, i) => {
                    data.append("imagens[]", item);
                });
                  
                const response = await api.post('/servicoStore', data);
                setCarregando(false);
                Alert.alert('Sucesso','Serviço cadastrado com sucesso!')
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
            <FlatList
                data={imagens}
                extraData={imageAlterou}
                style={{height: imagens.length > 0 ? dimensions.window.height / 3 : 0, marginTop: 10}}
                horizontal={true}
                renderItem={({item}) =>
                  <View style={{
                    backgroundColor: 'transparent',
                    alignSelf: 'center',
                    alignItems: 'center',
                    alignContent: 'center'
                  }}>
                    <Pressable
                        onLongPress={() => {
                            console.log('pressionou');
                            createTwoButtonAlert(item.id)
                        }}>
                    <Image
                        key={item.id}
                        style={{
                        alignSelf: 'stretch',
                        height: dimensions.window.height / 3,
                        width: dimensions.window.width / 2,
                        margin: 15,
                        justifyContent: 'center',
                        resizeMode: "contain",
                        }}
                        source={{uri: item.uri_local}}
                    />
                    </Pressable>
                  </View>
              }
                keyExtractor={item => item.id.toString()} 
                numColumns={1}
            />
            <HelperText type="info" visible={imagens.length > 0} style={{alignSelf: 'flex-end'}}>
                Para deletar pressione a imagem por alguns segundos
            </HelperText>
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

            <TextInput
                label= {'Categoria do Serviço'}
                onChangeText={text => setCategoria(text)}
                value={categoria}

                type="flat"
                mode="outlined"
                selectionColor="#009750"
                underlineColor="#009750"
                  error={vazio && !categoria}
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
                render={
                    props =>
                    <Picker
                        onValueChange={destino => setCategoria(destino)}
                        selectedValue={categoria}                                  
                    >
                    <Picker.Item label='Selecione a categoria' value=''/>
                        {categorias.map(dest =><Picker.Item key={dest.id} label={dest.descricao} value={dest.id}/>)}
                    </Picker>
                }
            />

                <TextInput
                    label= {'Título do Serviço'}
                    placeholder={'Pintor'}
                    autoCapitalize='sentences'
                    autoCorrect={true}
                    onChangeText={text => setServico(text)}
                    value={servico}

                    type="flat"
                    mode="outlined"
                    error={vazio && !servico}
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
                    style={{paddingTop: 5}}
                />
                <HelperText type="info" visible={!servico}>
                    Campo obrigatório!
                </HelperText>
                <TextInput
                    label= {'Descrição do Serviço'}
                    placeholder={'Pintura residencial...'}
                    autoCapitalize='sentences'
                    autoCorrect={true}
                    onChangeText={text => setDetalhes(text)}
                    value={detalhes}
                    multiline={true}

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
                />
                <TextInput
                    label= {'Unidade de Medida'}
                    placeholder={'Metros quadrados'}
                    autoCapitalize='sentences'
                    autoCorrect={true}
                    onChangeText={text => setUnidadeMedida(text)}
                    value={unidade_medida}

                    type="flat"
                    mode="outlined"
                    // error={vazio && !unidade_medida}
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
                    style={{
                        marginTop: 10,
                    }}
                />
                <TextInput
                    label= {'Palavras Chaves'}
                    placeholder={'Palavras que lembrem o serviço prestado'}
                    autoCapitalize='sentences'
                    autoCorrect={true}
                    onChangeText={text => setPalavraChave(text)}
                    value={palavra_chave}

                    type="flat"
                    mode="outlined"
                    error={vazio && !palavra_chave}
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
                    style={{
                        marginTop: 10,
                    }}
                />
                <HelperText type="info" visible={!palavra_chave}>
                    Campo obrigatório!
                </HelperText>

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

                <View style={{marginBottom: 100}}/>
            </ScrollView>
        </KeyboardAvoidingView>
)
};

export default app;