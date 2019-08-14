import React, { Component } from 'react';
import Login from '../component/Login';
import { funRegister } from '../Config/Firebase';
import * as Facebook from 'expo-facebook';
// import * as ImagePicker from 'expo-image-picker'

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';


class Register extends Component {
  state =
    {
      Username: '',
      Password: '',
      Email: '',
      userInfo: '',
      dataSource: '',
      image: null,
    }

  async  register() {
    const { Email, Username, Password } = this.state;
    console.log("email======================>", Email)
    console.log("Password======================>", Password)
    console.log("Uername======================>", Username)
    return await funRegister(Email, Password).then(() => {

      this.props.navigation.navigate('Login')
    })





  }


  // componentDidMount() {
  //   this.getPermissionAsync();
  // }

  // getPermissionAsync = async () => {
  //   if (Constants.platform.ios) {
  //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //     if (status !== 'granted') {
  //       alert('Sorry, we need camera roll permissions to make this work!');
  //     }
  //   }
  // }

  

  //   console.log(result);

  //   if (!result.cancelled) {
  //     this.setState({ image: result.uri });
  //   }
  // };


  async fbLogin() {

    try {
      const { type, token, expires, permissions, declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('279553826060848', {
        permissions: ['email'],
        behavior: 'native',
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      }
      else {

      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  }

  gotoLogin() {
    this.props.navigation.navigate('Login')

  }
  
  render() {
    let { image } = this.state;
    return (









      <View style={styles.container}>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://icon-library.net/images/google-user-icon/google-user-icon-16.jpg' }} />
          <TextInput style={styles.inputs}
            placeholder="Username"
            keyboardType="ascii-capable"
            underlineColorAndroid='transparent'
            onChangeText={(username) => this.setState({ Username: username })} />
        </View>




        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://www.pngfind.com/pngs/m/332-3328918_iphone-mail-icon-png-wwwimgkidcom-the-image-kid.png' }} />
          <TextInput style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(email) => this.setState({ Email: email })} />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://lh3.googleusercontent.com/mGiZfKT8T6qnc_uBov2CipBgXGHxYd7oei5uvlaFiJiXvK5AyAu0r_gxiFV-2VXOVCdJ=s180-rw' }} />
          <TextInput style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({ Password: password })} />
        </View>
        {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View> */}
  
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.register()}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableHighlight>


        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.fbLogin()}>
          <Text style={styles.loginText}>Facebook</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => { this.gotoLogin() }}>
          <Text style={styles.loginText}>AlreadyAccountClickHere</Text>
        </TouchableHighlight>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});

export default Register;