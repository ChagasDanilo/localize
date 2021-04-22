import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import Constants from 'expo-constants';
import { Title, Subheading, Surface, Appbar, } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';
import { DrawerActions } from '@react-navigation/native';

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

  // const alturaStatusBar = Platform.OS == 'IOS' ? Constants.statusBarHeight : 0;

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
  </Appbar.Header>
  <ScrollView>
  <StatusBar barStyle="default" />

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
            Pintor residencial
          </Title>
          <Subheading style={{
            backgroundColor: 'transparent',
            textAlignVertical: 'center',
            textAlign: 'left',
            margin: 10,
            justifyContent: 'flex-start',
            color: '#F8B195'
          }}>
            Valor a combinar
          </Subheading>
          <AirbnbRating
            count={5}
            reviews={["Horrível", "Ruim", "Neutro", "Bom", "Ótimo"]}
            defaultRating={3}
            size={20}
            selectedColor={'#F27281'}
            reviewColor={'#F27281'}
            reviewSize={0}
            isDisabled={true}
          />
        </View>
      </View>
    </Surface>
    </TouchableOpacity>

    <Surface style={{
      width: dimensions.window.width - 20,
      margin: 10,
      marginTop: 5,
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
          source={require('../Images/icones_view/faxineira.png')}
        />
        <View
          style={{
            flexDirection: 'column',
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
            Faxineira diarista
          </Title>
          <Subheading style={{
            backgroundColor: 'transparent',
            textAlignVertical: 'center',
            textAlign: 'left',
            margin: 10,
            justifyContent: 'flex-start',
            color: '#F8B195'
          }}>
            R$ 100 diária
          </Subheading>
          <AirbnbRating
            count={5}
            reviews={["Horrível", "Ruim", "Neutro", "Bom", "Ótimo"]}
            defaultRating={4}
            size={20}
            selectedColor={'#F27281'}
            reviewColor={'#F27281'}
            reviewSize={0}
            isDisabled={true}
          />
        </View>
      </View>
    </Surface>

    <Surface style={{
      width: dimensions.window.width - 20,
      margin: 10,
      marginTop: 5,
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
          source={require('../Images/icones_view/eletricista.png')}
        />
        <View
          style={{
            flexDirection: 'column',
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
            Eletricista
          </Title>
          <Subheading style={{
            backgroundColor: 'transparent',
            textAlignVertical: 'center',
            textAlign: 'left',
            margin: 10,
            justifyContent: 'flex-start',
            color: '#F8B195'
          }}>
            Valor a combinar
          </Subheading>
          <AirbnbRating
            count={5}
            reviews={["Horrível", "Ruim", "Neutro", "Bom", "Ótimo"]}
            defaultRating={5}
            size={20}
            selectedColor={'#F27281'}
            reviewColor={'#F27281'}
            reviewSize={0}
            isDisabled={true}
          />
        </View>
      </View>
    </Surface>

  </ScrollView>
  </View>
)};

export default Menu;