/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';

import Navigation from './src/navigation/Navigation';
import GlobalContext from './src/config/context';

import cartData from './src/config/cart.json';

const App = () => {
  const [cart, setCart] = useState([]);

  const initialContext = {
    cart,
    setCart,
  };

  return (
    <GlobalContext.Provider value={initialContext}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </NativeBaseProvider>
    </GlobalContext.Provider>
  );
};

export default App;
