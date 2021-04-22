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
    Appbar, } from 'react-native-paper';
import Constants from 'expo-constants';

const App = ({ navigation, route }) => {

    const [lista , setLista ] = useState([
        {
            id: 1,
            vaga: "Desenvolvedor",
            empresa: 'Desenvolve Tech',
            vinculo: 'CLT',
            salario: '2000.00',
            requisito: 'Resuisitos da vaga',
            email: 'danilochagas009@gmail.com',
            telefone: '(62) 99228-7402'
        },
    ]);
    const [pesquisa, setPesquisa] = useState('');
    const [refreshing, setRefreshing] = useState(false);

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
            placeholder="Pesquisar"
            value={pesquisa}
            autoCorrect={false}
            onChangeText={text => setPesquisa(text)}
            // onSubmitEditing={() => refresh()}
            // onIconPress={() => refresh()}
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
                //   refreshing={refreshing} 
                //   onRefresh={refresh}
                  progressBackgroundColor='transparent' />
            }        
                data={lista}
                // ListEmptyComponent={emptyRender}
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
                        {item.salario > 0 ? (
                        <Subheading style={{
                            alignSelf: 'flex-start',
                            textAlign: 'left',
                            backgroundColor: 'transparent',
                            paddingStart: 15,
                            marginBottom: 10,
                        }}>                  
                          R$ {item.salario}
                        </Subheading>   
                        ): null}
                        <Subheading style={{
                            alignSelf: 'flex-start',
                            textAlign: 'left',
                            backgroundColor: 'transparent',
                            fontWeight: 'bold',
                        }}>                  
                            Requisitos:
                        </Subheading>
                        <Subheading style={{
                            alignSelf: 'flex-start',
                            textAlign: 'left',
                            backgroundColor: 'transparent',
                            paddingStart: 15,
                            marginBottom: 10,
                        }}>                  
                            {item.requisito}
                        </Subheading>
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
                        {item.email ? (
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
                                {item.email}
                                email
                              </Subheading>
                            </View>
                          </TouchableOpacity>
                        ): null}
                        {item.telefone ? (
                          <TouchableOpacity 
                            // onPress={() => Linking.openURL('tel:'+RemoveCaracteresEspec(item.telefone))}>
                            onPress={() => Linking.openURL('tel:992287402')}>
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
                                    {item.telefone}                     
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