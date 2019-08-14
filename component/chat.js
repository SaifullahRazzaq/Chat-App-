import React, { Component } from 'react';
import { List,FooterTab, Thumbnail, Container, Header, Left, Text, Body, Right, Item, Input, Button, Icon, Title, ListItem, Footer } from 'native-base';
import { View,StyleSheet, TouchableHighlight, TouchableOpacity,AppState,ScrollView,Image,TextInput } from 'react-native';
import { sendMessage, getAllMessages,getRoom } from '../Config/Firebase'
import * as moment from 'moment';
import { Audio } from 'expo-av';
// import Cameras from '../component/Camera';
import * as ImagePicker from 'expo-image-picker';
// import * as firebase from 'firebase';
export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        messsage: '',
        roomid: '',
        allmessage: [],
        appState: AppState.currentState,
      

      }
    this.send = this.send.bind(this)
    //this.get = this.get.bind(this);
    this.getroominfo=this.getroominfo.bind(this)
  }
  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
    }
    this.setState({appState: nextAppState});
  };
async componentDidMount() {
  //this.get();
  this.getroominfo();
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  
  async send() {
    
    let roomid=this.props.navigation.state.params.room;
    console.log("roomid==================>",roomid)
    console.log("messgae=====================>",this.state.messsage)
return await sendMessage(roomid,this.state.messsage)
   this.setState({message:''})
  }
  componentWillUnmount() {
    
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
//   async get() {
//     try {

//       const allmessage = await getAllMessages();
//       console.log("allmessage=============>", allmessage)
//       this.setState({ allmessage })
//     } catch (error) {
//       alert(error)
//     }
//  }



  async openGallery() {
    try {
      const photo = await ImagePicker.launchImageLibraryAsync({})
      console.log('gallery photo****', photo);
    } catch (e) {
       console.log('e ===>', e);
    }
  }


  async getroominfo()
    {
        try {
          const roomshareef = await getRoom()
      console.log("roomshareef ===========>",roomshareef)
        } catch (error) {
            alert(error)
        }
    }




 async  startRecording()
  {

    const recording = new Audio.Recording();
    try {
     return await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    return   await recording.startAsync();
     
     console.log("recording==================>",recording)
    } catch (error) {
  
    }
  }
 
  
  render() {
    return (
    
      <Container style={{backgroundColor:'#FFF'}}>

          <Header>
            <Left>
              <Button transparent>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
            <Text style={{flex:1,alignItems:'center', justifyContent:'center' ,padding:65,color:'#fff'}}>{this.state.appState}</Text>
            </Body>
            <Right>
              <Button transparent>
                <Icon name='search' />
              </Button>
              <Button transparent>
                <Icon name='heart' />
              </Button>
              <Button transparent>
                <Icon name='call' />
              </Button>
            </Right>
          </Header>
       
       
         {/* {allmessage.map((item,i)=>{
          return<Text>{item.message}
          </Text>
        })} */}
           <TextInput
          style={styles.textInputStyle}
          placeholder="Enter Name"
          returnKeyLabel = {"next"}
          onChangeText={messages=> {this.setState({messages})}}
        />
          
      <Button style={{flex:1,color:'#FFF',justifyContent:'center'}}  title="Send" onPress={this.send()}>
       </Button>
          <Footer style={{justifySelf:'flex-end', position:'absolute', left:0, right:0,bottom:0}}>
        
             
    
      
          <FooterTab>
 
       <TouchableHighlight>
     
          <Button onPress={()=>{this.openGallery()}} >
          <Icon name="grid" />
          </Button>
          </TouchableHighlight>
          
          <TouchableOpacity>
         
          <Button> 
          <Icon name="camera" onPress={() => {this.props.navigation.navigate('Cameras')}}/>
          </Button>
          </TouchableOpacity>
          
          <TouchableHighlight>
          <Button active>
          <Icon active name="navigate" />
          </Button>
          </TouchableHighlight>
          
          <TouchableHighlight>
          <Button>
          <Icon name="microphone"  onPress={this.startRecording()}/>
          </Button>
          </TouchableHighlight>
          </FooterTab>
          </Footer>
          
          
          </Container>
    )
        
      

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
