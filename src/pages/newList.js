import React, { Component } from 'react'
import { Carousel, List } from 'antd'
import { gql } from '../common/request'

var listNewData = [
  {
    "id": "cjvnv4lvs02br0791r1ur9bvo",
    "articleURL": "https://mp.weixin.qq.com/s/LIJ2S3KYnZVejTXuqDqOBw",
    "imgURL": "https://upload-images.jianshu.io/upload_images/14609368-da340042bd5209e2?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp",
    "source": "域乎",
    "title": "【科技百咖】域乎CEO曹胜虎：主动拥抱传统企业 区块链+IOT落地创新场景",
    "sourceAt": "2019年5月4日"
  },
  {
    "id": "cjvnv4lvs02br0791r1ur9bvo",
    "articleURL": "https://mp.weixin.qq.com/s/LIJ2S3KYnZVejTXuqDqOBw",
    "imgURL": "https://upload-images.jianshu.io/upload_images/14609368-da340042bd5209e2?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp",
    "source": "域乎",
    "title": "【科技百咖】域乎CEO曹胜虎：主动拥抱传统企业 区块链+IOT落地创新场景",
    "sourceAt": "2019年5月4日"
  },
  {
    "id": "cjvnv4lvs02br0791r1ur9bvo",
    "articleURL": "https://mp.weixin.qq.com/s/LIJ2S3KYnZVejTXuqDqOBw",
    "imgURL": "https://upload-images.jianshu.io/upload_images/14609368-da340042bd5209e2?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp",
    "source": "域乎",
    "title": "【科技百咖】域乎CEO曹胜虎：主动拥抱传统企业 区块链+IOT落地创新场景",
    "sourceAt": "2019年5月4日"
  }
]

class newList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listNewData: listNewData
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
        listNewData: res.articles
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
        <div className="swiper-wrp">
          {this._swiperDom()}
        </div>
        <div className="news-wrp">
          {this._newsListDom()}
        </div>
      </div>
    );
  }
}

export default newList;
