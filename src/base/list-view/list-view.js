import React from 'react'
import './listview.css'
import {Link} from 'react-router-dom'
import Confirm from '../confirm/confirm'
import {withRouter} from 'react-router-dom'
import {deleteArticle} from 'api/article'

@withRouter

class ListView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
      id: ''
    }
  }

  handleDelete(id) {
    deleteArticle(id).then((res) => {
      console.log(res.data)
      this.props.refresh()
    })

    this.setState({
      isShow: false,
      id: '',
    })
  }

  handleShow(id) {
    this.setState({
      isShow: true,
      id: id
    })
  }

  closeShow() {
    this.setState({
      isShow: false
    })
  }

  render() {
    return (

      <div className="listview">
        {this.state.isShow === true ? <Confirm id={this.state.id} confirm={this.handleDelete.bind(this)}
                                               closeShow={this.closeShow.bind(this)}/> : null}

        <li style={{border: '0', padding: '10px 20px', fontWeight: 'bold'}}>
          <div className="title" style={{color: '#444'}}>标题</div>
          <div className="sort">分类</div>
          <div className="status">状态</div>
          <div className="action">操作</div>
        </li>
        <ul style={{background: '#fff', padding: '0 10px'}}>

          {this.props.list.map((item) => {
            return (
              <li key={item._id}>
                <div className="title"><Link to={`/editor-article/` + item._id}>{item.title}</Link></div>
                <div className="sort">{item.sort}</div>
                <div className="status">{item.status}</div>
                <div className="action"><i className="icon-font icon-del" onClick={() => {
                  this.handleShow(item._id)
                }}/><Link to={`/editor-article/` + item._id}><i className="icon-font icon-editor"/></Link></div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default ListView