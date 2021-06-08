import * as React from 'react';
import styled from 'styled-components';
import navBarIcon from './../images/navbar/hamburger.svg';

import { Flex, Link, SearchBox, Box, Button } from '@redocly/ui';
import { theme } from '../theme';

export default function NavBar(props) {
  const { items, logo, location } = props;
  const isMain = location.pathname !== '/'; // Change the color of the NavBar based on location

  const [isMobileMenuOpened, setMobileMenuOpened] = React.useState(false);
  const toggleMobileMenu = () => setMobileMenuOpened(!isMobileMenuOpened);
  const hideMobileMenu = () => setMobileMenuOpened(false);

  const navItems = items
    .filter((item) => item.type !== 'search')
    .map((item, index) => {
      return (
        <NavItem key={index} onClick={hideMobileMenu}>
          <Link
            style={{
              fontWeight: '400',
              fontFamily: theme.typography.fontFamily,
            }}
            to={item.link}
          >
            {item.label}
          </Link>
        </NavItem>
      );
    });

  return (
    <Flex justifyContent="center" backgroundColor="#007171">
      <NavWrapper hasBackground={isMain} maxWidth="100%">
        <Flex
          p="10px 10px 10px 0"
          alignSelf="center"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Link to="/">
            <img src={logo} alt="Sinch logo " height="29" width="142" />
          </Link>
          <NavItems>{navItems}</NavItems>
        </Flex>
        <Flex flexGrow="1" alignSelf="center" justifyContent="flex-end">
          <SearchArea>
            <StyledSearchBox pathPrefix={props.pathPrefix} />
          </SearchArea>
        </Flex>
        <Flex
          flexGrow="1"
          alignSelf="center"
          flexWrap="nowrap"
          justifyContent="flex-end"
          maxWidth="fit-content"
        >
          <LoginArea>
            <span style={{ marginRight: '20px' }}></span>
            <Button
              small
              to="https://sinch.com/signup"
              color="#FFBE3C"
              height="2em"
            >
              Login
            </Button>
          </LoginArea>
        </Flex>
        <NavControls>
          <MobileMenuIcon onClick={toggleMobileMenu} />
        </NavControls>
        <MobileMenu isShown={isMobileMenuOpened}>
          <CloseIcon onClick={hideMobileMenu} />
          {navItems}
          <SearchBox />
        </MobileMenu>
      </NavWrapper>
    </Flex>
  );
}

const SearchArea = styled.div`
  display: none;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.large}) {
    display: flex;
  }
`;
const LoginArea = styled.div`
  display: none;
  padding-right: 32px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.medium}) {
    display: flex;
  }
`;
const StyledButton = styled(Button)`
  color: #ffbe3c;
  heigth: 50px;
  border-radius: 0;
  padding: 15px 12.8px;
`;
const StyledSearchBox = styled(SearchBox)`
  border-radius: 0;
`;
const NavItem = styled.li`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  padding: 10px 0;
`;

const NavWrapper = styled.div<{ hasBackground: boolean }>`
  display: flex;
  width: 100%;
  padding-left: 32px;
  height: 80px;
  background: ${({ theme }) => theme.colors.primary.sinchGreen};
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.medium}) {
    z-index: 50;
    position: sticky;
    top: 0px;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.medium}) {
    padding: 0 16px;
  }
`;

const NavItems = styled.ul`
  margin: 0px 0 0 40px;
  padding: 0;
  display: flex;
  font-family: ${({ theme }) => theme.typography.fontFamily}
  align-items: left;
  justify-content: start;
  & li {
    list-style: none;
    margin-right: 20px;
    & a {
      font-family: ${({ theme }) => theme.typography.headings.fontFamily};
      font-weight: ${({ theme }) => theme.typography.headings.fontWeight};
      color: #ffffff;
      text-decoration: none;
    }
  }
  display: none;
  @media only screen and (min-width: ${({ theme }) =>
    theme.breakpoints.medium}) {
    display: flex;
  }
`;

export const MobileMenu = styled.ul<{ isShown: boolean }>`
  background: ${(props) => props.theme.colors.primary.main};
  list-style: none;
  padding: 50px 40px;
  margin: 0;
  position: absolute;
  border-top: 1px solid transparent;
  z-index: 100;
  color: ${(props) => props.theme.colors.primary.contrastText};
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  font-size: 1.1875rem;
  box-shadow: 0px 10px 100px 0px rgba(35, 35, 35, 0.1);
  text-align: left;
  display: none;
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.medium}) {
    position: fixed;
    display: ${(props) => (props.isShown ? 'flex' : 'none')};
    flex-direction: column;
    overflow-y: auto;
  }
  & li {
    list-style: none;
    margin-right: 20px;
    & a {
      color: #ffffff;
      text-decoration: none;
    }
  }
`;

export const NavControls = styled.div`
  padding: 10px 0 10px 10px;
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.medium}) {
    display: none;
  }
`;

export const MobileMenuIcon = styled.span`
  width: 30px;
  height: 25px;
  display: inline-block;
  background-image: url(${navBarIcon});
  cursor: pointer;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.medium}) {
    display: none;
  }
`;

export const CloseIcon = styled.i`
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 25px;
  width: 15px;
  height: 15px;
  background-repeat: no-repeat;
  background-size: 15px 15px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 15.6 15.6' enable-background='new 0 0 15.642 15.642'%3E%3Cpath fill-rule='evenodd' fill='white' d='M8.9 7.8l6.5-6.5c0.3-0.3 0.3-0.8 0-1.1 -0.3-0.3-0.8-0.3-1.1 0L7.8 6.8 1.3 0.2c-0.3-0.3-0.8-0.3-1.1 0 -0.3 0.3-0.3 0.8 0 1.1l6.5 6.5L0.2 14.4c-0.3 0.3-0.3 0.8 0 1.1 0.1 0.1 0.3 0.2 0.5 0.2s0.4-0.1 0.5-0.2l6.5-6.5 6.5 6.5c0.1 0.1 0.3 0.2 0.5 0.2 0.2 0 0.4-0.1 0.5-0.2 0.3-0.3 0.3-0.8 0-1.1L8.9 7.8z'/%3E%3C/svg%3E");
`;
