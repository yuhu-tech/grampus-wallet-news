import React, { Component } from 'react'
import { Carousel, List, Spin } from 'antd'
import { gql } from '../common/request'

var listNewData = [
  {
    "id": "cjvnv4lvs02br0791r1ur9bvo",
    "articleURL": "https://mp.weixin.qq.com/s/LIJ2S3KYnZVejTXuqDqOBw",
    "imgURL": "http://5b0988e595225.cdn.sohucs.com/images/20180208/69d97db746f24bc681cc4594703b5684.jpeg",
    "source": "与数据同行",
    "title": "业务系统的数据资产管理为什么这么难？",
    "sourceAt": "2019年5月4日"
  },
  {
    "id": "cjvnv4lvs02br0791r1ur9bvo",
    "articleURL": "https://mp.weixin.qq.com/s/LIJ2S3KYnZVejTXuqDqOBw",
    "imgURL": "http://5b0988e595225.cdn.sohucs.com/images/20180208/69d97db746f24bc681cc4594703b5684.jpeg",
    "source": "与数据同行",
    "title": "业务系统的数据资产管理为什么这么难？",
    "sourceAt": "2019年5月4日"
  },
  {
    "id": "cjvnv4lvs02br0791r1ur9bvo",
    "articleURL": "https://mp.weixin.qq.com/s/LIJ2S3KYnZVejTXuqDqOBw",
    "imgURL": "http://5b0988e595225.cdn.sohucs.com/images/20180208/69d97db746f24bc681cc4594703b5684.jpeg",
    "source": "与数据同行",
    "title": "业务系统的数据资产管理为什么这么难？",
    "sourceAt": "2019年5月4日"
  }
]

class newList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listNewData: listNewData,
      isLoading: true
    };
  }

  componentDidMount() {
    this._getArticles()
  }

  _swiperImgDom = (item) => {
    return (
      <div
        className="swiperItem"
        onClick={() => {
          this.props.history.push({
            pathname: '/detail',
            state: {
              url: item.articleURL,
              title: item.title
            }
          })
        }}
      >
        <img src={item.imgURL} alt="" style={{ width: '100%', height: '160px' }} />
        <p className="swiper-title">{item.title.substr(0, 15) + '...'}</p>
      </div>
    )

  }

  _getArticles = async () => {
    const param = `
      query{
        articles{
          id
          title
          source
          sourceAt
          articleURL
          imgURL
        }
      }
    `
    const variables = null
    let res = await gql(param, variables)
    if (res) {
      this.setState({
        listNewData: res.articles,
        isLoading: false
      })
    }
    return res.articles
  }

  _swiperDom = () => {
    return (
      <Carousel autoplay>
        {this._swiperImgDom(this.state.listNewData[0])}
        {this._swiperImgDom(this.state.listNewData[1])}
        {this._swiperImgDom(this.state.listNewData[2])}
      </Carousel>
    )
  }

  _listItemDom = (item) => (
    <div
      className="new-list-item"
      onClick={() => {
        this.props.history.push({
          pathname: '/detail',
          state: {
            url: item.articleURL,
            title: item.title
          }
        })
      }}
    >
      <div className="left-info">
        <h4>{item.title.length > 36 ? item.title.substr(0, 30) + "..." : item.title}</h4>
      </div>
      <div className="right-img">
        <img src={item.imgURL} alt="" />
      </div>
      <div className="new-time">
        <span>{item.source}</span> {item.sourceAt}
      </div>
    </div>
  )

  _newsListDom = () => (
    <List
      dataSource={this.state.listNewData}
      renderItem={item => this._listItemDom(item)}
    />
  )

  render() {
    return (
      <div className="App">
        <Spin
          tip="Loading..."
          spinning={this.state.isLoading}
        >
          <div className="swiper-wrp">
            {this._swiperDom()}
          </div>
          <div className="news-wrp">
            {this._newsListDom()}
          </div>
        </Spin>
      </div>
    );
  }
}

export default newList;
