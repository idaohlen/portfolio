import styled from 'styled-components'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "@heroui/react";
import IconButton from '@/components/IconButton'
import { handleRedirect } from '@/utils/utils'

export default function ProjectPreview({project, isOpen, onOpen, onClose}) {
  if (!isOpen) return null

    return (
      <Modal isOpen={isOpen} onOpenChange={onOpen} hideCloseButton className='text-black'>
        <ModalContent>
          <ModalHeader className="flex items-center gap-1">
            <div className='mr-auto'>{project.title}</div>
            <IconButton icon='mdi:github' label='GitHub' onPress={() => handleRedirect(project.repoUrl)} />
            <IconButton icon='material-symbols:search-rounded' label='Preview' onPress={() => handleRedirect(project.previewUrl)} />
          </ModalHeader>
          <ModalBody>
            <Text>
              <p>{project.tagline}</p>
              <p>{project.description}</p>
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}

const Text = styled.div`
  p:first-child {
    margin-top: 0;
  }
  p {
    margin-block: .5rem;
  }
`