import * as React from 'react';
import styled from 'styled-components';
import {
  Box,
  FlexSection,
  Flex,
  Jumbotron,
  ThinTile,
  WideTile,
  Emphasis,
  H1,
  H2,
  SectionHeader,
} from '@redocly/ui';

export function SinchBox(props) {
  const [count, setCount] = React.useState(0);
  const { icon, header, text } = props;
  return (
    <Box
      borderRight="2px solid"
      m="10px"
      p="10px"
      borderColor="#F2F2F2"
      width="20%"
      maxWidth="285px"
      height="100%"
      minHeight="300px"
    >
      <img src={icon} />
      <br />
      <div style={{ marginLeft: '10px' }}>
        <h3>{header}</h3>
        {props.children}
      </div>
    </Box>
  );
}
