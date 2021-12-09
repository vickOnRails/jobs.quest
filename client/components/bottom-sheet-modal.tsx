import React, { FC } from "react";
import styled from "@emotion/styled";

import {
  ModalBody,
  ModalContent,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalProps,
} from "@chakra-ui/react";

// BottomSheetModal for managing job info
// wraps around the Chakra Modal Component

// FIXME: use appropriate types

export const BottomSheetModal: FC<BottomSheetModal> = ({
  children,
  isOpen,
  onClose,
  title,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <StyledModalContent
        maxW="90vw"
        minH="90vh"
        maxH="90vh"
        position="absolute"
        overflow="auto"
        bottom="0"
        margin="0"
      >
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        {/* <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter> */}
      </StyledModalContent>
    </Modal>
  );
};

interface BottomSheetModal extends ModalProps {
  title?: string;
}

const StyledModalContent = styled(ModalContent)``;
