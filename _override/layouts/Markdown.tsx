import * as React from 'react';
import { MarkdownLayoutProps } from '@redocly/ui';
import { UniversalLink } from '@redocly/developer-portal/dist/engine/src/components/UniversalLink/UniversalLink';
import { theme } from '../../theme';
import SinchHeroTile from '../../components/SinchHeroTile';
import styled from 'styled-components';
import GitHubIcon from './../../images/icons/github.svg';
export default function CustomMarkdownLayout(props: MarkdownLayoutProps) {
  const {
    enableToc: b,
    lastModifiedAgo: c,
    Toc: d,
    children: e,
    frontmatter: h,
    pageId: p,
    withToc: wt,
  } = props;

  return React.createElement(
    PageWrapper,
    null,
    React.createElement(
      h && h.hero && h.hero.enabled ? ContentWrapperHero : ContentWrapper,
      {
        enableToc: b,
        withtoc: wt,
      },
      h.hero &&
        h.hero.enabled &&
        React.createElement(SinchHeroTile, {
          hero: h.hero,
        }),
      React.createElement(InnerWrapper, {}, e),
      c &&
        React.createElement(
          PageInfo,
          null,
          // React.createElement(
          //   PageInfoText,
          //   {
          //     'data-cy': 'last-updated',
          //   },
          //   'Last updated ',
          //   c
          // ),
          React.createElement(
            CustomButton,
            {},
            React.createElement('img', {
              alt: '',
              src: GitHubIcon,
            }),
            React.createElement(CustomLink, { to: 'https://github.com/sinch/newdocs/edit/master/' + p }, 'Report an issue')
          )
        )
    ),
    React.createElement(d, null)
  );
}
export const PageWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: right;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
`;
const PageInfo = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    font-size: 0.8125rem;
    margin-top: 2em;
    margin-bottom: 2em;
    padding: 0;
    max-width: 778px;
  `,
  PageInfoText = styled.span`
    font-family: ${({ theme }) => theme.typography.fontFamily};
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
    padding-bottom: 36px;
    padding-top: 36px;
  `,
  CustomButton = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    text-decoration: none;
    color: ${({ theme: a }) => a.colors.text.primary};
    height: 3em;
    max-width: 195px;
    height: 47.25px;
    width: 100%;
    font-size: 16px;
    line-height: 19px;
  `,
  CustomLink = styled(UniversalLink)`
    text-decoration: underline;
    color: #055C7A;
  `;
export const HeroWrapper = styled.section`
  width: 100%;
  padding: 0%;
`;

export const ContentWrapper = styled.section`
  width: 100%;
  max-width: 878px;
  padding: 4em 2em 0px 4em;
  @media only screen and (max-width: ${({ theme: a }) =>
      a.breakpoints.medium}) {
    width: 100%;
    padding: 16px 16px;
    max-width: 650px;
  }

  & > article:first-child > h1:first-child {
    // disable margin top for h1 on the title heading if there is no "Last updated at" block
    margin-top: 0;
  }
`;
export const ContentWrapperHero = styled.section`
  width: 100%;
  padding: 32px 32px;
  @media only screen and (max-width: ${({ theme: a }) =>
      a.breakpoints.medium}) {
    width: 100%;
    padding: 0;
  }
`;
export const InnerWrapper = styled.section`
  width: 100%;
  max-width: 778px;
  @media only screen and (max-width: ${({ theme: a }) =>
      a.breakpoints.medium}) {
    width: 100%;
    padding: 16px 16px;
    max-width: 650px;
  }
`;
export const NextPageWrapperWithRightPanel = styled(ContentWrapper)`
  display: flex;
  justify-content: flex-end;
  padding-left: 0px;
  padding-right: 0px;

  @media only screen and (min-width: ${({ theme: a }) =>
      a.breakpoints.large}) {
    max-width: 15%;
  }

  @media only screen and (min-width: ${({ theme: a }) =>
      a.breakpoints.medium}) and (max-width: ${({ theme: a }) =>
      a.breakpoints.large}) {
    max-width: 25%;
  }
`;
