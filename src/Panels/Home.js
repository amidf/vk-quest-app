import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, ListItem, PanelHeader, Link } from '@vkontakte/vkui';

import { getAreas } from '../Modules';

const Home = ({ id, go }) => (
  <Panel id={id}>
    <PanelHeader>Ориентирование</PanelHeader>
    {getAreas().map(({ name, code }) => {
      return (
        <Group key={name} title={name}>
          <ListItem>
            <Link
              size="m"
              level="tertiary"
              onClick={e => go(e, code)}
              data-to="page">
              Принять участие
            </Link>
          </ListItem>
        </Group>
      );
    })}
  </Panel>
);

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired
};

export default Home;
