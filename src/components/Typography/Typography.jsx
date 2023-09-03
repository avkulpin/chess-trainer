import React from 'react';
import styled from 'styled-components';
import { omit } from '../../utils/misc';
import { sx } from '../../utils/styles';

const mapPropsIteratee = (props) => ({
  fontSize: props.size && `${props.size}px`,
  lineHeight: props.lineHeight && `${props.lineHeight}px`,
  fontWeight: props.weight,
  color: props.color,
});

const mapStyleProps = (props) =>
  omit(mapPropsIteratee(props), (value) => typeof value === 'undefined');

export const Typography = ({ as = 'p', children, ...props }) => {
  return (
    <Root as={as} {...props}>
      {children}
    </Root>
  );
};

const Root = styled.p`
  color: var(--font-primary-color);
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;

  ${sx(mapStyleProps)};
`;
