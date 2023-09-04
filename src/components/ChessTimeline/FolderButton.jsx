import Image from 'next/image';
import styled from 'styled-components';

export const FolderButton = (props) => {
  return (
    <Root {...props}>
      <Image src="/icons/folder.svg" alt="Folder Icon" width={20} height={20} />
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: 200ms ease background-color;
  will-change: background-collor;
  user-select: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
