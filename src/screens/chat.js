import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import Constants from 'expo-constants';
import { Appbar, Headline, Subheading, Title, Button, TextInput, IconButton } from 'react-native-paper';

import api from '../services/api';

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

  async function handleSubmit (){
    try {
      const data = {                    
        mensagem : mensagem,
        user_id_destinatario: route.params.servico_user_id,
      }

        const response = await api.post('/chatStore', data);
        buscaMensagens()
    } catch (error) {
      console.log(error);
    }
  }

  async function buscaMensagens(){
    try{
      const response = await api.get('/chatIndex?cod='+9);
      console.log(response.data);
      setLista(response.data);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    const handelGetData  = async () =>{
      try{
        const response = await api.get('/chatIndex?cod='+9);
        console.log(response.data);
        setLista(response.data);
      }catch(err){
        console.log(err);
      }
    }
    handelGetData();
  },[])

  const [lista , setLista ] = useState([]);
  const [mensagem, setMensagem] = useState('');

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
      <Appbar.Content title={<Title style={{color: '#345D7E', fontWeight: 'bold'}}>Chat</Title>} />
    </Appbar.Header>
    <FlatList
      data={lista}
      // style={{height: 100}}
      renderItem={({item}) =>
      <View>
        <Subheading style={{
          backgroundColor: 'transparent',
          textAlignVertical: 'center',
          textAlign: 'justify',
          justifyContent: 'center',
          color: '#345D7E',
          margin: 10,
          width: dimensions.window.width / 1.4,
          paddingEnd: 10,
          paddingStart: 10,
          borderWidth: 1,
          borderColor: '#345D7E',
          borderRadius: 10,
          marginTop: 10,
        }}>
          {item.mensagem}
        </Subheading>

        <Subheading style={{
          backgroundColor: 'transparent',
          textAlignVertical: 'center',
          textAlign: 'justify',
          justifyContent: 'center',
          color: '#F27281',
          margin: 10,
          width: dimensions.window.width / 1.4,
          paddingEnd: 10,
          paddingStart: 10,
          borderWidth: 1,
          borderColor: '#F27281',
          borderRadius: 10,
          alignSelf: 'flex-end',
          marginTop: 10,
        }}>
          {item.mensagem}
        </Subheading>
      </View>
    }
      keyExtractor={item => item.id.toString()} 
      numColumns={1}
  />

  <View
    style={{
        flexDirection: 'row',
        padding: 10,
        paddingBottom: 20,
    }}>
    <TextInput
        label= "Digite uma mensgem"
        placeholder='Digite uma mensagem'
        secureTextEntry={false}
        autoCapitalize='sentences'
        autoCorrect={true}
        onChangeText={text => setMensagem(text)}
        value={mensagem}

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
        style={{
            width: '85%',
        }}
    />
    <IconButton
        icon="send"
        color={'#345D7E'}
        size={35}
        disabled={!mensagem}
        onPress={() => handleSubmit()}
        style={{
            justifyContent: 'center',
            alignSelf: 'center',
            width: '13%',
            borderWidth: 1,
            borderColor: '#345D7E',
        }}
    />
  </View>
  </View>
)};

export default Menu;