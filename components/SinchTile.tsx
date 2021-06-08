import * as React from "react";
import styled from "styled-components";
import { UniversalLink } from "@redocly/developer-portal/dist/engine/src/components/UniversalLink/UniversalLink";
import { Flex } from "@redocly/developer-portal/dist/engine/src/ui";
import {
  TileHeader,
  TileText,
} from "@redocly/developer-portal/dist/engine/src/ui/Tiles/styled.elements";
import arrowForward from "../images/icons/product/arrow-forward.svg";

const SinchTileWrapper = styled(UniversalLink)`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0px 10px 30px 0px rgba(35, 35, 35, 0.1);
    box-sizing: border-box;
    transition: box-shadow 0.25s ease;
    padding: 24px;
    margin-bottom: 32px;
    margin-right: 10px;
    margin-left: 10px;
    text-decoration: none;
    width: 100%;
    background-color: ${({ bgColor: a }) => a || "#fff"};
    background-image: ${({ bgImage: a }) => (a ? `url(${a})` : "none")};
    background-repeat: no-repeat;

    :hover {
      box-shadow: 0px 10px 100px 0px rgba(35, 35, 35, 0.2);
    }

    @media only screen and (min-width: ${({ theme: a }) =>
        a.breakpoints.small}) {
      width: calc(50% - 20px);
    }

    @media only screen and (min-width: ${({ theme: a }) =>
        a.breakpoints.medium}) {
      width: 250px;
    }

    @media only screen and (min-width: ${({ theme: a }) =>
        a.breakpoints.large}) {
      width: 280px;
    }

    &.external-url {
      :after {
        display: none;
      }
    }
  `,
  SinchTileTopIcon = styled.img`
    width: 63px;
    margin-right: auto;

    @media only screen and (max-width: ${({ theme: a }) =>
        a.breakpoints.medium}) {
      width: 50px;
    }
  `,
  ThinTileHeader = styled(TileHeader)`
    font-size: 24px;
    text-align: ${({ align: a }) => a || "center"};
  `,
  ThinTileText = styled(TileText)`
    font-size: 16px;
    line-height: 1.5;
    flex-shrink: 0;
    min-height: 6em;
    color: #666666;
    text-align: ${({ align: a }) => a || "center"};
    ${({ icon: a }) =>
      a
        ? `
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 8;
  `
        : ""};
    @media only screen and (min-width: ${({ theme: a }) =>
        a.breakpoints.small}) {
      min-height: 6em;
    }

    @media only screen and (min-width: ${({ theme: a }) =>
        a.breakpoints.medium}) {
      min-height: 4.5em;
    }
  `,
  SinchTileBottomIcon = styled.img`
    width: 24px;
    margin-left: auto;

    @media only screen and (max-width: ${({ theme: a }) =>
        a.breakpoints.medium}) {
      width: 19px;
    }
  `;
export class SinchTile extends React.Component {
  render() {
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
      } = this.props,
      m = d ? SinchTileWrapper : SinchTileWrapper.withComponent("div");
    return React.createElement(
      m,
      {
        to: d,
        target: e,
        color: j,
        bgColor: h,
        bgImage: i,
        className: k,
        style: l,
      },
      (b || a) &&
        React.createElement(
          Flex,
          { flexDirection: "column" },
          b && React.createElement(SinchTileTopIcon, { src: b }),
          a &&
            React.createElement(
              ThinTileHeader,
              { align: f, color: j, "data-cy": `Thin-${a}` },
              a
            )
        ),
      c &&
        React.createElement(ThinTileText, { icon: b, align: g, color: j }, c),
      arrowForward &&
        React.createElement(
          Flex,
          {
            mt: "auto",
          },
          React.createElement(SinchTileBottomIcon, { src: arrowForward })
        )
    );
  }
}
