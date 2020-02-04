import React, { Component } from 'react'
import { Alert, Share } from 'react-native'
import TabContent from '../Tabs/TabContent'

import getArticles from '../../service/api'

class TabContentContainer extends Component {
  state = {
    articleData: {},
    articles: [],
    isLoading: true,
    modalVisible: false,
    source: this.props.source || 'bbc-news'
  }

  // Lifecycle Methods

  componentDidMount() {
    const { source } = this.state
    this.fetchNews(source)
  }

  // API Call Functions

  fetchNews = async (source) => {
    getArticles(source).then(articles => {
      this.setState({
        articles: articles,
        isLoading: false
      })
    }, error => {
        Alert.alert('Error', `Something went wrong! ${error}`)
    })
  }

  // handler functions
  handleArticlePress = ({ title, url }) => {
    this.setState({
      articleData: { title, url },
      modalVisible: true
    })
  }

  handleArticleModalClose = () => {
    this.setState({
      articleData: {},
      modalVisible: false
    })
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

  render() {
    const { articleData, articles, isLoading, modalVisible } = this.state
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
}

export default TabContentContainer
