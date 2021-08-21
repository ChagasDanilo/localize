import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Alert,
  FlatList
} from 'react-native';
import Constants from 'expo-constants';
import { Appbar, Headline, Subheading, Title, Button, } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AirbnbRating } from 'react-native-ratings';

import api from '../services/api';
// import Styles from './utils/style';

const Menu = ({ navigation, route }) => {

  const window = Dimensions.get("window");
  const screen = Dimensions.get("screen");

  const [dimensions, setDimensions] = useState({ window, screen });

  const [lista, setLista] = useState([]);
  const [listaImagem, setListaImagem] = useState([]);

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  useEffect(() => {
    const handelGetData = async () => {
      try {
        const response = await api.get('/servicoIndex?cod=' + route.params.id_servico);

        setLista(response.data);
      } catch (err) {
        Alert.alert('Sem conexão', 'Verifique sua conexão com a internet!')
      }
    }
    const handelGeImage = async () => {
      try {
        const response = await api.get('/servicoImagemIndex?cod=' + route.params.id_servico);

        setListaImagem(response.data);
      } catch (err) {
        Alert.alert('Erro', 'Não foi possível recuperar as imagens')
      }
    }
    handelGetData();
  }, [])

  async function temToken() {
    try {
      const log = await AsyncStorage.getItem('@localize-token');
      if (log) {
        const response = await api.get('/loginCheck');
        console.log(response.data.id);
        if (response.data.id > 0) {
          navigation.navigate('Chat')
          return true
        }
        navigation.navigate('Login2')
        return false
      }
      navigation.navigate('Login2')
      return false
    } catch (err) {
      console.log(err);
      return false
    }
  }

  function retornaValor(valor) {
    if (valor > 0) {
      return 'R$ ' + valor
    } else {
      return 'Preço a combinar'
    }
  }

  return (
    <View style={{
      flex: 1,
      fontSize: Constants.systemFonts.size,
      fontStyle: Constants.systemFonts.style,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      backgroundColor: '#fff',
      // borderBottomWidth: 20,
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
        <Appbar.Content title={<Title style={{ color: '#345D7E', fontWeight: 'bold' }}>Serviço</Title>} />
      </Appbar.Header>
      <FlatList
        data={lista}
        // ListEmptyComponent={emptyRender}
        // style={{height: 100}}
        renderItem={({ item }) =>

          <View>
            <Image
              style={{
                width: "95%",
                height: dimensions.window.height / 4,
                resizeMode: "contain",
                alignSelf: "center",
                backgroundColor: '#f2f2f2',
                marginTop: 10,
                marginBottom: 10,
              }}
              source={require('../Images/icones_view/pintor.png')}
            />

            <FlatList
              data={listaImagem}
              // ListEmptyComponent={emptyRender}
              // style={{height: 100}}
              renderItem={({ item }) =>

                <Image
                  style={{
                    width: "95%",
                    height: dimensions.window.height / 4,
                    resizeMode: "contain",
                    alignSelf: "center",
                    backgroundColor: '#f2f2f2',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  source={require('../Images/icones_view/pintor.png')}
                />


              }
              keyExtractor={item => item.id.toString()}
              numColumns={1}
            />
            <Headline style={{
              backgroundColor: 'transparent',
              textAlignVertical: 'center',
              textAlign: 'center',
              marginBottom: 10,
              justifyContent: 'flex-start',
              color: '#345D7E'
            }}>
              {item.descricao}
            </Headline>
            <Subheading style={{
              backgroundColor: 'transparent',
              textAlignVertical: 'center',
              textAlign: 'justify',
              justifyContent: 'center',
              color: '#345D7E',
              margin: 20,
            }}>
              {item.detalhes}
            </Subheading>
            <Subheading style={{
              backgroundColor: 'transparent',
              textAlignVertical: 'center',
              textAlign: 'left',
              justifyContent: 'center',
              color: '#F27281',
              margin: 20,
            }}>
              {retornaValor(item.valor)}
            </Subheading>

            <Button
              //   icon="accept" 
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
                marginTop: 20,
                marginStart: 20,
                marginEnd: 20,
                borderWidth: 1,
                borderColor: '#345D7E'
              }}
              labelStyle={{
                color: '#345D7E'
              }}
              onPress={() => temToken()}
            >
              Contratar Serviços
            </Button>
          </View>
        }
        keyExtractor={item => item.id.toString()}
        numColumns={1}
      />
    </View>
  )
};

export default Menu;