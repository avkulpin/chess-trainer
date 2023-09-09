import { useMemo, useRef } from 'react';
import styled from 'styled-components';

export const Counter = ({ value = 0, lineHeight = 21 }) => {
  const sign = value < 0 ? '-' : '';
  const parsedValue = value === 0 ? '0.00' : value;
  const stripped = useMemo(
    () => parsedValue.toString().split('.'),
    [parsedValue],
  );
  const decimals = useMemo(
    () => (!stripped[1] ? '00' : stripped[1].split('')),
    [stripped],
  );

  return (
    <Root lineHeight={lineHeight} value={value}>
      <NumberVisible>
        <Scroller isSeparator value={sign} lineHeight={lineHeight} />
      </NumberVisible>
      <NumberVisible>
        <Scroller value={stripped[0]} lineHeight={lineHeight} max={99} />
      </NumberVisible>
      <NumberVisible>
        <Scroller isSeparator value={'.'} lineHeight={lineHeight} />
      </NumberVisible>
      <NumberVisible>
        <Scroller value={decimals[0]} lineHeight={lineHeight} />
      </NumberVisible>
      <NumberVisible>
        <Scroller value={decimals[1]} lineHeight={lineHeight} />
      </NumberVisible>
    </Root>
  );
};

const Scroller = ({ isSeparator, value, lineHeight, max = 10 }) => {
  const ref = useRef();
  const numbers = useMemo(() => Array.from(Array(max).keys()), []);
  const signs = useMemo(() => ['', '-'], []);

  if (isSeparator) {
    if (value === '.' || value === ',') {
      return (
        <ScrollerRoot scrollBy={0} ref={ref}>
          <ScrollerSpan>{value}</ScrollerSpan>
        </ScrollerRoot>
      );
    }

    return (
      <ScrollerRoot scrollBy={value ? lineHeight * -1 : 0} ref={ref}>
        {signs.map((sign) => (
          <ScrollerSpan>
            {sign ? sign : <span style={{ opacity: 0 }}>+</span>}
          </ScrollerSpan>
        ))}
      </ScrollerRoot>
    );
  }

  const parsedValue = value === '' || value === undefined ? 0 : parseInt(value);
  const index = numbers.findIndex((number) => number === Math.abs(parsedValue));

  console.log(parsedValue);

  return (
    <ScrollerRoot scrollBy={index * lineHeight * -1}>
      {numbers.map((number) => (
        <ScrollerSpan>{number}</ScrollerSpan>
      ))}
    </ScrollerRoot>
  );
};

const Root = styled.div`
  display: flex;
  user-select: none;
  font-size: 20px;
  line-height: ${({ lineHeight }) => `${lineHeight}px`};
  font-weight: 500;
  color: ${({ value }) =>
    value === 0 ? `#fff` : value < 0 ? '#ac0f0f' : '#599a11'};
`;

const NumberVisible = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 21px;
  height: 21px;
  overflow: hidden;
`;

const ScrollerRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 21px;
  will-change: transform;
  transition: 2000ms ease transform;
  transform: ${({ scrollBy = 0 }) => `translateY(${scrollBy}px)`};
`;

const ScrollerSpan = styled.span`
  transition: 2000ms color ease;
`;
