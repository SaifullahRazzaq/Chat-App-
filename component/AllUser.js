import React, { Component } from 'react';
import { getUser, createRoom } from '../Config/Firebase';
import { Container, Title, Subtitle, Header, Content, List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import {StyleSheet,Text,View,TextInput,Button,TouchableHighlight,Image,Alert, ScrollView, TouchableOpacity} from 'react-native';
import Chat from '../component/chat'
class AllUser extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                users: [],
                friendid: '',
                room: '',
                roomid:'',

            }

        this.Users = this.Users.bind(this)
    }
    componentDidMount() {
        this.Users()

    }
    async Users() {

        const users = await getUser();
        this.setState({ users })


    }


async createchat(friendId)
     {
        try {
         const room= await createRoom(friendId)
    let id=room._id
        //  console.log("id=========>",id)
        this.props.navigation.navigate('Chat',{room:id});
    
    } 
    catch (error) {
        
        alert(error.message)
    }
    
    
}


    render() {
        const {users}=this.state;

     
        //   <Container>
        //          <Header>
        //              <Left />
        //              <Body>
        //                  <Title>Title</Title>
        //                  <Subtitle>Subtitle</Subtitle>
        //              </Body>
        //              <Right />
        //          </Header>
        //      </Container>
        return (users.map(item => {

            return <List>
                <ScrollView>
                    <ListItem thumbnail>
                        <Left>
                            <Thumbnail square source={{ uri: 'https://s3.amazonaws.com/www.aaronmedacco.com/images/aaron-medacco-circle.png' }} />
                        </Left>
                        <Body>
                            <Text style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', textAlign: 'center' }}>{item.email}</Text>
                            <Text style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', textAlign: 'center' }} note numberOfLines={1}>hellofriends</Text>
                        </Body>
                        <Right>
                            <TouchableOpacity>
                                <Button title="Chat" onPress  ={this.createchat.bind(this, item.id)}>
                                </Button>
                            </TouchableOpacity>
                        </Right>
                    </ListItem>
                </ScrollView>
     
     
            </List>

        })

        )



    }
}
export default AllUser;