import React from 'react'
import { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

import { AppRegistry } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import gql from "graphql-tag";
import { Mutation } from 'react-apollo';

export interface IProps { }

interface IState {
  email?: string
  password?: string
  errorMessage?: string
  token?: string
}

const client = new ApolloClient({
  link: createHttpLink({ uri: "https://tq-template-server-sample.herokuapp.com/graphql" }),
  cache: new InMemoryCache()
});

const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
    <HelloWorldApp />
  </ApolloProvider>
);
AppRegistry.registerComponent('HelloWorldApp', () => ApolloApp);

export default class HelloWorldApp extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {email:"", password:"", errorMessage:"", token:""};
  }

  validateEmailAndPassword() {
    let regexEmail: RegExp = /([A-Za-z])+@([A-Za-z])+.com/gm;
    let regexOneCharAndOneDigit: RegExp = /(?=.*?[0-9])(?=.*?[A-Za-z]).+/gm;
    let tokenReceived: string;
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
        tokenReceived: this.getToken();
        this.setState({ token: tokenReceived, errorMessage: "Token: " + tokenReceived });
      }
    }
  }

  getToken() {
    <Mutation mutation={gql`
      mutation {
        Login(data:{email:"${this.state.email}", password:"${this.state.password}"}) {
          token
        }
      }
    `}>

      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return "Error :(";
  
        return data.token;
      }}
    </Mutation>
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
