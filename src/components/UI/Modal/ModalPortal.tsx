import styled from 'styled-components';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';

interface Props {
  onClose: () => void;
  children: ReactNode;
  width?: string;
  maxWidth?: string;
}

function ModalPortal({ onClose, children, width, maxWidth }: Props) {
  const el = document.getElementById('modal-root') as HTMLElement;
  return createPortal(
    <Overlay onClick={onClose}>
      <Content
        contentWidth={width}
        maxWidth={maxWidth}
        onClick={(event) => event.stopPropagation()}
      >
        <AiOutlineClose onClick={onClose} />
        {children}
      </Content>
    </Overlay>,
    el,
  );
}

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

type ContentProps = {
  contentWidth?: string;
  maxWidth?: string;
};

export const Content = styled.section<ContentProps>`
  background-color: var(--white);
  border-radius: 5px;
  border-color: var(--color-borderbox-line);
  padding: 20px;
  max-width: ${(props) => props.maxWidth || '90%'};
  max-height: 90%;
  overflow: auto;
  width: ${(props) => props.contentWidth};

  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    align-self: end;
  }

  h3 {
    font-size: var(--font-size-xl);
    margin-bottom: 20px;
  }

  p {
    font-size: var(--font-size-m);
    color: var(--color-content-text);
    margin-bottom: 20px;
  }

  button + button {
    margin-left: 30px;
  }
`;

export default ModalPortal;
