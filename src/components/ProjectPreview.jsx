import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "@heroui/react";


export default function ProjectPreview({project, isOpen, onOpen, onClose}) {
  if (!isOpen) return null

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpen} className='text-black'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{project.title}</ModalHeader>
              <ModalBody>
                <p>{project.description}</p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    )
}