import React, { useState } from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';

import { ROUTES } from './config';

import Home from './Panels/Home';
import Area from './Panels/Area';
import Task from './Panels/Task';

const location = window.location.hash.substr(1);

const App = () => {
  const [activePanel, setActivePanel] = useState(
    ~ROUTES.indexOf(location) ? location : 'home'
  );
  const [activeArea, setActiveArea] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
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

    setActivePanel(route);
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
      <Home
        id="home"
        user={fetchedUser}
        setLocation={setLocation}
        setActiveArea={setActiveArea}
      />
      <Area
        id="area"
        activeArea={activeArea}
        go={go}
        setLocation={setLocation}
        setPopout={setPopout}
        setActiveTask={setActiveTask}
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
