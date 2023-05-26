import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {TextInput, Button, Switch, HelperText, Text} from 'react-native-paper';

import {useForm, Controller} from 'react-hook-form';
import {size} from '../../theme/Size';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../store/actions/registerAction';

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
const FormData = z.object({
  phone: z
    .string()
    .regex(phoneRegExp, {message: 'Invalid phone number'})
    .min(10, {message: 'Phone must contain at least 10 characters'})
    .max(10, {message: 'Phone must contain at most 10 characters'}),
  email: z.string().email(),
  name: z.string().min(5, {message: 'Name must contain at least 5 characters'}),
  surname: z
    .string()
    .min(5, {message: 'Name must contain at least 5 characters'}),
  password: z
    .string()
    .min(6, {message: 'Password must have at least 6 characters'}),
  termsAccepted: z.boolean().refine(value => value === true, {
    message: 'Please accept the terms and conditions',
  }),
});

type FormData = z.infer<typeof FormData>;

const RegisterForm: React.FC<{changeTab: () => void}> = ({
  changeTab,
}: {
  changeTab: () => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      surname: '',
      phone: '',
      email: '',
      password: '',
      termsAccepted: false,
    },
    resolver: zodResolver(FormData),
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const dispatch = useDispatch();
  const onSubmit = (data: FormData) => {
    console.log(data);
    dispatch(
      registerUser(
        data.name,
        data.surname,
        data.email,
        data.password,
        data.phone,
      ),
    );
    setTimeout(() => {
      Alert.alert(
        'Registered Successfully',
        'User Registered Successfully. go to sign in tab to login',
        [
          {
            text: 'Go To SignIn',
            onPress: () => changeTab(),
            style: 'default',
          },
        ],
      );
    }, 200);
  };

  const handleOnChangeText = (
    value: string | boolean,
    onChange: (...event: string[]) => void,
  ) => {
    onChange(value);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        defaultValue=""
        name="name"
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              mode={'outlined'}
              label="Name"
              value={value}
              onBlur={onBlur}
              onChangeText={value => handleOnChangeText(value, onChange)}
              error={errors.name && true}
            />
            <HelperText type="error">{errors.name?.message}</HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        name="surname"
        defaultValue=""
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              mode={'outlined'}
              label="Last Name"
              onBlur={onBlur}
              value={value}
              onChangeText={value => handleOnChangeText(value, onChange)}
              error={errors.surname && true}
            />
            <HelperText type="error">{errors.surname?.message}</HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              mode={'outlined'}
              value={value}
              label="Email"
              onBlur={onBlur}
              textContentType="emailAddress"
              autoCapitalize="none"
              onChangeText={value => handleOnChangeText(value, onChange)}
              error={errors.email && true}
            />
            <HelperText type="error">{errors.email?.message}</HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              mode={'outlined'}
              label={'Phone'}
              onBlur={onBlur}
              onChangeText={(value: string) =>
                handleOnChangeText(value, onChange)
              }
              value={value}
              error={errors.phone ? true : false}
              textContentType={'telephoneNumber'}
              keyboardType={'numeric'}
            />
            <HelperText type="error">{errors.phone?.message}</HelperText>
          </>
        )}
        name="phone"
      />
      <Controller
        control={control}
        name="password"
        defaultValue=""
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              mode={'outlined'}
              value={value}
              label="Password"
              onBlur={onBlur}
              secureTextEntry={secureTextEntry}
              textContentType="password"
              right={
                <TextInput.Icon
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                  icon={secureTextEntry ? 'eye' : 'eye-off'}
                />
              }
              onChangeText={value => handleOnChangeText(value, onChange)}
              error={errors.password && true}
            />
          </>
        )}
      />
      <HelperText type="error">{errors.password?.message}</HelperText>
      <View style={styles.row}>
        <Text>Terms Accept</Text>
        <Controller
          control={control}
          defaultValue={false}
          name="termsAccepted"
          render={({field: {onChange, value}}) => (
            <>
              <Switch
                value={value}
                onValueChange={value => handleOnChangeText(value, onChange)}
              />
            </>
          )}
        />
      </View>
      <HelperText type="error">{errors.termsAccepted?.message}</HelperText>
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}>
        SUBMIT
      </Button>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  container: {justifyContent: 'center', padding: size.moderateScale(10)},
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: size.moderateScale(2),
    justifyContent: 'space-between',
  },
});
