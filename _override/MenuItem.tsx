import * as React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';

import { MenuItemProps, Link, Arrow, OperationBadge } from '@redocly/ui';
import { theme } from '../theme';

export default function MenuItem(props: MenuItemProps) {
  const {
    item: {
      active,
      expanded,
      items,
      link,
      label,
      type,
      httpVerb,
      external,
      target,
    },
    depth,
    isExpanded,
    isAlwaysExpanded,
  } = props;

  const hasChildren = items && items.length > 0;
  const ItemTitleComponent = depth === 0 ? HeaderItem : NestedItem;
  const arrowDirection = isExpanded ? 'down' : 'right';

  const element =
    type === 'separator' ? (
      <Separator depth={depth}>{label}</Separator>
    ) : (
      <ItemTitleComponent
        expanded={!!expanded && hasChildren}
        active={active}
        depth={depth}
        onClick={props.onClick}
        isAlwaysExpanded={!!isAlwaysExpanded}
        data-cy={`sidebar-item-${label}`}
      >
        {httpVerb && (
          <div>
            <OperationBadge type={httpVerb}>{httpVerb}</OperationBadge>
          </div>
        )}
        <MenuLabel>{label}</MenuLabel>
        {hasChildren && (
          <ArrowWrapper>
            {(props.item.menuStyle === 'drilldown' || !isAlwaysExpanded) && (
              <Arrow
                width="10px"
                height="10px"
                color={theme.colors.text.primary}
                direction={arrowDirection}
                data-cy="arrow"
              />
            )}
          </ArrowWrapper>
        )}
      </ItemTitleComponent>
    );

  return link ? (
    <Link to={link} target={target || undefined}>
      {element}
    </Link>
  ) : (
    element
  );
}

const MenuItemTitle = styled.div<{
  expanded: boolean;
  active: boolean;
  isAlwaysExpanded: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: space-between;
  font-family: ${({ theme }) => theme.sidebar.fontFamily};
  color: ${(props) =>
    props.active ? props.theme.sidebar.activeTextColor : 'inherit'};
  background-color: ${(props) =>
    props.active ? props.theme.sidebar.activeBgColor : 'inherit'};
  cursor: ${({ isAlwaysExpanded }) =>
    isAlwaysExpanded ? 'default' : 'pointer'};
  opacity: 1;
  font-size: ${({ theme }) => theme.sidebar.fontSize};
  font-weight: ${({ theme }) => theme.sidebar.fontWeight};
  padding: 12.5px 0px 12.5px 32px;

  transition: background-color 0.3s, color 0.3s;
  :hover {
    background-color: ${({ isAlwaysExpanded, theme }) =>
      isAlwaysExpanded
        ? 'inherit'
        : lighten(0.04, theme.sidebar.activeBgColor)};
  }
  :empty {
    padding: 0;
  }
`;

const NestedItem = styled(MenuItemTitle)<{ depth: number }>`
  padding-left: ${({ depth }) => `${(depth + 1) * 20}px`};
`;

const HeaderItem = styled(MenuItemTitle)<{ depth: number }>`
  position: relative;
`;

const Separator = styled.span<{ depth?: number }>`
  display: block;
  padding: 12.5px 20px;
  padding-left: ${({ depth = 0 }) => `${(depth + 1) * 20}px`};
  padding-bottom: 2px;
  position: relative;
  cursor: default;
  font-family: ${({ theme }) => theme.typography.headings.fontFamily};
  font-size: 0.8em;
  text-transform: uppercase;
  opacity: 0.8;
  &:before {
    content: '';
    border-left: 3px solid ${({ theme }) => theme.colors.border.light};
    position: absolute;
    top: -50%;
    bottom: -50%;
    left: -12px;
    z-index: 1;
  }
  &:empty {
    padding: 0.1em 0;
  }
  &:empty:before {
    top: -1.5em;
    bottom: -1.5em;
  }
`;

const MenuLabel = styled.span<{ active: boolean }>`
  width: 100%;
`;

const ArrowWrapper = styled.div`
  margin-left: 5px;
`;
