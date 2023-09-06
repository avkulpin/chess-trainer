'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import { IS_BROWSER } from '../utils/isBrowser';

export const StyledComponentsProvider = ({ children }) => {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());
  const shouldForwardProp = useCallback(
    (propName, child) => typeof child === 'function' || isPropValid(propName),
    [],
  );
  const options = useMemo(() => {
    const result = {
      shouldForwardProp,
    };

    if (!IS_BROWSER) {
      result.sheet = styledComponentsStyleSheet;
    }

    return result;
  }, [IS_BROWSER, shouldForwardProp, styledComponentsStyleSheet]);

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();

    return <>{styles}</>;
  });

  return <StyleSheetManager {...options}>{children}</StyleSheetManager>;
};
