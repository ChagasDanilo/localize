import AsyncStorage from '@react-native-async-storage/async-storage';

module.exports ={
    async isAuth(){        
      return await AsyncStorage.getItem('@aciau-token') ? true : false
    },
    async token(){        
      return await AsyncStorage.getItem('@aciau-token')
    }
  }