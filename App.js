import React, { useEffect, useState } from 'react';
import { View,
  Share,
  Image,
  TouchableOpacity
} from 'react-native';
import { Title, } from 'react-native-paper';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking'
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Menu from './src/screens/menu';
import Login from './src/screens/login';
import Login2 from './src/screens/login-2';
import Perfil from './src/screens/perfil';

import CartaoCadastro from './src/screens/cartaoCadastro';

import ServicoDetalhes from './src/screens/servicoDetalhes';
import ServicoCadastro from './src/screens/servicoCadastro';

import VagaEmpregoCadastro from './src/screens/vagaEmpregoCadastro';
import VagaEmpregoLista from './src/screens/vagaEmpregoLista';

import Chat from './src/screens/chat';
import ChatLista from './src/screens/chatLista';

import api from './src/services/api';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  useEffect(() => {
    async function estaLogado(){
      try{
        setLogado(false)
        const log = await AsyncStorage.getItem('@localize-token');
        if(log){
            const response = await api.get('/loginCheck');
            console.log(response.data);
            if(response.data){
                setLogado(true)
                // gravaTokenUser()
                // navigation.navigate('Perfil')
            }
        }
        return false
      }catch(err){
          console.log(err);
          return false
      }
    }

    estaLogado()
  },[logado])
  const [logado, setLogado] = React.useState(false);
  async function temToken(){
    try{
      const log = await AsyncStorage.getItem('@localize-token');
      if(log){
        console.log('logado');
        setLogado(true)
      }else{
        console.log('nao logado');
        setLogado(false)
      }
    }catch(err){
        console.log(err);
        console.log('nao logado');
        setLogado(false)
    }
  }
  async function logout(){
    try{
        await AsyncStorage.removeItem('@localize-token');
        
    } catch(err){
        console.log(`erro logout:` + err);
    }
  }

  async function onShare(){
    try {
      const result = await Share.share({
        message: 'Venha conhecer nosso APP e ter várias informações úteis '
          +`sobre oportunidades de trabalho, cidade e sobre a ACIAU.`
          +`\n\n`
          +`Android:`
          +`\n https://play.google.com/store/apps/details?id=com.desenvolvetech.aciau`
          +`\n\n`
          +`IOS:`
          +`\n https://apps.apple.com/us/app/id1521540669`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  function CustomDrawerContent({ navigation }) {
    return (
      <View style={{
        flex: 1,
        fontSize: Constants.systemFonts.size,
        fontStyle: Constants.systemFonts.style,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#fff',
      }}>
        <LinearGradient
          style={{
            height: '100%',
            width: '100%',
          }}
          colors={['#345D7E','#F27281', '#F8B195']}
        >

      {/* <StatusBar barStyle="default" /> */}
      <View style={{paddingTop: Constants.statusBarHeight}}/>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer()) }>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 5,
          borderBottomColor: 'transparent',
          justifyContent: 'flex-start',
          backgroundColor: 'transparent'
        }}>
            <Image 
              style={{
                alignSelf: 'stretch',
                height: 40,
                width: 30,
                margin: 15,
                justifyContent: 'flex-end',
                resizeMode: "contain",
                backgroundColor: 'transparent'
              }}
              source={require('./src/Images/aba_lateral/back-b.png')} 
            />
            <Image
              style={{
                alignItems: 'stretch',
                alignSelf: 'center',
                alignContent: 'stretch',
                backgroundColor: '#fff',
                resizeMode: 'contain',
                height: `80%`,
                width: `70%`,
                backgroundColor: 'transparent',
              }}
              source={require('./src/Images/logo_completa.png')}
            />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Menu') }>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 5,
          borderBottomColor: 'transparent',
          justifyContent: 'flex-start',
        }}>      
          <Image 
            style={{
              alignSelf: 'stretch',
              height: 35,
              width: 35,
              margin: 15,
              justifyContent: 'flex-end',
              resizeMode: "contain",
            }}
            source={require('./src/Images/aba_lateral/home-b.png')} 
            />

          <Title
            style={{
              backgroundColor: 'transparent',
              textAlignVertical: 'center',
              justifyContent: 'center',
              textAlign: 'justify',
              color: '#fff',
            }}
            title="Dashboard"
          >
            Início
          </Title>
        </View>
      </TouchableOpacity>
      <View style={{
        backgroundColor: '#fff',
        height: 1,
        alignSelf: "center",
        width: "100%",
      }}/>
      <TouchableOpacity onPress={() => {
          temToken()
          console.log(logado);
          logado ? navigation.navigate('Perfil') : navigation.navigate('Login')
        }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 5,
          borderBottomColor: 'transparent',
          justifyContent: 'flex-start',
        }}>      
          <Image 
            style={{
              alignSelf: 'stretch',
              height: 35,
              width: 35,
              margin: 15,
              justifyContent: 'flex-end',
              resizeMode: "contain",
            }}
            source={require('./src/Images/aba_lateral/perfil-b.png')} 
            />

          <Title
            style={{
              backgroundColor: 'transparent',
              textAlignVertical: 'center',
              justifyContent: 'center',
              textAlign: 'justify',
              color: '#fff',
            }}
            title="Dashboard"
          >
            Perfil
          </Title>
        </View>
      </TouchableOpacity>
      <View style={{
        backgroundColor: '#fff',
        height: 1,
        alignSelf: "center",
        width: "100%",
      }}/>
      <TouchableOpacity onPress={() => navigation.navigate('VagaEmpregoLista') }>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 5,
          borderBottomColor: 'transparent',
          justifyContent: 'flex-start',
        }}>      
          <Image 
            style={{
              alignSelf: 'stretch',
              height: 35,
              width: 35,
              margin: 15,
              justifyContent: 'flex-end',
              resizeMode: "contain",
            }}
            source={require('./src/Images/aba_lateral/emprego.png')} 
            />

          <Title
            style={{
              backgroundColor: 'transparent',
              textAlignVertical: 'center',
              justifyContent: 'center',
              textAlign: 'justify',
              color: '#fff',
            }}
            title="Dashboard"
          >
            Vagas de Emprego
          </Title>
        </View>
      </TouchableOpacity>
      <View style={{
        backgroundColor: '#fff',
        height: 1,
        alignSelf: "center",
        width: "100%",
      }}/>
      <TouchableOpacity onPress={() => onShare() }>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 5,
          borderBottomColor: 'transparent',
          justifyContent: 'flex-start',
        }}>      
          <Image 
            style={{
              alignSelf: 'stretch',
              height: 35,
              width: 35,
              margin: 15,
              justifyContent: 'flex-end',
              resizeMode: "contain",
            }}
            source={require('./src/Images/aba_lateral/compartilhar-b.png')} 
            />

          <Title
            style={{
              backgroundColor: 'transparent',
              textAlignVertical: 'center',
              justifyContent: 'center',
              textAlign: 'justify',
              color: '#fff',
            }}
            title="Desenvolvedor"
          >
            Compartilhar APP
          </Title>
        </View>
      </TouchableOpacity>
      <View style={{
        backgroundColor: '#fff',
        height: 1,
        alignSelf: "center",
        width: "100%",
      }}/>
      <TouchableOpacity onPress={() => Linking.openURL('mailto:desenvolvetech.contato@gmail.com?subject=Contato sobre app Localize') }>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 5,
          borderBottomColor: 'transparent',
          justifyContent: 'flex-start',
        }}>      
          <Image 
            style={{
              alignSelf: 'stretch',
              height: 35,
              width: 35,
              margin: 15,
              justifyContent: 'flex-end',
              resizeMode: "contain",
            }}
            source={require('./src/Images/aba_lateral/bug-report-b.png')} 
            />

          <Title
            style={{
              backgroundColor: 'transparent',
              textAlignVertical: 'center',
              justifyContent: 'center',
              textAlign: 'justify',
              color: '#fff',
            }}
            title="Desenvolvedor"
          >
            Contate nos
          </Title>
        </View>
      </TouchableOpacity>
      <View style={{
        backgroundColor: '#fff',
        height: 1,
        alignSelf: "center",
        width: "100%",
      }}/>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 5,
          borderBottomColor: 'transparent',
          justifyContent: 'flex-start',
        }}>      
          <Image 
            style={{
              alignSelf: 'stretch',
              height: 35,
              width: 35,
              margin: 15,
              justifyContent: 'flex-end',
              resizeMode: "contain",
            }}
            source={require('./src/Images/aba_lateral/info-b.png')} 
            />

          <Title
            style={{
              backgroundColor: 'transparent',
              textAlignVertical: 'center',
              justifyContent: 'center',
              textAlign: 'justify',
              color: '#fff',
            }}
            title="Versão"
          >
            Versão {Constants.nativeAppVersion}
          </Title>
        </View>
        <View style={{
          backgroundColor: '#fff',
          height: 1,
          alignSelf: "center",
          width: "100%",
        }}/>
        </LinearGradient>
    </View>
    );
  }

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator 
        independent={true}
        headerShown={false}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        initialRouteName={Menu}
      >
        <Drawer.Screen name="Menu" component={Menu}/>
        <Drawer.Screen name="ServicoDetalhes" component={ServicoDetalhes}/>
        <Drawer.Screen name="ServicoCadastro" component={ServicoCadastro}/>
        <Drawer.Screen name="Login" component={Login}/>
        <Drawer.Screen name="Login2" component={Login2}/>
        <Drawer.Screen name="Perfil" component={Perfil}/>
        <Drawer.Screen name="CartaoCadastro" component={CartaoCadastro}/>
        <Drawer.Screen name="VagaEmpregoCadastro" component={VagaEmpregoCadastro}/>
        <Drawer.Screen name="VagaEmpregoLista" component={VagaEmpregoLista}/>
        <Drawer.Screen name="Chat" component={Chat}/>
        <Drawer.Screen name="ChatLista" component={ChatLista}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;