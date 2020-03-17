import React, { useState, useEffect } from 'react'
import { Alert, Share } from 'react-native'
import TabContent from '../Tabs/TabContent'

import getArticles from '../../service/api'

const TabContentContainer = props => {
  const { source } = props
  const [articleData, setArticleData] = useState({})
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [newsSource] = useState(source)

  useEffect(() => {
    fetchNews(newsSource)
  })

  // API Call Functions

  fetchNews = async newsSource => {
    getArticles(newsSource).then(
      articles => {
        setArticles(articles)
        setIsLoading(false)
      },
      error => {
        Alert.alert('Error', `Something went wrong! ${error}`)
      }
    )
  }

  // handler functions
  handleArticlePress = ({ title, url }) => {
    setModalVisible(true)
    setArticleData({ title, url })
  }

  handleArticleModalClose = () => {
    setArticleData({})
    setModalVisible(false)
  }

  handleArticleShare = (title, url) => {
    const message = `${title}\n\Read More @${url}\n\nShared via RN News App`
    return Share.share(
      {
        title,
        message,
        uri: url
      },
      {
        dialogTitle: `Share ${title}`
      }
    )
  }

  return (
    <TabContent
      articleData={articleData}
      articles={articles}
      isLoading={isLoading}
      onArticlePress={this.handleArticlePress}
      onArticleModalClose={this.handleArticleModalClose}
      onArticleShare={this.handleArticleShare}
      modalVisible={modalVisible}
    />
  )
}

export default TabContentContainer
