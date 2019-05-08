import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
  Alert,
  CellButton,
  Group,
  ListItem,
  PanelHeader,
  HeaderButton,
  IOS,
  Cell,
  List,
  Button,
  Div,
  Input,
  FormLayout,
  FormLayoutGroup
} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24Info from '@vkontakte/icons/dist/24/info';

import { OS_NAME } from '../Constants';

import { getData } from '../Modules';

const Task = ({
  id,
  activeArea,
  activeTask,
  setLocation,
  setPopout,
  setActiveTask
}) => {
  // TODO: add set state function
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({});
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const updatedTasks = getData();

    if (updatedTasks[activeArea]) {
      const updatedCurrentTask =
        updatedTasks[activeArea].find(({ id }) => id === activeTask) || {};

      setTasks(updatedTasks[activeArea]);
      setCurrentTask(updatedCurrentTask);
    }
  }, []);

  const handleGoBack = () => {
    setLocation('area');
  };

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleGoToNextTask = () => {
    const updatedActiveTask =
      currentTask.id + 1 <= tasks[tasks.length - 1].id
        ? currentTask.id + 1
        : null;

    if (updatedActiveTask) {
      const updatedCurrentTask =
        tasks.find(({ id }) => id === updatedActiveTask) || {};

      setActiveTask(updatedActiveTask);
      setCurrentTask(updatedCurrentTask);
      setToDefault();
    } else {
      setActiveTask(updatedActiveTask);
      setLocation('area');
      setToDefault();
    }

    setPopout(null);
  };

  const submitFormValue = e => {
    e.preventDefault();

    if (currentTask.answer.includes(inputValue)) {
      openSheetRightAnswer();
    } else {
      openSheetWrongAnswer();
    }
  };

  const openSheet = () => {
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
        <h2>Подсказка</h2>
        <p>{currentTask.hint}</p>
      </Alert>
    );
  };

  const openSheetWrongAnswer = () => {
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
        <h2>Результат</h2>
        <p>Ответ отрицательный</p>
      </Alert>
    );
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
        onClose={handleGoToNextTask}>
        <h2>Результат</h2>
        <p>Ответ Правильный</p>
      </Alert>
    );
  };

  const setToDefault = () => {
    setInputValue('');
  };

  return (
    <Panel id={id}>
      <PanelHeader
        left={
          <HeaderButton onClick={handleGoBack}>
            {OS_NAME() === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
          </HeaderButton>
        }>
        {currentTask.name}
      </PanelHeader>
      <Group>
        <Div>
          <List>
            <Cell before={<Icon24Info />}>{currentTask.target}</Cell>
            <Cell before={<Icon24Place />}>{currentTask.adress}</Cell>
            {currentTask.task}
          </List>
        </Div>
        <FormLayout>
          <FormLayoutGroup top="Введите ответ">
            <Input
              type="text"
              alignment="center"
              value={inputValue}
              onChange={handleChange}
            />
          </FormLayoutGroup>
        </FormLayout>

        <ListItem>
          <Button size="l" stretched onClick={submitFormValue}>
            Проверить
          </Button>
        </ListItem>
        {currentTask.hint ? (
          <CellButton onClick={openSheet}>Подсказка</CellButton>
        ) : (
          <CellButton disabled>Подсказка</CellButton>
        )}
      </Group>
    </Panel>
  );
};

Task.propTypes = {
  id: PropTypes.string.isRequired,
  activeArea: PropTypes.string,
  activeTask: PropTypes.number,
  setLocation: PropTypes.func.isRequired,
  setPopout: PropTypes.func.isRequired,
  setActiveTask: PropTypes.func.isRequired
};

export default Task;
