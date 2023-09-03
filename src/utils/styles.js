import { css } from 'styled-components';
import { omit } from './misc';

const INTRINSIC_PROPS = ['as', 'theme', 'children', 'className'];

export const sx =
  (styles = (identity) => identity, ...omitProps) =>
  (props) =>
    styles(omit(props, [...INTRINSIC_PROPS, ...omitProps]));

export const resetButton = () => css`
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

export const resetCheckbox = () => css`
  appearance: none !important;
  background-color: #fff;
  margin: 0;
`;

export const resetInput = () => css`
  appearance: none !important;
  box-shadow: none;
  outline: none;
`;
