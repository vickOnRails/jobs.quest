import React, { FC, useState, FormEvent } from "react";
import styled from "@emotion/styled";
import { Box, Text, Button, ButtonGroup, Textarea } from "@chakra-ui/react";
import { Edit3 } from "react-feather";
import { useMutation } from "react-query";

const Note: FC<{ note: string }> = ({ note: initialNote }) => {
  const [editing, setEditing] = useState(false);
  // use normal react state instead of formik
  const [noteContent, setNoteContent] = useState(initialNote);
  const {
    mutate: editNoteMutation,
    isLoading,
    error,
  } = useMutation(async (evt: FormEvent) => {
    evt.preventDefault();
  });

  return (
    <StyledNote borderRadius="md" mb="3" boxShadow="sm">
      <form onSubmit={editNoteMutation}>
        {editing ? (
          <>
            <Textarea
              mb="3"
              rows={5}
              defaultValue={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />
            <ButtonGroup spacing="3" mb="3">
              <Button
                size="sm"
                colorScheme="green"
                type="submit"
                isLoading={isLoading}
              >
                Save
              </Button>
              <Button size="sm" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </ButtonGroup>
          </>
        ) : (
          <>
            <Text>{noteContent}</Text>
            <Button
              onClick={() => setEditing(true)}
              className="edit"
              size="sm"
              variant="outline"
              bg="white"
              shadow="md"
            >
              <Edit3 className="edit-icon" />
            </Button>
          </>
        )}
      </form>
    </StyledNote>
  );
};

interface Note {
  body: string;
}

export const NotesContainer: FC<{ notes: Note[] }> = ({ notes }) => {
  return (
    <>
      {notes.map((note) => (
        <Note note={note.body} />
      ))}
    </>
  );
};

export const StyledNotesContainer = styled(Box)`
  height: 100%;
  overflow-y: auto;
  color: var(--chakra-colors-gray-600);
`;

const StyledNote = styled(Box)`
  padding: 0.5em;
  border: 1px solid var(--chakra-colors-gray-100);
  position: relative;
  min-height: 50px;

  p {
    margin: 0;
  }

  .edit {
    display: none;
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 1;
  }

  :hover .edit {
    display: block;
  }
`;

export { Note };
