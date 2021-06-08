import * as React from 'react';
import styled from 'styled-components';
import arrowForward from '../images/icons/product/arrow-forward.svg';

import { UniversalLink } from '@redocly/developer-portal/dist/engine/src/components/UniversalLink/UniversalLink';

export default function SinchHeroCard(props) {
  const {
    header: a,
    icon: b,
    children: c,
    to: d,
    target: e,
    headerAlign: f,
    textAlign: g,
    bgColor: h,
    bgImage: i,
    color: j,
    className: k,
    style: l,
    visible: m,
    margin: z,
  } = props;

  const create = React.createElement;

  var title =
    a &&
    create(
      'p',
      {
        style: {
          margin: '0 0 0 0',
          fontSize: '24px',
          paddingLeft: '16px',
          wordWrap: 'anywhere',
        },
      },
      a
    );

  var description =
    c &&
    create(
      'p',
      {
        style: { lineHeight: '150%', fontWeight: '400' },
      },
      c
    );

  var icon =
    b &&
    create('img', {
      alt: '',
      src: b,
      width: '46px',
      height: '46px',
    });

  var icon2 =
    create('img', {
      alt: '',
      src: arrowForward,
      width: '16px',
      height: '16px',
    });

  return create(
    m ? HeroCardWrapperHidden : HeroCardWrapper,
    {
      to: d ? d : null,
      style: z ? { visibility: m, margin: z } : { visibility: m },
    },
    create(HeroCardTextWrapper, {}, icon, title),
    create(HeroCardTextWrapper, {}, description),
    create(HeroCardIconWrapper, {}, icon2)
  );
}

export const HeroCardIconWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-top: auto;
  border-radius: 25px;
  width: 35px;
  height: 35px;
`;

export const HeroCardWrapper = styled(UniversalLink)`
  display: flex;
  flex-direction: column;
  width: 320px;
  background-color: #ffffff;
  border: 1px solid #f2f2f2;
  padding: 32px;
  margin: 0 16px 32px;
  text-decoration: none;
  color: ${({ theme: a }) => a.colors.text.primary};
  &:hover {
    ${HeroCardIconWrapper} {
      background: #ffbe3c;
    }
  }
  @media only screen and (max-width: ${({ theme: a }) =>
      a.breakpoints.medium}) {
    margin: 0 32px 32px 0;
  }
  @media only screen and (min-width: 1225px) and (max-width: 1440px) {
    width: calc((100% - 128px) / 4);
  }
  @media only screen and (min-width: 950px) and (max-width: 1225px) {
    width: calc((100% - 96px) / 3);
  }
  @media only screen and (min-width: 600px) and (max-width: 950px) {
    width: calc((100% - 64px) / 2);
  }
  @media only screen and (max-width: 600px) {
    width: calc(100%);
  }
`;

export const HeroCardWrapperHidden = styled.a`
  display: flex;
  flex-direction: column;
  width: 320px;
  background-color: #ffffff;
  padding: 0 32px 0;
  margin: 0 16px 0;
  @media only screen and (max-width: ${({ theme: a }) =>
      a.breakpoints.small}) {
    margin: 0px 0px 32px;
  }
  @media only screen and (min-width: 1225px) and (max-width: 1440px) {
    width: calc((100% - 128px) / 4);
  }
  @media only screen and (min-width: 950px) and (max-width: 1225px) {
    width: calc((100% - 96px) / 3);
  }
  @media only screen and (min-width: 600px) and (max-width: 950px) {
    width: calc((100% - 64px) / 2);
  }
  @media only screen and (max-width: 600px) {
    width: calc(100% - 32px);
  }
`;

export const HeroCardTextWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media only screen and (max-width: ${({ theme: a }) =>
      a.breakpoints.small}) {
    max-width: 100%;
  }
`;
