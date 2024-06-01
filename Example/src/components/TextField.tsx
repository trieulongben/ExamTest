import {Controller, useFormContext} from 'react-hook-form';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

interface ITextField {
  label: string;
  name: string;
}

const TextField = ({label, name}: ITextField) => {
  const hookForm = useFormContext();

  return (
    <View>
      <Text>{`${label}`}</Text>

      <Controller
        name={name}
        control={hookForm.control}
        render={({field, fieldState}) => {
          return (
            <View>
              <TextInput
                style={styles.textInput}
                onChangeText={field.onChange}
              />
              <Text style={styles.errorMessage}>
                {fieldState.error?.message}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {borderWidth: 1, borderRadius: 4},
  errorMessage: {color: 'red'},
});

export default React.memo(TextField);
