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
                  imageFolder='/images/projects/'
                  height={120}
                />
              )}

              <Divider className='my-6' />
              <p dangerouslySetInnerHTML={{ __html: project.description }} />
            </Text>
          </ModalBody>
          <ModalFooter>
            <FadeScrollContainer>
              <TagsContainer>
                { project.tags.map(tag => <Chip key={tag}>{tag}</Chip>) }
              </TagsContainer>
            </FadeScrollContainer>
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

const FadeScrollContainer = styled.div`
  position: relative;
  width: 100%;
  margin-right: auto;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 30px;
    z-index: 2;
    pointer-events: none;
    background: linear-gradient(to left, white, transparent);
  }
`

const TagsContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;