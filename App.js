import React from 'react';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import Navigation from './navigation';
import store from './store/store';
import toastConfig from './config/toastConfig'; // Adjust the path if necessary

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <Toast config={toastConfig} />
    </Provider>
  );
}
