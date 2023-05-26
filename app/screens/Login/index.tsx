import React, {useState} from 'react';
import {View} from 'react-native';
import {Text, Button, Card} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import LoginForm from '../../modules/loginForm';
import RegisterForm from '../../modules/RegisterForm';

const Login: React.FC = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Card style={styles.cardOuterStyle}>
          <Card style={styles.cardStyle} mode="contained">
            <View style={styles.cardContainerStyle}>
              <Button
                style={styles.sliderButton}
                mode={sliderIndex === 0 ? 'elevated' : 'text'}
                onPress={() => setSliderIndex(0)}>
                <Text>SignIn</Text>
              </Button>
              <Button
                style={styles.sliderButton}
                mode={sliderIndex === 1 ? 'elevated' : 'text'}
                onPress={() => setSliderIndex(1)}>
                <Text>Register</Text>
              </Button>
            </View>
          </Card>
          {sliderIndex === 0 ? <LoginForm /> : <RegisterForm />}
        </Card>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
