import React from 'react'
import { Container, Content, List, Text } from 'native-base'
import { StyleSheet } from 'react-native'
import Article from '../Article'
import Loading from '../Loading'

const TabContent = (props) => {
  const { articles, isLoading } = props
  console.log('content articles', articles)

  const renderLoadingState = () => (
    <Loading
      isLoading={isLoading}
      style={styles.loadingState}
    />
  )

  const renderArticles = () => (
    <List
      dataArray={articles}
      renderRow={(article) => {
        return (
          <Article
            article={article}
          />
        )
      }}
      keyExtractor={(article, index) => index.toString()}
    />
  )

  const renderContent = () => (
    isLoading ? (
      renderLoadingState()
    ) : (
      renderArticles()
    )
  )

  return (
    <Container>
      <Content>
        {renderContent()}
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  loadingState: {
    marginTop: 20
  }
})

export default TabContent
