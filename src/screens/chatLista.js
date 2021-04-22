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
import { Title, Subheading, Surface, Appbar, Button} from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';

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
    backgroundColor: '#f2f2f2',
    // paddingBottom: 20,
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
      <Appbar.Content title={<Title style={{color: '#345D7E', fontWeight: 'bold'}}>Chats</Title>} />
    </Appbar.Header>
  <ScrollView>
    <Surface style={{
      width: dimensions.window.width - 20,
      margin: 10,
      borderWidth: 4,
      borderColor: `rgba(242, 242, 242, 0.9)`,
      borderRadius: 20,
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "rgba(0, 0, 0, 0.2)",
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
      <Image 
        style={{
          width: "30%",
          margin: 10,
          resizeMode: "contain",
          alignSelf: "center",
        }}
      />
      <Title style={{
        backgroundColor: 'transparent',
        textAlignVertical: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
      }}>
        Pintor Residencial
      </Title>
      <View style={{
        borderBottomWidth: 10,
        borderColor: '#fff'
      }}/>
      <Image
        style={{
          alignSelf: 'stretch',
          height: dimensions.window.height / 8,
          width: dimensions.window.width - 40,
          margin: 15,
          justifyContent: 'center',
          resizeMode: "contain",
        }}
        source={require('../Images/icones_view/pintor.png')}
      />
      <View style={{
        borderBottomWidth: 20,
        borderColor: '#fff'
      }}/>

      <Button 
        //icon="login" 
        mode="outlined" 
        color="#F27281"
        loading={false}
        uppercase={true}
        accessibilityLabel="Conversar"
        style={{
          //height: 55,
          justifyContent: 'center',
          alignContent: 'stretch',
          alignSelf: 'center',
          borderColor: '#F27281',
          borderWidth: 1,
        }}
        contentStyle={{
          height: 51,
          width: dimensions.window.width - 40,
          justifyContent: 'center',
          alignContent: 'stretch'
        }}
        onPress={() => navigation.navigate('Chat')}
      >
        Conversar
      </Button>
      <View style={{
        borderBottomWidth: 20,
        borderColor: '#fff'
      }}/>
    </Surface>

    <Surface style={{
      width: dimensions.window.width - 20,
      margin: 10,
      borderWidth: 4,
      borderColor: `rgba(242, 242, 242, 0.9)`,
      borderRadius: 20,
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "rgba(0, 0, 0, 0.2)",
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
      <Image 
        style={{
          width: "30%",
          margin: 10,
          resizeMode: "contain",
          alignSelf: "center",
        }}
      />
      <Title style={{
        backgroundColor: 'transparent',
        textAlignVertical: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
      }}>
        Eletricista
      </Title>
      <View style={{
        borderBottomWidth: 10,
        borderColor: '#fff'
      }}/>
      <Image
        style={{
          alignSelf: 'stretch',
          height: dimensions.window.height / 8,
          width: dimensions.window.width - 40,
          margin: 15,
          justifyContent: 'center',
          resizeMode: "contain",
        }}
        source={require('../Images/icones_view/eletricista.png')}
      />
      <View style={{
        borderBottomWidth: 20,
        borderColor: '#fff'
      }}/>

      <Button 
        //icon="login" 
        mode="outlined" 
        color="#F27281"
        loading={false}
        uppercase={true}
        accessibilityLabel="Conversar"
        style={{
          //height: 55,
          justifyContent: 'center',
          alignContent: 'stretch',
          alignSelf: 'center',
          borderColor: '#F27281',
          borderWidth: 1,
        }}
        contentStyle={{
          height: 51,
          width: dimensions.window.width - 40,
          justifyContent: 'center',
          alignContent: 'stretch'
        }}
        onPress={() => navigation.navigate('Chat')}
      >
        Conversar
      </Button>
      <View style={{
        borderBottomWidth: 20,
        borderColor: '#fff'
      }}/>
    </Surface>

  </ScrollView>
  </View>
)};

export default Menu;