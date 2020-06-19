import React from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from "native-base";
// import { StyleSheet,View, Text,Image } from 'react-native'
import moment from "moment";
const Comment = ({}) => {
  // Pull data needed to display a comment out of comment object
  // // Pull user name and avatar out of user object

  const comments = [
    {
      user: {
        name: "Ali",
        avatar: "https://source.unsplash.com/1600x900/?face/2",
      },
      content: "loreemsdanjasdjksdansdankjsnajnasjknjdsn",
      created: Date.now(),
    },
    {
      user: {
        name: "Jennifer",
        avatar:
          "https://images.unsplash.com/photo-1542080681-b52d382432af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      },
      content: "loreemsdanjasdjksdansdankjsnajnasjknjdsn",
      created: Date.now(),
    },
    {
      user: {
        name: "Ali",
        avatar: "https://source.unsplash.com/1600x900/?face/3",
      },
      content: "loreemsdanjasdjksdansdankjsnajnasjknjdsn",
      created: Date.now() + 5,
    },
    {
      user: {
        name: "jannie",
        avatar: "https://source.unsplash.com/1600x900/?face/2",
      },
      content: "loreemsdanjasdjksdansdankjsnajnasjknjdsn",
      created: Date.now(),
    },
  ];
  // const { content, created, user } = comment;
  // const { name, avatar } = user;

  return (
    <Container
      style={{
        height: 81.5 * (comments.length + 1),
        marginVertical: 10,
        marginHorizontal: 10,
      }}
    >
      <Content>
        <Text style={{ marginHorizontal: 20 }}>Reviews</Text>
        <List>
          {comments.map((comment, key) => {
            return (
              <ListItem avatar key={key}>
                <Left>
                  <Thumbnail source={{ uri: comment.user.avatar }} />
                </Left>
                <Body>
                  <Text>{comment.user.name}</Text>
                  <Text note>{comment.content}</Text>
                </Body>
                <Right>
                  <Text note>{moment(comment.created).fromNow()}</Text>
                </Right>
              </ListItem>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};
// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//   },
//   avatarContainer: {
//     janniegnItems: 'center',
//     marginLeft: 5,
//     paddingTop: 10,
//     width: 40,
//   },
//   contentContainer: {
//     flex: 1,
//     borderBottomWidth: 1,
//     borderColor: '#EEE',
//     padding: 5,
//   },
//   avatar: {
//     borderWidth: 1,
//     borderColor: '#EEE',
//     borderRadius: 13,
//     width: 26,
//     height: 26,
//   },
//   text: {
//     color: '#000',
//     // fontFamily: 'Avenir',
//     fontSize: 15,
//   },
//   name: {
//     fontWeight: 'bold',
//   },
//   created: {
//     color: '#BBB',
//   },
// });

export default Comment;
