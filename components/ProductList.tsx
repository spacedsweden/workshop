import * as React from "react";
import styled from "styled-components";
import SinchCard from "./SinchCard";
export default function SinchHeroTile(props) {
  const { data: data } = props;

  const create = React.createElement;

  var cards = [];

  data.cards.forEach((props, index) => {
    cards.push(
      <SinchCard
        textAlign="left"
        headerAlign="left"
        alignItems="Left"
        to={"/" + props.to.split("/index")[0]}
        icon={props.icon}
        header={props.header}
        margin="0"
        key={index}
      >
        {props.description}
      </SinchCard>);
  });

  return create(
    Wrapper,
    {},
    cards
  );
}

export const Wrapper = styled.div`
  display: flex;
  align-self: start;
  justify-content: start;
  align-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  max-width: 1440px;
  alignSelf: start;
  padding: 32px;
  gap: 32px;
`;