import React, {useCallback, useState} from 'react';
import {Button, ScrollView, StyleSheet, View} from 'react-native';
import {useAppNavigation} from '../../../hooks/useAppNavigation';
import {FormProvider, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import axios from 'axios';
import {ELocalStorageKey, storage} from '../../../utils/storage';
import FullScreenLoading from '../../../components/FullScreenLoading';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextField from '../../../components/TextField';

const SignUpSchema = z
  .object({
    email: z
      .string()
      .min(1, 'This field is required!')
      .email('Invalid format!'),
    password: z.string().min(1, 'This field is required!'),
    re_password: z.string().min(1, 'This field is required!'),
  })
  .refine(value => value.password === value.re_password, {
    message: 'Password and Retype password should match!',
    path: ['re_password'],
  });

type TSignUpSchema = z.infer<typeof SignUpSchema>;

const SignUpScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useAppNavigation();

  const methods = useForm<TSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      re_password: '',
    },
    reValidateMode: 'onBlur',
  });

  const _onSignUp = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:3000/sign_up');
      navigation.navigate('MainStack', {screen: 'HomeScreen'});
      storage.set(ELocalStorageKey.SESSION_TOKEN, res.data.token);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [navigation]);

  return (
    <>
      {isLoading && <FullScreenLoading />}
      <SafeAreaView />

      <ScrollView style={styles.root}>
        <View style={styles.form}>
          <FormProvider {...methods}>
            <TextField label="Email" name="email" />
            <TextField label="Password" name="password" />
            <TextField label="Retype Password" name="re_password" />
          </FormProvider>
          <Button title="SignUp" onPress={methods.handleSubmit(_onSignUp)} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  form: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    gap: 16,
  },
});

export default SignUpScreen;
