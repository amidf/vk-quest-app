import React, { useState } from 'react';
import { View } from '@vkontakte/vkui';

import Home from './Panels/Home';
import Area from './Panels/Area';
import Task from './Panels/Task';

const App = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [activeArea, setActiveArea] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [popout, setPopout] = useState(null);

  return (
    <View activePanel={activePanel} popout={popout}>
      <Home
        id="home"
        setActivePanel={setActivePanel}
        setActiveArea={setActiveArea}
      />
      <Area
        id="area"
        activeArea={activeArea}
        setActivePanel={setActivePanel}
        setPopout={setPopout}
        setActiveTask={setActiveTask}
      />
      <Task
        id="task"
        activeArea={activeArea}
        activeTask={activeTask}
        setActivePanel={setActivePanel}
        setPopout={setPopout}
        setActiveTask={setActiveTask}
      />
    </View>
  );
};

export default App;
