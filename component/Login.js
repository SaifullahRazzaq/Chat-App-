import React,{Component} from 'react';
import { funLogin } from '../Config/Firebase'
import AllUser from '../component/AllUser'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert,
    
  } from 'react-native';
  import { Container, Header, Content, Left,Right,Body,Form} from 'native-base'
  class Login extends Component {
    state=
    {
      Password:'',
      Email:'',
    }
 async Login()
  {
      const {Email,Password}=this.state;
    console.log("email======================>",Email)
      console.log("Password======================>",Password)
          this.props.navigation.navigate('AllUser')
        
    
  
      
          
      }
  
    
    render() {
   
   
     return (
     
     
     
   

      <View style={styles.container}>   
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://www.pngfind.com/pngs/m/332-3328918_iphone-mail-icon-png-wwwimgkidcom-the-image-kid.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({Email:email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://lh3.googleusercontent.com/mGiZfKT8T6qnc_uBov2CipBgXGHxYd7oei5uvlaFiJiXvK5AyAu0r_gxiFV-2VXOVCdJ=s180-rw'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({Password:password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.Login()}>
          <Text style={styles.loginText}>Login</Text>
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
          borderRadius:30,
          borderBottomWidth: 1,
          width:250,
          height:45,
          marginBottom:20,
          flexDirection: 'row',
          alignItems:'center'
      },
      inputs:{
          height:45,
          marginLeft:16,
          borderBottomColor: '#FFFFFF',
          flex:1,
      },
      inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
      },
      buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
      },
      loginButton: {
        backgroundColor: "#00b5ec",
      },
      loginText: {
        color: 'white',
      }
    });
    
     
    export default Login;