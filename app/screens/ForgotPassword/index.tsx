import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';

import NavigationService from '../../navigation/NavigationService';

import styles from './styles';
const ForgotPassword: React.FC = () => {
  const goBack = () => NavigationService.goBack();
  return (
    <View style={styles.container}>
      <Button icon="keyboard-backspace" mode="outlined" onPress={goBack}>
        Go Back
      </Button>
    </View>
  );
};

export default ForgotPassword;
