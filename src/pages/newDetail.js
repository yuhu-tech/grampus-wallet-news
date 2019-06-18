import React, { Component } from 'react'
import { Icon } from 'antd'
import $ from "jquery"

class newDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      ifurl: "",
      isLoading: true,
      html: ""
    };
  }

  componentDidMount() {
    this.setState({
      title: this.props.history.location.state.title,
      html: this.props.history.location.state.url
    })
    // this._getIframeUrl()
  }

  _getIframeUrl = () => {
    var self = this
    $.ajaxPrefilter(function (options) {
      if (options.crossDomain && $.support.cors) {
        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:')
        options.url = http + '//cors-anywhere.herokuapp.com/' + options.url
      }
    });
    var link = self.props.history.location.state.url
    $.get(
      link,
      function (response) {
        var html = response;
        html = html.replace(/data-src/g, "src")
        self.setState({
          ifurl: html,
          isLoading: false
        })
      }
    );
  }

  _goBack = () => (
    <div className="nav-wrp">
      <div
        className="back-icon"
        onClick={() => {
          this.props.history.goBack()
        }}>
        <Icon
          type="left"
          style={{ fontSize: '20px' }}
        />
      </div>
      {this.state.title.substr(0, 15) + "..."}
    </div>
  )

  render() {
    return (
      <div style={{
        padding: '40px 20px 0'
      }}>
        {this._goBack()}
        <div
          className="html-wrp"
          dangerouslySetInnerHTML={{ __html: this.state.html }}
        ></div>
      </div>
    );
  }
}

export default newDetail;
