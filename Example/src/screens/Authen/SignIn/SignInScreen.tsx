import {zodResolver} from '@hookform/resolvers/zod';
import axios from 'axios';
import React, {useCallback, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {z} from 'zod';
import TextField from '../../../components/TextField';
import {useAppNavigation} from '../../../hooks/useAppNavigation';
import {ELocalStorageKey, storage} from '../../../utils/storage';
import FullScreenLoading from '../../../components/FullScreenLoading';

const SignInSchema = z.object({
  email: z.string().min(1, 'This field is required!').email('Invalid format!'),
  password: z.string().min(1, 'This field is required!'),
});

type TSignInSchema = z.infer<typeof SignInSchema>;

const SignInScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useAppNavigation();

  const methods = useForm<TSignInSchema>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    reValidateMode: 'onBlur',
  });

  const _onLogin = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:3000/sign_in');
      navigation.navigate('MainStack', {screen: 'HomeScreen'});
      storage.set(ELocalStorageKey.SESSION_TOKEN, res.data.token);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [navigation]);

  const _navToSignUp = () => {
    navigation.navigate('AuthStack', {screen: 'SignUpScreen'});
  };

  return (
    <>
      {isLoading && <FullScreenLoading />}
      <SafeAreaView />

      <ScrollView style={styles.root}>
        <View style={styles.form}>
          <FormProvider {...methods}>
            <TextField label="email" name="email" />
            <TextField label="password" name="password" />
          </FormProvider>
          <Button title="Login" onPress={methods.handleSubmit(_onLogin)} />
          <Button title="Don't have an account?" onPress={_navToSignUp} />
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

export default SignInScreen;
