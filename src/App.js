import React, { useState } from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';

import { ROUTES } from './config';

import Home from './Panels/Home';
import Page from './Panels/Page';
import Task from './Panels/Task';

const location = window.location.hash.substr(1);

const App = () => {
  const [activePanel, setActivePanel] = useState(
    ~ROUTES.indexOf(location) ? location : 'home'
  );
  const [popout, setPopout] = useState(null);
  const [cardId, setCardId] = useState(0);
  const [data, setData] = useState({});
  // TODO: add set state function
  const [fetchedUser] = useState({});

  const setLocation = route => {
    if (route !== 'home') {
      connect.send('VKWebAppSetLocation', { location: route });
    } else {
      connect.send('VKWebAppSetLocation', { location: '' });
    }
  };

  const go = (e, id = 0, data = {}) => {
    let updatedActivePanel = null;

    if (typeof e === 'string') {
      updatedActivePanel = e;
    } else if (e && e.currentTarget) {
      updatedActivePanel = e.currentTarget.dataset.to;
    }

    setActivePanel(updatedActivePanel);
    setCardId(id);
    setData(data);

    if (updatedActivePanel) {
      setLocation(updatedActivePanel);
    }
  };

  return (
    <View activePanel={activePanel} popout={popout}>
      <Home id="home" user={fetchedUser} go={go} />
      <Page
        id="page"
        cardCode={cardId}
        data={data}
        go={go}
        setPopout={setPopout}
      />
      <Task
        id="task"
        cardId={cardId}
        data={data}
        go={go}
        setPopout={setPopout}
      />
    </View>
  );
};

export default App;
