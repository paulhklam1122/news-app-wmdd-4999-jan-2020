import React, { Component } from 'react'
import { Alert, Share } from 'react-native'
import TabContent from '../Tabs/TabContent'

import getArticles from '../../service/api'

class TabContentContainer extends Component {
  state = {
    articles: [],
    isLoading: true,
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

  render() {
    const { articles, isLoading } = this.state
    return (
      <TabContent
        articles={articles}
        isLoading={isLoading}
      />
    )
  }
}

export default TabContentContainer
