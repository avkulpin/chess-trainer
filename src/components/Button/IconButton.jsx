import Image from 'next/image';
import styled from 'styled-components';
import { Button } from './Button';

export const IconButton = ({ src, ...props }) => {
  return (
    <Root {...props}>
      <Image src={src} alt="Button Icon" width={30} height={30} />
    </Root>
  );
};

const Root = styled(Button)`
  width: 100px !important;
`;
