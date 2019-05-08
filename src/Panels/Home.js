import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, ListItem, PanelHeader, Link } from '@vkontakte/vkui';

import area_code from '../Modules/area_code';

const Home = props => (
  <Panel id={props.id}>
    <PanelHeader>Ориентирование</PanelHeader>
    {area_code().map(i => {
      return (
        <Group key={i.name} title={i.name}>
          <ListItem>
            <Link
              size="m"
              level="tertiary"
              onClick={e => props.go(e, i.code)}
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
