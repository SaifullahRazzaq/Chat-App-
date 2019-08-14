import React from 'react';
import { TextInput, Dimensions, StyleSheet, Text, Modal, View, Alert, TouchableOpacity, TouchableHighlight, Button, Image, FlatList, ScrollView } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Chat from '../component/chat';
export default class Cameras extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    modalVisible: false,
    recording:false
  };
  async componentDidMount() {
      const { status } = await Permissions.askAsync(Permissions.LOCATION, Permissions.CAMERA, Permissions.AUDIO_RECORDING);
      this.setState({ hasCameraPermission: status === 'granted' });
    }

  renderModal() {
    return <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      transparent={true}
      visible={this.state.modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={{ margin: 50, borderWidth: 2, backgroundColor: 'white' }}>
        <View>
          <Text>Hello World!</Text>

          <TouchableHighlight
            onPress={() => {
              this.setState({ modalVisible: false })
            }}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  }

  async capture() {
    this.setState({ recording: true });
    const photo = await this.camera.takePictureAsync()();
    console.log('photo *********', photo);
    this.setState({ photo: photo.uri })
  }

  stopRecording() {
    this.camera.stopRecording();
  }
  render() 
  {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        this.state.photo ? <Video
          source={{ uri: this.state.photo }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ flex: 1 }}
        /> : <View style={{ flex: 1 }}>
            <Camera
              ref={ref => {
                this.camera = ref;
              }}
              style={{ flex: 1 }}
              type={this.state.type}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setState({
                      type:
                        this.state.type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back,
                    });
                    <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Flip</Text>
                  }}>
                
               
            </TouchableOpacity>        

                 <TouchableOpacity
                  style={{
                    flex: 1,
                    alignSelf: 'flex-end',
                    alignItems: 'flex-end',
                  }}
                  onPress={() => this.state.recording ? this.stopRecording() : this.capture()}>
                  <Image
                    source={{ uri: 'https://st2.depositphotos.com/3227229/6685/v/950/depositphotos_66857165-stock-illustration-camera-icon.jpg' }}
                    style={{ width: 50, height: 50 }}
                  />
                  <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Chat")}}>
                 <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Back</Text>
                 </TouchableOpacity>
               
                </TouchableOpacity>
 
            
              </View>
            </Camera>
          </View>
      );
    }
  }
}