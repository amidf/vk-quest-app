import React, { PureComponent } from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';

import { ROUTES } from './config';

import Home from './Panels/Home';
import Page from './Panels/Page';
import Task from './Panels/Task';

const location = window.location.hash.substr(1);

class App extends PureComponent {
  state = {
    activePanel: ~ROUTES.indexOf(location) ? location : 'home',
    popout: null
  };

  setLocation = route => {
    if (route !== 'home') {
      connect.send('VKWebAppSetLocation', { location: route });
    } else {
      connect.send('VKWebAppSetLocation', { location: '' });
    }
  };

  go = (e = 'home', id = 0, data = {}) => {
    let route = null;

    if (typeof route === 'string') {
      route = e;
    } else if (e && e.currentTarget) {
      route = e.currentTarget.dataset.to;
    }

    this.setState({ activePanel: route, cardId: id, data: data }, () => {
      this.setLocation(route);
    });
  };

  setPopout = popout => {
    this.setState({
      popout: popout
    });
  };

  render() {
    const { activePanel, popout, fetchedUser, data, cardId } = this.state;

    return (
      <View activePanel={activePanel} popout={popout}>
        <Home id="home" user={fetchedUser} go={this.go} />
        <Page
          id="page"
          cardCode={cardId}
          data={data}
          go={this.go}
          setPopout={this.setPopout}
        />
        <Task
          id="task"
          cardId={cardId}
          data={data}
          go={this.go}
          setPopout={this.setPopout}
        />
      </View>
    );
  }
}

export default App;
