import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, ListItem, PanelHeader, Link } from '@vkontakte/vkui';

import { getAreas } from '../Modules';

const Home = ({ id, setLocation, setActiveArea }) => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const updatedAreas = getAreas();

    setAreas(updatedAreas);
  }, []);

  const handleClick = (e, code) => {
    setActiveArea(code);
    setLocation('area');
  };

  return (
    <Panel id={id}>
      <PanelHeader>Ориентирование</PanelHeader>
      {areas.map(({ name, code }) => {
        return (
          <Group key={name} title={name}>
            <ListItem>
              <Link
                size="m"
                level="tertiary"
                onClick={e => handleClick(e, code)}
                data-to="page">
                Принять участие
              </Link>
            </ListItem>
          </Group>
        );
      })}
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
  setActiveArea: PropTypes.func.isRequired
};

export default Home;
