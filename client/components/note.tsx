import React, { FC, useState, FormEvent } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Text,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Divider,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Edit3, Trash2 } from "react-feather";
import { useMutation } from "react-query";
import { deleteJobNote } from "../utils/services/delete-job-note";
import { createJobNote } from "../utils/services/create-job-note";
import { JobInfoProp } from "../pages/app";
import { editJobNote } from "../utils/services/edit-job-note";

const Note: FC<{
  note: Note;
  onDelete: (id: string) => void;
  refetchJob: () => void;
  idx: number;
}> = ({ note: initialNote, onDelete, refetchJob, idx }) => {
  const [editing, setEditing] = useState(false);
  const toast = useToast();

  // use normal react state instead of formik
  const [noteContent, setNoteContent] = useState(initialNote);
  const {
    mutate: editNoteMutation,
    isLoading,
    error,
  } = useMutation(async (evt: FormEvent) => {
    evt.preventDefault();

    try {
      const {
        updateNote: { id, body },
      } = await editJobNote(noteContent?.id, {
        body: noteContent.body,
      });

      toast({
        title: `Note edited`,
        status: "success",
        duration: 1000,
        isClosable: true,
      });

      setNoteContent({ id, body });
      setEditing(false);
      // find the exact note
      // replace the body
    } catch (err) {
      if (err instanceof Error)
        toast({
          title: "An error occurred",
          status: "error",
          // @ts-ignore
          description: err.response && err.response.errors[0].message,
          duration: 5000,
          position: "top",
          isClosable: true,
        });
    }
  });

  const {
    isLoading: isNoteDeleting,
    error: deletingNotesError,
    mutate: deleteNote,
  } = useMutation(async () => {
    try {
      const {
        deleteNote: { id },
      } = await deleteJobNote(initialNote.id);

      await refetchJob();
      onDelete(id);

      toast({
        title: "Note deleted",
        status: "success",
        position: "top",
        isClosable: true,
        duration: 1500,
      });
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "An error occurred",
          status: "error",
          // @ts-ignore
          description: err.response && err.response.errors[0].message,
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      }
    }
  });

  return (
    <StyledNote borderRadius="md" mb="3" boxShadow="sm">
      {editing ? (
        <form onSubmit={editNoteMutation}>
          <Textarea
            mb="3"
            rows={5}
            defaultValue={noteContent.body}
            onChange={(e) =>
              setNoteContent({ ...initialNote, body: e.target.value })
            }
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
            <Button size="sm" onClick={() => setEditing(false)} type="button">
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      ) : (
        <>
          <Text>{noteContent.body}</Text>
          <ButtonGroup className="btn-group">
            <Button
              onClick={() => setEditing(true)}
              className="edit"
              size="sm"
              variant="outline"
              bg="white"
              shadow="md"
            >
              <Edit3 className="edit-icon" size="15" />
            </Button>
            <Button
              onClick={() => deleteNote()}
              className="delete"
              size="sm"
              variant="outline"
              colorScheme="red"
              isLoading={isNoteDeleting}
              bg="white"
              shadow="md"
            >
              <Trash2 className="delete-icon" size="15" />
            </Button>
          </ButtonGroup>
        </>
      )}
    </StyledNote>
  );
};

interface Note {
  body: string;
  id: string;
}

export const NotesContainer: FC<{
  notes?: Note[];
  jobId: JobInfoProp | null;
  refetchJob: any;
}> = ({ notes: initialNotes, jobId, refetchJob }) => {
  const [newNoteMode, setNewNoteMode] = useState(false);
  const [newNoteValue, setNewNoteValue] = useState("");
  const [notes, setNotes] = useState(initialNotes);
  const toast = useToast();

  const onDelete = (id: string) =>
    setNotes(notes?.filter((note) => note.id !== id));

  const {
    mutate: createNoteMutation,
    isLoading: creatingNoteLoading,
    error: creatingNodeError,
  } = useMutation(async (evt: FormEvent) => {
    evt.preventDefault();

    try {
      const note = {
        body: newNoteValue,
      };
      const {
        createNote: { body, id },
      } = await createJobNote({ note, jobId: jobId?.jobId });

      await refetchJob();
      setNewNoteValue("");

      notes && setNotes([{ body, id }, ...notes]);
      setNewNoteMode(false);

      toast({
        title: "Note saved",
        status: "success",
        position: "top",
        isClosable: true,
        duration: 1500,
      });
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "An error occurred",
          status: "error",
          // @ts-ignore
          description: err.response && err.response.errors[0].message,
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      }
    }
  });

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" mb="4">
        <Heading as="h4" size="md">
          Notes
        </Heading>
        {!newNoteMode && jobId && (
          <Button
            size="sm"
            variant="solid"
            colorScheme="green"
            onClick={() => setNewNoteMode(true)}
          >
            New
          </Button>
        )}
      </Flex>
      {newNoteMode && (
        <form onSubmit={createNoteMutation}>
          <Box>
            <Textarea
              placeholder="Something important about this role..."
              className="notes-input"
              required
              mb="3"
              rows={4}
              value={newNoteValue}
              onChange={(e) => setNewNoteValue(e.target.value)}
            ></Textarea>

            <ButtonGroup spacing="3" mb="5">
              <Button
                size="sm"
                colorScheme="green"
                isLoading={creatingNoteLoading}
                type="submit"
              >
                Save
              </Button>
              <Button size="sm" onClick={() => setNewNoteMode(false)}>
                Cancel
              </Button>
            </ButtonGroup>
          </Box>

          <Divider mb="4" />
        </form>
      )}

      {/* show notes, only if job has notes */}
      {notes && notes.length > 0
        ? notes.map((note, idx) => (
            <Note
              note={note}
              key={note.id}
              idx={idx}
              onDelete={onDelete}
              refetchJob={refetchJob}
            />
          ))
        : // hide empty note indicator if we're creating new note
          !newNoteMode && jobId && <p>Notes do not exist. Pls add some</p>}

      {!jobId && <p>First create a job to add notes</p>}
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

  .btn-group {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 1;
  }

  .edit,
  .delete {
    display: none;
  }

  :hover .edit,
  :hover .delete {
    display: block;
  }
`;

export { Note };
