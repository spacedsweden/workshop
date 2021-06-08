import * as React from 'react';
import styled from 'styled-components';
import { Flex, Link } from '@redocly/ui';
export default function Footer(props) {
    const { columns, copyrightText } = props.footer;
    return (
        <FooterWrapper>
        </FooterWrapper>
    )
}
const FooterWrapper = styled.div`
	height: 80px;
    background: ${({ theme }) => theme.colors.primary.sinchGreen};
`;