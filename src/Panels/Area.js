import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
  Group,
  InfoRow,
  PanelHeader,
  HeaderButton,
  IOS,
  Div,
  Cell,
  List,
  Alert
} from '@vkontakte/vkui';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

import { OS_NAME } from '../Constants';
import { getData } from '../Modules';

const Area = ({ id, activeArea, setLocation, setPopout, setActiveTask }) => {
  // TODO: add set state functions
  const [tasks, setTasks] = useState({});
  // const [progress, setProgress] = useState(null);

  useEffect(() => {
    const updatedTasks = getData();

    setTasks(updatedTasks);
  }, []);

  // TODO: implement
  // const addProgress = () => {
  // };

  const handleGoBack = () => {
    setLocation('home');
  };

  const openSheetRightAnswer = () => {
    setPopout(
      <Alert
        actions={[
          {
            title: 'Close',
            autoclose: true,
            style: 'destructive'
          }
        ]}
        onClose={() => setPopout(null)}>
        <h2>Поздравляем!</h2>
        <p>Вы прошли все контрольные точки</p>
      </Alert>
    );
  };

  const handleClick = taskId => {
    setActiveTask(taskId);
    setLocation('task');
  };

  return (
    <Panel id={id}>
      <PanelHeader
        left={
          <HeaderButton onClick={handleGoBack}>
            {OS_NAME() === IOS ? <Icon24Cancel /> : <Icon24Cancel />}
          </HeaderButton>
        }>
        Ориентирование
      </PanelHeader>

      <Group>
        <Div>
          <InfoRow title="Количество Контрольных Пунктов">
            {tasks[activeArea] ? tasks[activeArea].length : 0}
          </InfoRow>
        </Div>
      </Group>

      <Group title="Доступные Контрольные точки">
        <Div>
          После прохождения всех контрольных точек вы станете победителем.
          Удачи!
        </Div>
        {tasks[activeArea] &&
          tasks[activeArea].map(task => {
            return (
              <Group key={task.name}>
                <List>
                  <Cell expandable onClick={() => handleClick(task.id)}>
                    {task.name}
                  </Cell>
                </List>
              </Group>
            );
          })}
        <Group>
          <List>
            <Cell expandable onClick={openSheetRightAnswer}>
              Точка
            </Cell>
          </List>
        </Group>
      </Group>
    </Panel>
  );
};

Area.propTypes = {
  id: PropTypes.string.isRequired,
  activeArea: PropTypes.string,
  setLocation: PropTypes.func.isRequired,
  setPopout: PropTypes.func.isRequired,
  setActiveTask: PropTypes.func.isRequired
};

export default Area;
