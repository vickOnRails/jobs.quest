import React, { FC, HTMLAttributes } from "react";
import styled from "@emotion/styled";

import {
  Button,
  ModalBody,
  ModalContent,
  Modal,
  ModalOverlay,
  ModalFooter,
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
      <ModalContent
        maxW="90vw"
        minH="90vh"
        position="absolute"
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
      </ModalContent>
    </Modal>
  );
};

interface BottomSheetModal extends ModalProps {
  title?: string;
}
