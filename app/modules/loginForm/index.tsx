import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useDispatch} from 'react-redux';
import * as loginActions from '../../store/actions/loginActions';
import {size} from '../../theme/Size';

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

const FormData = z
  .object({
    phone: z
      .string()
      .regex(phoneRegExp, {message: 'Invalid phone number'})
      .min(10, {message: 'Phone must contain at least 10 characters'})
      .max(10, {message: 'Phone must contain at most 10 characters'})
      .optional()
      .or(z.literal('')),
    email: z.string().email().optional().or(z.literal('')),
    password: z
      .string()
      .min(6, {message: 'Password must have at least 6 characters'}),
  })
  .superRefine((values, ctx) => {
    if (!values.phone && !values.email) {
      ctx.addIssue({
        message: 'Either phone or email should be filled in.',
        code: z.ZodIssueCode.custom,
        path: ['phone'],
      });
      ctx.addIssue({
        message: 'Either phone or email should be filled in.',
        code: z.ZodIssueCode.custom,
        path: ['email'],
      });
    }
  });

type FormData = z.infer<typeof FormData>;

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    trigger,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      phone: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(FormData),
  });
  const dispatch = useDispatch();
  const onLogin = (userName: string, pass: string) =>
    dispatch(loginActions.requestLogin(userName, pass));

  const onSubmit = (data: FormData) => {
    console.log(data);
    let userName = '';
    if (data.email !== '') {
      userName = data.email as string;
    }
    if (data.phone !== '') {
      userName = data.phone as string;
    }
    onLogin(userName, data.password);
  };

  const handleOnChangeText = (
    value: string,
    onChange: (...event: string[]) => void,
  ) => {
    onChange(value);
    trigger();
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            mode={'outlined'}
            label={'Phone'}
            onBlur={onBlur}
            onChangeText={(value: string) =>
              handleOnChangeText(value, onChange)
            }
            value={value}
            error={errors.phone ? true : false}
            keyboardType={'numeric'}
          />
        )}
        name="phone"
      />

      {errors.phone ? (
        <Text style={styles.error}>{errors.phone.message}</Text>
      ) : null}
      <Text style={[styles.text, {marginVertical: 12}]}>OR</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            mode={'outlined'}
            label={'Email'}
            onBlur={onBlur}
            onChangeText={(value: string) =>
              handleOnChangeText(value, onChange)
            }
            value={value}
            error={errors.email ? true : false}
            keyboardType={'email-address'}
            autoCapitalize="none"
            autoComplete="email"
          />
        )}
        name="email"
      />
      {errors.email ? (
        <Text style={styles.error}>{errors.email.message}</Text>
      ) : null}
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
              style={[{marginTop: size.moderateScale(10)}]}
              secureTextEntry
              textContentType="password"
              onChangeText={value => handleOnChangeText(value, onChange)}
              error={errors.password && true}
            />
          </>
        )}
      />
      {errors.password ? (
        <Text style={styles.error}>{errors.password?.message}</Text>
      ) : null}
      <Button
        icon="login"
        mode="elevated"
        disabled={isValid ? false : true}
        style={styles.button}
        onPress={handleSubmit(onSubmit)}>
        SUBMIT
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    padding: size.moderateScale(10),
  },
  title: {
    fontSize: size.moderateScale(24),
    marginBottom: size.moderateScale(24),
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
  },
  button: {
    marginTop: size.moderateScale(24),
  },
});
