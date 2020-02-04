import React from 'react'
import { View, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Container, Header, Left, Body, Title, Right } from 'native-base'
import WebView from 'react-native-webview'

const ArticleModal = (props) => {
  const { articleData, modalVisible, onArticleShare, onClose } = props
  const { title, url } = articleData
  return (
    <View>
      <Modal
        animationType='slide'
        transparent
        visible={modalVisible}
        onRequestClose={onClose}
      >
        <Container style={{ backgroundColor: '#fff' }}>
          <Header>
            <Left>
              <Icon.Button
                backgroundColor='transparent'
                color='black'
                name='times'
                onPress={onClose}
              />
            </Left>
            <Body>
              <Title children={title} style={{ color: 'black' }} />
            </Body>
            <Right>
            <Icon.Button
                backgroundColor='transparent'
                color='black'
                name='share-square'
                onPress={() => onArticleShare(title, url)}
              />
            </Right>
          </Header>
          <WebView
            source={{ uri: url }}
            style={{ flex: 1 }}
            startInLoadingState
            scalesPageToFit
          />
        </Container>
      </Modal>
    </View>
  )
}

export default ArticleModal