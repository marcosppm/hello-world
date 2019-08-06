import React from 'react'
import { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

interface IProps { }

interface IState { }

export default class HelloWorldApp extends Component<IProps, IState> {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ marginBottom: 15 }}>
          <Text style={{ fontSize: 33, fontWeight: 'bold' }}>
            Bem-vindo(a) à Taqtile!
          </Text>
        </View>

        <View style={{ alignItems: 'baseline' }}>
          <Text style={{ fontSize: 15, marginBottom: 5 }}>E-mail:</Text>

          <TextInput
            style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 15 }}
            autoCompleteType='email'
          />

          <Text style={{ fontSize: 15, marginBottom: 5 }}>Senha:</Text>

          <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 15 }}
            autoCompleteType='password'
            underlineColorAndroid='transparent'
            secureTextEntry={true}
          />

        </View>

        <View>
          <Button
              title="Entrar"
              color="#9400D3"
              onPress={() => this.doNothing()}
            />
        </View>
      </View>
    );
  }

  doNothing(): void { }
}
