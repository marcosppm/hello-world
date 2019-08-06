import React from 'react'
import { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

interface IState {
  email?: string;
  password?: string;
  errorMessage?: string;
}

interface IProps {}

export default class HelloWorldApp extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {email:"", password:"", errorMessage:""};
  }

  validateEmailAndPassword():void {
    const regexEmail:RegExp = /([A-Za-z])+@([A-Za-z])+.com/gm;
    const regexOneCharAndOneDigit:RegExp = /(?=.*?[0-9])(?=.*?[A-Za-z]).+/gm;
    if (this.state.email.length == 0) {
      this.setState({ errorMessage: "E-mail obrigatório." });
      return;
    } else {
      if (!regexEmail.test(this.state.email)) {
        this.setState({ errorMessage: "Formato do e-mail deve ser: ###@###.com" });
        return;
      }
    }

    if (this.state.password.length == 0) {
      this.setState({ errorMessage: "Senha obrigatória." });
    } else if (this.state.password.length < 7) {
      this.setState({ errorMessage: "A senha deve ter pelo menos 7 caracteres." });
    } else {
      if (!regexOneCharAndOneDigit.test(this.state.password)) {
        this.setState({ errorMessage: "A senha deve conter pelo menos um caracter e um dígito"});
      } else {
        this.setState({ errorMessage: "Senha e login corretos!" });
      }
    }
  }

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
            autoCapitalize = 'none'
            onChangeText={(inputText) => this.setState({email: inputText})}
          />

          <Text style={{ fontSize: 15, marginBottom: 5 }}>Senha:</Text>

          <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 15 }}
            autoCompleteType='password'
            autoCapitalize = 'none'
            underlineColorAndroid='transparent'
            secureTextEntry={true}
            onChangeText={(inputText) => this.setState({password: inputText})}
          />

        </View>

        <View style={{ marginBottom: 15 }}>
          <Button
              onPress={() => this.validateEmailAndPassword()}
              title="Entrar"
              color="#9400D3"
            />
        </View>

        <View>
          <Text style={{ fontSize: 15, color:"#FF0000" }}>{this.state.errorMessage}</Text>
        </View>
      </View>
    );
  }
}
