import React, { Component } from 'react';
import { createDrawerNavigator, createMaterialTopTabNavigator, createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation'; 
import Login from '../component/Login';
import Register from '../component/Register';
import AllUser from '../component/AllUser';
import Chatroom from '../component/Chatroom';
import Chat from '../component/chat'
import Cameras from '../component/Camera'
class navigation extends React.Component {
    render() {
        return (
            <MainNavigator />
        )
    }


}

const MainNavigator = createDrawerNavigator({
    Register: {
        screen: Register
    },
    Login: {
        screen: Login
    },
    AllUser:
        {
            screen: AllUser
        },
        Chatroom:
        {
         screen:Chatroom
        },

        Chat:
        {
            screen:Chat
        },
        Cameras:
        {
            screen:Cameras

        }
        


});




export default createAppContainer(MainNavigator);