import Image from 'next/image';
import styled from 'styled-components';
import { Button } from './Button';

export const IconButton = ({ src, ...props }) => {
  return (
    <Root {...props}>
      <Image src={src} alt="Button Icon" width={20} height={20} />
    </Root>
  );
};

const Root = styled(Button)`
  width: 32px !important;
`;
