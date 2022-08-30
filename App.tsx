import React, {useState} from 'react';
import {NativeBaseProvider} from 'native-base';

import Navigation from './src/navigation/Navigation';
import GlobalContext from './src/config/context';

const inset = {
  frame: {x: 0, y: 0, width: 0, height: 0},
  insets: {top: 0, left: 0, right: 0, bottom: 0},
};
const App = () => {
  const [cart, setCart] = useState([]);

  const initialContext = {
    cart,
    setCart,
  };

  return (
    <GlobalContext.Provider value={initialContext}>
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Navigation />
      </NativeBaseProvider>
    </GlobalContext.Provider>
  );
};

export default App;
