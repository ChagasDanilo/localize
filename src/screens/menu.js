import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  FlatList,
} from 'react-native';
import { Title,
    Subheading,
    Text,
    Searchbar,
    Appbar,
    Headline,
    Button,
    Surface
} from 'react-native-paper';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import Constants from 'expo-constants';
import { AirbnbRating } from 'react-native-ratings';
import { DrawerActions } from '@react-navigation/native';

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

  const [lista , setLista ] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [titulo, setTitulo] = useState('Carregando...');
  const [mensagem, setMensagem] = useState('Favor, aguarde enquanto processamos os dados!');

  const [exibeBarraPesquisa, setExibeBarraPesquisa] = useState(false);

  useEffect(()=>{
    const handelGetData  = async () =>{
      try{
        const response = await api.get('/servicoShow');

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

  function retornaValor(valor){
    if(valor > 0){
      return 'R$ ' + valor
    }else{
      return 'Preço a combinar'
    }
  }

  // const alturaStatusBar = Platform.OS == 'IOS' ? Constants.statusBarHeight : 0;

  const emptyRender = () => (      
    <View
      style={{
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
              borderColor: '#345D7E'
          }}
          labelStyle={{
            color: '#345D7E'
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

  return(
  <View style={{
    flex: 1,
    fontSize: Constants.systemFonts.size,
    fontStyle: Constants.systemFonts.style,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#f2f2f2',
    // borderBottomWidth: 20,
    borderColor: '#333'
  }}>
  <Appbar.Header
  // statusBarHeight={Constants.statusBarHeight}
  style={{
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#345D7E',
  }}>
    <Appbar.Action icon="menu" color={'#345D7E'} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
    <Appbar.Content title={<Title style={{color: '#345D7E', fontWeight: 'bold'}}>Localize</Title>} />
    <Appbar.Action icon={exibeBarraPesquisa ? require('../Images/icones_view/search-cancel.png') : require('../Images/icones_view/search.png')} color={'#345D7E'} onPress={() => setExibeBarraPesquisa(!exibeBarraPesquisa)} />
  </Appbar.Header>
  <StatusBar barStyle="default" />

  {exibeBarraPesquisa ?
  <Searchbar
    placeholder="Pesquise por palavras chaves"
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
  : null }
  <FlatList
      data={lista}
      ListEmptyComponent={emptyRender}
      // style={{height: 100}}
      renderItem={({item}) =>
      <TouchableOpacity
        onPress={() => navigation.navigate('ServicoDetalhes')}
      >
        <Surface style={{
          width: dimensions.window.width - 20,
          margin: 10,
          marginTop: 15,
          backgroundColor: "#fff",
          borderRadius: 5,
          //ios    
          shadowOpacity: 0.3,
          shadowRadius: 3,
          shadowOffset: {
              height: 0,
              width: 0
          },
          //Android
          elevation: 10,
        }}>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Image 
              style={{
                width: "30%",
                height: dimensions.window.height / 6,
                margin: 10,
                resizeMode: "contain",
                alignSelf: "flex-start",
                backgroundColor: '#f2f2f2'
              }}
              source={require('../Images/icones_view/pintor.png')}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                // alignContent: 'space-between',
                height: '100%'
              }}
            >
              <Title style={{
                backgroundColor: 'transparent',
                textAlignVertical: 'center',
                textAlign: 'left',
                margin: 10,
                justifyContent: 'flex-start',
                color: '#345D7E'
              }}>
                {item.descricao}
              </Title>
              <Subheading style={{
                backgroundColor: 'transparent',
                textAlignVertical: 'center',
                textAlign: 'left',
                margin: 10,
                justifyContent: 'flex-start',
                color: '#F8B195'
              }}>
                {retornaValor(item.valor)}
              </Subheading>
              {item.estrelas > 0 ?
              <AirbnbRating
                count={5}
                reviews={["Horrível", "Ruim", "Neutro", "Bom", "Ótimo"]}
                defaultRating={item.estrelas}
                size={20}
                selectedColor={'#F27281'}
                reviewColor={'#F27281'}
                reviewSize={0}
                isDisabled={true}
              />
              :
              <Subheading style={{
                backgroundColor: 'transparent',
                textAlignVertical: 'center',
                textAlign: 'left',
                justifyContent: 'flex-start',
                color: '#F27281',
                margin: 10,
              }}>
                Sem classificação
              </Subheading>
              }
            </View>
          </View>
        </Surface>
      </TouchableOpacity>
    }
      keyExtractor={item => item.id.toString()} 
      numColumns={1}
  />
  </View>
)};

export default Menu;