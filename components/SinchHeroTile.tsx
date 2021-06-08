import * as React from 'react';
import { Jumbotron, Button } from '@redocly/ui';
import HeroCard from './HeroCard';
import HeroCardSmall from './HeroCardSmall';
import styled from 'styled-components';
import { theme } from '../theme';
export default function SinchHeroTile(props) {
  const { hero: hero } = props;

  const create = React.createElement;

  var title = hero.title && create(H2Custom, {}, hero.title);
  var description = hero.description && create(PCustom, {}, hero.description);

  var button =
    hero.mainActionLabel &&
    hero.mainActionTarget &&
    create(
      Button,
      {
        to: hero.mainActionTarget,
        color: '#FFBE3C',
        style: {
          maxWidth: '320px',
          width: '100%',
          fontFamily: theme.typography.fontFamily,
        },
      },
      hero.mainActionLabel
    );

  var header = create(
    HeaderWrapper,
    {
      style: {
        padding: '32px',
      },
    },
    title,
    description,
    button
  );

  var pagCards = [];
  var navCards = [];

  hero.smallCard &&
    hero.smallCard.forEach((pagCard, index) => {
      pagCards.push(create(HeroCardSmall, { data: pagCard, key: 'P' + index }));
    });

  hero.richCard &&
    hero.richCard.forEach((navCard, index) => {
      navCards.push(create(HeroCard, { data: navCard, key: 'N' + index }));
    });

  return create(
    HeroWrapper,
    null,
    create(
      Jumbotron,
      {
        bgImage: hero.background
          ? require('../images/heroTile/' + hero.background)
          : require('../images/heroTile/generic/genericHero1.png'),
        bgColor: '#238E8E',
        style: {
          padding: '0',
          marginBottom: '16px',
        },
      },
      header
    ),
    create(CardWrapper, {}, pagCards),
    create(CardWrapper, {}, navCards)
  );
}

export const HeroWrapper = styled.section`
  width: 100%;
  word-break: break-word;
  @media only screen and (min-width: ${({ theme: a }) =>
      a.breakpoints.medium} and ${({ enableToc: a }) => a}) {
    max-width: 75%;
  }
  /*@media only screen and (min-width: ${({ theme: a }) =>
    a.breakpoints.medium}) and (max-width: ${({ theme: a }) =>
    a.breakpoints.large}) {
    max-width: 75%;
  }*/
`;

export const CardWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  padding: 16px 0;
  max-width: 1100px;
  :empty {
    display: none;
  }
  @media only screen and (max-width: ${({ theme: a }) => a.breakpoints.medium}) {
    padding: 0 16px 32px;
  }
`;

export const HeaderWrapper = styled.section``;

export const H2Custom = styled.p`
  text-align: left;
  max-width: 400px;
  font-size: 40px;
  margin: 0;
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.medium}) {
    margin-block-start: 8px;
    font-size: 24px;
    line-height: 110%;
    max-width: 320px;
  }
`;

export const PCustom = styled.p`
  text-align: left;
  max-width: 459px;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 135%;
  margin: 16px 0;
  font-family: ${({ theme }) => theme.typography.headings.fontFamily};
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.medium}) {
    max-width: 314px;
    font-size: 16px;
  }
`;
