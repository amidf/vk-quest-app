import React, { useState } from 'react';
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

const Task = ({ id, cardId, setPopout, go }) => {
  // TODO: add set state function
  const [data] = useState(cardId);
  const [inputValue, setInputValue] = useState('');

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const submitFormValue = e => {
    e.preventDefault();

    if (id['answer'] === inputValue) {
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
        <p>{data.hint}</p>
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
        onClose={() => setPopout(null)}>
        <h2>Результат</h2>
        <p>Ответ Правильный</p>
      </Alert>
    );
  };

  return (
    data && (
      <Panel id={id}>
        <PanelHeader
          left={
            <HeaderButton onClick={e => go(e, data.code)} data-to="page">
              {OS_NAME() === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
            </HeaderButton>
          }>
          {data.name}
        </PanelHeader>
        <Group>
          <Div>
            <List>
              <Cell before={<Icon24Info />}>{data.target}</Cell>
              <Cell before={<Icon24Place />}>{data.adress}</Cell>
              {data.task}
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
            <Button size="l" stretched onClick={submitFormValue} data-to="page">
              Проверить
            </Button>
          </ListItem>
          {data.hint ? (
            <CellButton onClick={openSheet}>Подсказка</CellButton>
          ) : (
            <CellButton disabled>Подсказка</CellButton>
          )}
        </Group>
      </Panel>
    )
  );
};

Task.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired
};

export default Task;
