import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
// import * as Linking from 'expo-linking'
// import * as WebBrowser from 'expo-web-browser';
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants';
// import * as Permissions from 'expo-permissions';
import { Appbar, Headline, Subheading, Title, Button, } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import api from '../services/api';
// import Styles from './utils/style';

const Menu = ({ navigation }) => {

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
  
  return(
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
      <Appbar.Content title={<Title style={{color: '#345D7E', fontWeight: 'bold'}}>Serviço</Title>} />
    </Appbar.Header>
  <ScrollView>

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

    <Headline style={{
        backgroundColor: 'transparent',
        textAlignVertical: 'center',
        textAlign: 'center',
        marginBottom: 10,
        justifyContent: 'flex-start',
        color: '#345D7E'
    }}>
        Pintor residencial
    </Headline>
    <Subheading style={{
        backgroundColor: 'transparent',
        textAlignVertical: 'center',
        textAlign: 'justify',
        justifyContent: 'center',
        color: '#345D7E',
        margin: 20,
    }}>
        Pintor profissional O Fabuloso Gerador de Lero-lero v2.0 é capaz de gerar qualquer quantidade de texto vazio e prolixo, ideal para engrossar uma tese de mestrado, impressionar seu chefe ou preparar discursos capazes de curar a insônia da platéia. Basta informar um título pomposo qualquer (nos moldes do que está sugerido aí embaixo) e a quantidade de frases desejada. Voilá! Em dois nano-segundos você terá um texto - ou mesmo um livro inteiro - pronto para impressão. Ou, se preferir, faça copy/paste para um editor de texto para formatá-lo mais sofisticadamente. Lembre-se: aparência é tudo, conteúdo é nada.
    </Subheading>
    <Subheading style={{
        backgroundColor: 'transparent',
        textAlignVertical: 'center',
        textAlign: 'left',
        justifyContent: 'center',
        color: '#F27281',
        margin: 20,
    }}>
        Valor a ser combinado de acordo com o serviço
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
      onPress={() => navigation.navigate('Chat')}
    >
      Contratar Serviços
    </Button>

  </ScrollView>
  </View>
)};

export default Menu;