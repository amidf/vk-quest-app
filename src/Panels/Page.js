import React, { useState } from 'react';
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

const Page = ({ id, cardCode, go, setPopout }) => {
  // TODO: add set state functions
  const [data] = useState(getData());
  const [code] = useState(cardCode);
  // const [progress, setProgress] = useState(null);

  // TODO: implement
  // const addProgress = () => {
  // };

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

  return (
    data && (
      <Panel id={id}>
        <PanelHeader
          left={
            <HeaderButton onClick={go} data-to="home">
              {OS_NAME() === IOS ? <Icon24Cancel /> : <Icon24Cancel />}
            </HeaderButton>
          }>
          Ориентирование
        </PanelHeader>

        <Group>
          <Div>
            <InfoRow title="Количество Контрольных Пунктов">
              {data[code] ? data[code].length : 0}
            </InfoRow>
          </Div>
        </Group>

        <Group title="Доступные Контрольные точки">
          <Div>
            После прохождения всех контрольных точек вы станете победителем.
            Удачи!
          </Div>
          {data[code] &&
            data[code].map(i => {
              return (
                <Group key={i.name}>
                  <List>
                    <Cell expandable onClick={e => go(e, i)} data-to="task">
                      {i.name}
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
    )
  );
};

Page.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired
};

export default Page;
