import React, {Component} from 'react';
import {firebaseApp, contatoDB} from './Firebase.js';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Button,
  TextInput
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    paddingTop: 2,
    paddingBottom: 2,
  },
  lista: {
    width: "100%",
  },
  item: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 20,
    width: "42.5%"
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5
  },
  botao: {
    width: "7%"
  },
  input: {
    height: 40,
    padding: 2,
    borderColor: "#000000",
    borderWidth: 1,
    width: "47%",
  }
});

export default class ToDo extends Component {
  state = {
    nome: "",
    telefone: "",
    proxima_key: 1,
    contato: []
  }

  componentDidMount(){
    this.listarContatos();
  }

  listarContatos = () => {
    var contatoTemp = [];
    contatoDB.on("value", (contato) => {
      contato.forEach((contato) => {
        contatoTemp.push({
          key: contato.key,
          nome: contato.val().nome,
          telefone: contato.val().telefone
        });
      });
      this.setState({ contato: contatoTemp});
    });
  }

  adcionar = () => {
    if (this.state.nome.length > 0) {

      var contato = {
          nome: this.state.nome,
          telefone: this.state.telefone
      };

      contatoDB.push(contato);

      this.listarContatos();

    }
  }

  excluir = (key) =>{
    
      contatoDB.child(key).remove();
      this.listarContatos();
    
  }

  render() {
    return(
      <SafeAreaView style={styles.container}>
          <Text style={styles.titulo}>TODO List</Text>
          <FlatList style={styles.lista} data={this.state.contato} renderItem={
              ({ item, index}) =>
                  <View style={styles.itemContainer}>
                    <Text style={styles.item}>{item.nome}</Text>
                    <Text style={styles.item}>{item.telefone}</Text>
                    <Button style={styles.botao} title="X" color="#FF0000" onPress ={() => 
                    this.excluir(item.key) } />
                  </View>
          }/>
          <View style={styles.itemContainer}>
            <TextInput style={styles.input} placeholder="Nome" value={this.state.nome} onChangeText={ (nome) => this.setState({nome: nome})}/>
            <TextInput style={styles.input} placeholder="Telefone" value={this.state.telefone} onChangeText={ (telefone) => this.setState({telefone: telefone})}/>
            <Button style={styles.botao} title="+" onPress={this.adcionar}/>
          </View>
      </SafeAreaView>
    );
  }

}
