import React from 'react';
import StackNavigator from './src/StackNavigation';
import {Provider} from 'react-redux';
import Store from './Store';
import {ModalPortal} from 'react-native-modals';
import {UserContext} from './UserContext';

const App = () => {
  return (
    <Provider store={Store}>
      <UserContext >
        <StackNavigator />
        <ModalPortal />
      </UserContext>
    </Provider>
  );
};

export default App;
