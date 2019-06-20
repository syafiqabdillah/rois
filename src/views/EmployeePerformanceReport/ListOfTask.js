import React from 'react';
import { List, Badge } from 'antd';

import InfiniteScroll from 'react-infinite-scroller';
import './TaskTable.css';
import axios from 'axios';

export default class ListOfTask extends React.Component {
  state = {
    taskdata: [],
    loading: false,
    hasMore: true,
  }

  componentDidMount() {
    this.fetchData(this.props.status);
  }

  fetchData = (taskStatus) => {
    axios.get(process.env.API_HOST+'po/get-all-task-status/'+ this.props.employeeid)
      .then((response) => {
        const task = response.data[taskStatus];
        console.log(task)
        this.setState({
            taskdata: task
        });
    });
  }

  handleInfiniteOnLoad = () => {
    this.setState({
      loading: true,
    });
  }

  selectRightStatusIcon= (item) => {
    let listitem = ""
    if(this.props.status === 'taskdone'){
      listitem = <List.Item.Meta
        avatar={<Badge status="success" />}
        title={<p>{item.nama}</p>}
      />
    } else if (this.props.status === 'onprogress'){
      listitem = <List.Item.Meta
        avatar={<Badge status="warning" />}
        title={<p>{item.nama}</p>}
      />
    } else if (this.props.status === 'assigned') {
      listitem = <List.Item.Meta
        avatar={<Badge status="error" />}
        title={<p>{item.nama}</p>}
      />
    }
    return listitem;
  }

  render() {

    return (
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List
            dataSource={this.state.taskdata}
            renderItem={item => (
              <List.Item key={item.id}>
                {this.selectRightStatusIcon(item)}
              </List.Item>
            )}
          >
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}
