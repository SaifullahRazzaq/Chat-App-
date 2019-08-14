import React,{Component} from 'react';
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
import { createRoom} from '../Config/Firebase'
import Chat from '../component/chat'
class Chatrrom extends Component {
constructor()
{
  super();
    this.state=
    {

    }
}
async createroom()
{
  
    try {
        return await createRoom();
        
    
    } catch (error) {
        console.log(error.message)
        
    }

}



render()
{
    return(
        <View>
            <Button style={{flex:1,justifyContent:'center',alignItem:'center'}} title="Createroom" onPress={()=>{this.createroom()}}></Button>
        </View>
    )
}



}
export default  Chatrrom;