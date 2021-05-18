import React, { useEffect, useState } from 'react';
import { View,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    Image,
    Dimensions
} from 'react-native';
import moment from "moment";
import * as Linking from 'expo-linking'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { Title,
    Subheading,
    Text,
    Searchbar,
    Appbar,
    Headline,
    Button
} from 'react-native-paper';
import Constants from 'expo-constants';

import api from '../services/api';

const App = ({ navigation, route }) => {

    const [lista , setLista ] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const [titulo, setTitulo] = useState('Carregando...');
    const [mensagem, setMensagem] = useState('Favor, aguarde enquanto processamos os dados!');

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

    useEffect(()=>{
        const handelGetData  = async () =>{
          try{
            const response = await api.get('/vagaEmpregoShow');

            setLista(response.data);
            if(response.data.length <= 0){
              setTitulo('Ops')
              setMensagem('Nenhum registro encontrado')
            }
          }catch(err){
            setTitulo('Sem conexão')
            setMensagem('Verifique sua conexão com a internet')
          }
        }
        handelGetData();
      },[]) 
      
      async function refresh (){
        if(pesquisa != ''){
          consultar();
        }else{
          setRefreshing(true);
          try{
            const response = await api.get('/vagaEmpregoShow');
            
            setLista(response.data);
            if(response.data.length <= 0){
              setTitulo('Ops')
              setMensagem('Nenhum registro encontrado')
            }
          }catch(err){
            setTitulo('Sem conexão')
            setMensagem('Verifique sua conexão com a internet')
          }
          setTimeout(() =>{
            setRefreshing(false)
          },1000);
        }
        //setRefreshing(false)
      }
      
      function retornaValor(valor){
        var vlr;
        var er2 = /[^0-9]/gi;
        vlr = valor.replace(er2, ",");
            
        return 'R$ ' + vlr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      }
      function RemoveCaracteresEspec(texto){
        var er = /[^a-z0-9]/gi;
        texto = texto.replace(er, "");
        return texto;
      }
      
      async function consultar(){
        try{
          setRefreshing(true);
          const response = await api.get('/vagaEmpregoLike?texto='+pesquisa);
              
          setLista(response.data);
          setRefreshing(false);
          if(response.data.length <= 0){
            setRefreshing(false);
            setTitulo('Ops')
            setMensagem('Nenhum registro encontrado')
          }
        }catch(err){
          setRefreshing(false);
          setTitulo('Sem conexão')
          setMensagem('Verifique sua conexão com a internet')
        }    
      }

      const emptyRender = () => (      
        <View
          style={{
            backgroundColor: 'transparent',
            margin: 18,
            marginTop: 13,
            marginBottom: 0,
            borderRadius: 3,
            padding: 5,
            borderColor: '#009750',
            borderWidth: 1,
            borderEndWidth: 6,
            borderStartWidth: 6,
          }}
        >
            <Subheading style={{
                backgroundColor: 'transparent',
                textAlignVertical: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontWeight: 'bold',
            }}>
              {titulo}
            </Subheading>
            <Headline style={{
                alignSelf: 'center',
                textAlign: 'center',
                backgroundColor: 'transparent',
                fontWeight: 'bold',
                paddingStart: 10,
                marginTop : 5,
            }}>
                {mensagem}
            </Headline>
            <Button 
              icon="reload" 
              mode="contained"
              color='#fff'
              // loading={carregando}
              uppercase={false}
              accessibilityLabel="Recarregar"
              contentStyle={{
                  height: 40,
                  justifyContent: 'center',
                  alignContent: 'stretch',
                  fontWeight: 'bold',
              }}
              style={{
                  marginTop: 5,
                  marginStart: 20,
                  marginEnd: 20,
                  borderWidth: 1,
                  borderColor: '#009750'
              }}
              labelStyle={{
                color: '#009750'
              }}
              onPress={() => refresh()}
            >
              Recarregar
            </Button>
            <View style={{
              paddingBottom: 8,
            }}/>
        </View>
      );

    return (
        <View style={{
            flex: 1,
            fontSize: Constants.systemFonts.size,
            fontStyle: Constants.systemFonts.style,
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            backgroundColor: '#f2f2f2',
            borderBottomWidth: 20,
            borderColor: '#333'
        }}>
            <Appbar.Header
            style={{
                backgroundColor: '#fff',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0.5,
                borderBottomColor: '#345D7E',
            }}>
                <Appbar.BackAction color={'#345D7E'} onPress={() => navigation.goBack()} />
                <Appbar.Content title={<Title style={{color: '#345D7E', fontWeight: 'bold'}}>Vagas de Emprego</Title>} />
            </Appbar.Header>

          <Searchbar
            placeholder="Pesquise palavras chaves"
            value={pesquisa}
            autoCorrect={false}
            onChangeText={text => setPesquisa(text)}
            onSubmitEditing={() => refresh()}
            onIconPress={() => refresh()}
            style={{
                width: (Dimensions.get("window").width - 20),
                alignSelf:'center',
                marginTop: 10,
            }}
          />
            <FlatList
              refreshControl={
                <RefreshControl 
                  colors={['#345D7E']} 
                  tintColor='#345D7E' 
                  refreshing={refreshing} 
                  onRefresh={refresh}
                  progressBackgroundColor='transparent' />
            }        
                data={lista}
                ListEmptyComponent={emptyRender}
                style={{height: 100}}
                renderItem={({item}) =>
                  <View style={{
                    backgroundColor: 'transparent',
                    margin: 18,
                    marginTop: 13,
                    marginBottom: 0,
                    borderRadius: 3,
                    padding: 5,
                    borderColor: '#345D7E',
                    borderWidth: 1,
                    borderEndWidth: 6,
                    borderStartWidth: 6,
                  }}>
                        <ShimmerPlaceHolder autoRun={true} visible={!refreshing}>
                        <Title style={{
                            alignSelf: 'center',
                            textAlign: 'left',
                            backgroundColor: 'transparent',
                            fontWeight: 'bold',
                            paddingStart: 10,
                            marginTop : 5,
                        }}>
                            {item.vaga}
                        </Title>
                        {item.empresa != ' ' ?
                        <Subheading style={{
                            alignSelf: 'flex-start',
                            textAlign: 'left',
                            backgroundColor: 'transparent',
                            fontWeight: 'bold',
                        }}>                  
                            Empresa:
                        </Subheading>
                        : null}
                        {item.empresa != ' ' ?
                        <Subheading style={{
                            alignSelf: 'flex-start',
                            textAlign: 'left',
                            backgroundColor: 'transparent',
                            paddingStart: 15,
                            marginBottom: 10,
                        }}>
                            {item.empresa}
                        </Subheading>
                        : null}
                        {item.vinculo ? (
                        <Subheading style={{
                            alignSelf: 'flex-start',
                            textAlign: 'left',
                            backgroundColor: 'transparent',
                            fontWeight: 'bold',
                        }}>                  
                            Vínculo:
                        </Subheading>
                        ): null}
                        {item.vinculo ? (
                        <Subheading style={{
                            alignSelf: 'flex-start',
                            textAlign: 'left',
                            backgroundColor: 'transparent',
                            paddingStart: 15,
                            marginBottom: 10,
                        }}>
                            {item.vinculo}
                        </Subheading>
                        ): null}
                        
                        {item.valor > 0 ? (
                        <Subheading style={{
                            alignSelf: 'flex-start',
                            textAlign: 'left',
                            backgroundColor: 'transparent',
                            fontWeight: 'bold',
                        }}>                  
                            Salário:
                        </Subheading>
                        ): null}
                        {item.valor > 0 ? (
                        <Subheading style={{
                            alignSelf: 'flex-start',
                            textAlign: 'left',
                            backgroundColor: 'transparent',
                            paddingStart: 15,
                            marginBottom: 10,
                        }}>                  
                          {retornaValor(item.valor)}
                        </Subheading>   
                        ): null}
                        {item.requisitos ? (
                        <Subheading style={{
                            alignSelf: 'flex-start',
                            textAlign: 'left',
                            backgroundColor: 'transparent',
                            fontWeight: 'bold',
                        }}>                  
                            Requisitos:
                        </Subheading>
                        ): null}
                        {item.requisitos ? (
                        <Subheading style={{
                            alignSelf: 'flex-start',
                            textAlign: 'left',
                            backgroundColor: 'transparent',
                            paddingStart: 15,
                            marginBottom: 10,
                        }}>                  
                            {item.requisitos}
                        </Subheading>
                        ): null}
                        {item.email ? (
                        <Subheading style={{
                            alignSelf: 'flex-start',
                            textAlign: 'left',
                            backgroundColor: 'transparent',
                            fontWeight: 'bold',
                        }}>                  
                            Email:
                        </Subheading>
                        ): null}
                        {item.contato_email ? (
                          <TouchableOpacity 
                          onPress={() => Linking.openURL('mailto:'//+item.email
                            + 'danilochagas009@gmail.com?subject=Currículo enviado a partir do APP&body=Adicionar anexo do currículo')}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderBottomWidth: 5,
                                borderBottomColor: 'transparent',
                            }}>
                                <Image style={{
                                    alignSelf: 'stretch',
                                    height: 20,
                                    width: 20,
                                    margin: 5,
                                    justifyContent: 'center',
                                    resizeMode: "contain",
                                }}
                                  source={require('../Images/icones_view/Email.png')} 
                              /> 
                                <Subheading style={{
                                    backgroundColor: 'transparent',
                                    textAlignVertical: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'justify',
                                }}>
                                {item.contato_email}
                                email
                              </Subheading>
                            </View>
                          </TouchableOpacity>
                        ): null}
                        {item.contato_telefone ? (
                          <TouchableOpacity 
                            onPress={() => Linking.openURL('tel:'+RemoveCaracteresEspec(item.contato_telefone))}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderBottomWidth: 5,
                                borderBottomColor: 'transparent',
                            }}>
                                <Image 
                                    style={{
                                        alignSelf: 'stretch',
                                        height: 20,
                                        width: 20,
                                        margin: 5,
                                        justifyContent: 'center',
                                        resizeMode: "contain",
                                    }}
                                    source={require('../Images/icones_view/Telefone.png')} 
                                /> 
                                <Subheading style={{
                                    backgroundColor: 'transparent',
                                    textAlignVertical: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'justify',}}
                                >
                                    {item.contato_telefone}                     
                                </Subheading>
                            </View>
                          </TouchableOpacity>
                        ): null}
                        
                        <Text style={{
                            alignSelf: 'flex-end',
                            textAlign: 'right',
                            textAlignVertical: 'center',
                            alignContent: 'flex-end',
                            alignItems: 'flex-end',
                            backgroundColor: 'transparent',
                            width: '100%',}}
                        >
                            {moment(item.created_at).format('DD/MM/YYYY')}
                        </Text>
                        </ShimmerPlaceHolder>
                  </View>
              }
                keyExtractor={item => item.id.toString()} 
                numColumns={1}
            />
      </View>
)
};

export default App;