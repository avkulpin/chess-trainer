import React from 'react';
import styled, { css } from 'styled-components';
import { Typography } from '../Typography/Typography';
import { resetButton } from '../../utils/styles';

export const ButtonVariant = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
  OUTLINE: 'OUTLINE',
  WARNING: 'WARNING',
};
export const ButtonSize = {
  MEDIUM: 'MEDIUM',
  SMALL: 'SMALL',
};

export const Button = ({
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.MEDIUM,
  disabled = false,
  pending = false,
  onClick,
  children,
  ...elementProps
}) => {
  return (
    <Root variant={variant} size={size} disabled={disabled} pending={pending}>
      <ButtonRoot variant={variant} onClick={onClick} {...elementProps}>
        {typeof children === 'string' ? (
          <Typography>{children}</Typography>
        ) : (
          children
        )}
      </ButtonRoot>
    </Root>
  );
};

const ButtonRoot = styled.button`
  ${resetButton()};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: 200ms ease border, 200ms ease background-color;
  will-change: border, background-color;

  &:focus-visible {
    outline: 1px solid var(--input-outer-border-color-focus);
    outline-offset: 1px;
  }

  /**
   * Variants
   */
  ${({ variant }) =>
    variant === ButtonVariant.PRIMARY &&
    css`
      background-color: var(--button-variant-default-background-color);
      border: 1px solid var(--button-variant-default-border-color);
      box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.25) inset;

      & > p {
        color: var(--text-0) !important;
      }

      &:hover {
        background-color: var(--button-variant-default-background-color-hover);
        border: 1px solid var(--button-variant-default-border-color-hover);
        box-shadow: none;
      }
    `}

  ${({ variant }) =>
    variant === ButtonVariant.SECONDARY &&
    css`
      background-color: var(--button-variant-secondary-bg-color);
      border: 1px solid var(--button-variant-secondary-border-color);

      & > p {
        color: var(--text-0) !important;
      }

      &:hover {
        background-color: var(--button-variant-secondary-bg-color-hover);
        border: 1px solid var(--button-variant-secondary-border-color-hover);
      }
    `}

  ${({ variant }) =>
    variant === ButtonVariant.OUTLINE &&
    css`
      background-color: var(--button-variant-outline-background-color);
      border: 1px solid var(--button-variant-outline-border-color);

      & > p {
        color: var(--background-500) !important;
      }

      &:hover {
        background-color: var(--button-variant-outline-background-color-hover);
        border: 1px solid var(--button-variant-outline-border-color-hover);
      }
    `}

  ${({ variant }) =>
    variant === ButtonVariant.WARNING &&
    css`
      background-color: var(--button-variant-warning-background-color);
      border: 1px solid var(--button-variant-warning-border-color);
      box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.25) inset;

      & > p {
        color: var(--text-0) !important;
      }

      &:hover {
        background-color: var(--button-variant-warning-background-color-hover);
        border: 1px solid var(--button-variant-warning-border-color-hover);
        box-shadow: none;
      }
    `}
`;

const Root = styled.div`
  position: relative;
  display: flex;
  width: fit-content;
  height: 40px;
  user-select: none;

  /**
   * Sizes
  */
  ${({ size }) =>
    size === ButtonSize.MEDIUM &&
    css`
      height: var(--button-size-medium);
    `}

  ${({ size }) =>
    size === ButtonSize.SMALL &&
    css`
      height: var(--button-size-small);
    `}

  /**
   * State
  */
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;

      ${ButtonRoot} {
        pointer-events: none;

        & > p {
          color: var(--text-100) !important;
        }
      }
    `}

  ${({ disabled, variant }) =>
    disabled &&
    [
      ButtonVariant.PRIMARY,
      ButtonVariant.SECONDARY,
      ButtonVariant.WARNING,
    ].includes(variant) &&
    css`
      ${ButtonRoot} {
        background-color: var(--background-color-disabled) !important;
        border: 1px solid var(--background-color-disabled) !important;
        opacity: 0.5;
      }
    `}

  ${({ disabled, variant }) =>
    disabled &&
    variant === ButtonVariant.OUTLINE &&
    css`
      ${ButtonRoot} {
        background-color: transparent !important;
      }
    `}
`;
