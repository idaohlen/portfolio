import styled from 'styled-components'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
  Divider
} from "@heroui/react";
import IconButton from '@/components/IconButton'
import ImageSlideshow from '@/components/ImageSlideshow'
import { handleRedirect } from '@/utils/utils'

export default function ProjectPreview({project, isOpen, onOpen, onClose}) {
  if (!isOpen) return null

    return (
      <Modal isOpen={isOpen} size='xl' onOpenChange={onOpen} scrollBehavior='inside' hideCloseButton className='text-black'>
        <ModalContent>
          <ModalHeader className='flex items-center gap-1'>
            <div className='mr-auto'>{project.title}</div>
            { project.repoUrl && <IconButton icon='mdi:github' label='GitHub' onPress={() => handleRedirect(project.repoUrl)} /> }
            { project.previewUrl && <IconButton icon='material-symbols:search-rounded' label='Preview' onPress={() => handleRedirect(project.previewUrl)} /> }
          </ModalHeader>
          <ModalBody>
            <Text>
              <p className='font-semibold'>{project.tagline}</p>

              {project.images && project.images.length > 0 && (
                <ImageSlideshow
                  images={project.images}
                  imageFolder='/images/projects/min/'
                  height={120}
                />
              )}

              <div className='flex flex-wrap gap-2'>
                { project.tags.map(tag => <Chip key={tag}>{tag}</Chip>) }
              </div>

              <Divider className='my-6' />
              <p dangerouslySetInnerHTML={{ __html: project.description }} />
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
  a {
    color: #d442a8;
  }

  p:first-child {
    margin-top: 0;
  }
  p {
    margin-block: .5rem;
  }
  ul {
    list-style-type: disc;
    list-style-position: outside;
    padding-left: 1.5rem;
    margin-block: 1rem;
  }
  li {
    font-size: .9rem;
    padding-left: 0.5rem;
    margin-bottom: 0.25rem;
  }
`