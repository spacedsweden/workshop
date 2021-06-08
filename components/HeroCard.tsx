import * as React from 'react';
import { H2, Button } from '@redocly/ui';
import styled from 'styled-components';
export default function SinchHeroTile(props) {
  const { data: data } = props;

  const create = React.createElement;

  var title =
    data.title &&
    create(
      H2,
      { style: { margin: '0 0 7px 0', fontSize: '24px' } },
      data.title
    );

  var description =
    data.description &&
    create(
      'p',
      { style: { margin: '0 0 27px 0', lineHeight: '150%' } },
      data.description
    );

  var button =
    data.label &&
    data.page &&
    create(
      Button,
      {
        to: data.page,
        color: '#f2f2f2',
        style: {
          fontSize: '16px',
          borderRadius: '0px',
          border: '1px solid #272727',
          width: '100%',
          marginTop: 'auto',
          boxShadow: '',
        },
      },
      data.label
    );

  var icon =
    data.icon &&
    create('img', {
      src: require('../images/heroTile/' + data.icon),
      alt: '',
      width: '194px',
      height: '169px',
    });

  return create(
    HeroCardWrapper,
    {},
    create(HeroCardTextWrapper, {}, title, description, button),
    create(HeroCardIconWrapper, {}, icon)
  );
}

export const HeroCardWrapper = styled.section`
  display: flex;
  width: 526px;
  left: 0px;
  top: 0px;
  background: #f2f2f2;
  padding: 32px;
  color: ${({ theme: a }) => a.colors.text.primary};
  @media only screen and (max-width: ${({ theme: a }) =>
      a.breakpoints.small}) {
    margin-right: 0;
  }
`;

export const HeroCardTextWrapper = styled.section`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: ${({ theme: a }) =>
      a.breakpoints.small}) {
    max-width: 100%;
  }
`;

export const HeroCardIconWrapper = styled.section`
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  display: flex;
  @media only screen and (max-width: ${({ theme: a }) =>
      a.breakpoints.small}) {
    display: none;
  }
`;
