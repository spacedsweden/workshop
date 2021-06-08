import * as React from 'react';
import { Flex, H3, Button } from '@redocly/ui';
import styled from 'styled-components';
import { UniversalLink } from '@redocly/developer-portal/dist/engine/src/components/UniversalLink/UniversalLink';
export default function SinchHeroTile(props) {
  const { data: data } = props;

  const create = React.createElement;

  var title = data.title && create(Paragraph, {}, data.title);

  var description =
    data.description &&
    create(
      'p',
      { style: { margin: '0 0 16px 0', lineHeight: '150%' } },
      data.description
    );

  var icon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"
        fill="#272727"
      />
    </svg>
  );

  return data.description
    ? create(
        HeroCardWrapper,
        {
          to: data.page,
        },
        title,
        description,
        create(
          Flex,
          {
            mt: 'auto',
            ml: 'auto',
          },
          create(HeroCardIconWrapper, {}, icon)
          )
      )
    : data.title &&
        data.page &&
        create(
          SinchCardButton,
          {},
          create(
            Button,
            {
              to: data.page,
              color: '#FFFFFF',
              style: {
                fontSize: '16px',
                borderRadius: '0px',
                width: 'fit-content',
                display: 'flex',
                alignItems: 'center',
              },
            },
            data.title,
            create(HeroCardIconWrapper, {}, icon)
            )
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
    border: 1px solid #f2f2f2;
    flex-direction: column;
    width: 326px;
    left: 0px;
    top: 0px;
    background: #FFFFF;
    padding: 32px;
    text-decoration: none;
    color: ${({ theme: a }) => a.colors.text.primary};
    &:hover {
      ${HeroCardIconWrapper} {
        background: #ffbe3c;
      }
    }  
    @media only screen and (max-width: ${({ theme: a }) =>
        a.breakpoints.small}) {
      margin-right: 0;
    }
    @media only screen and (min-width: 1100px) {
      width: calc((100% - 64px) / 3);
    }
    @media only screen and (min-width: 600px) and (max-width: 1100px) {
      width: calc((100% - 32px) / 2);
    }
    @media only screen and (max-width: 600px) {
      width: calc(100%);
    }
  `,
  SinchTileBottomIcon = styled.img`
    width: 24px;
    margin-left: auto;
    @media only screen and (max-width: ${({ theme: a }) =>
        a.breakpoints.medium}) {
      width: 19px;
    }
  `,
  SinchCardButton = styled.section`
    padding: 35px;
  `,
  Paragraph = styled.p`
    margin: 0 0 16px;
    font-size: 24px;
    font-weight: 400;
    color: #007171;
    line-height: 135%;
  `;
