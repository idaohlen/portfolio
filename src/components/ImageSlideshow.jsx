import { useState } from 'react'
import styled from 'styled-components'
import {
  Modal,
  ModalContent,
  ModalBody,
  Image
} from '@heroui/react'
import { Icon } from '@iconify/react'

export default function ImageSlideshow({ 
  images, 
  imageFolder = '/images/',
  height = '200px',
  imagesPerPage = 3
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  
  if (!images || images.length === 0) return null;
  
  // Calculate total number of pages
  const totalPages = Math.ceil(images.length / imagesPerPage);
  
  // Get current visible images
  const visibleImages = [];
  const startIndex = currentPage * imagesPerPage;
  const endIndex = Math.min(startIndex + imagesPerPage, images.length);
  
  for (let i = startIndex; i < endIndex; i++) {
    visibleImages.push(images[i]);
  }
  
  function nextPage(e) {
    e.stopPropagation();
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  }
  
  function prevPage(e) {
    e.stopPropagation();
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  }
  
  function nextSlide(e) {
    e.stopPropagation();
    setModalImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }
  
  function prevSlide(e) {
    e.stopPropagation();
    setModalImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }
  
  function openModal(index) {
    setModalImageIndex(index);
    setModalOpen(true);
  }

  return (
    <>
      <SlideshowContainer style={{ height }}>
        {/* Left navigation arrow */}
        {totalPages > 1 && (
          <NavButton onClick={prevPage} className="left">
            <Icon icon="heroicons:chevron-left" width={20} height={20} />
          </NavButton>
        )}
        
        {/* Images grid */}
        <ImagesGrid $imagesCount={visibleImages.length}>
          {visibleImages.map((image, index) => (
            <ImageWrapper 
              key={startIndex + index} 
              onClick={() => openModal(startIndex + index)}
            >
              <StyledImage
                src={`${imageFolder}${image}`}
                alt={`Image ${startIndex + index + 1}`}
              />
            </ImageWrapper>
          ))}
        </ImagesGrid>
        
        {/* Right navigation arrow */}
        {totalPages > 1 && (
          <NavButton onClick={nextPage} className="right">
            <Icon icon="heroicons:chevron-right" width={20} />
          </NavButton>
        )}
        
        {/* Page indicators */}
        {totalPages > 1 && (
          <PageIndicators>
            {[...Array(totalPages)].map((_, index) => (
              <PageIndicator 
                key={index}
                active={index === currentPage}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentPage(index)
                }}
              />
            ))}
          </PageIndicators>
        )}
      </SlideshowContainer>

      {/* Modal for viewing larger image */}
      <Modal 
        isOpen={modalOpen} 
        onOpenChange={setModalOpen}
        size="full"
        hideCloseButton
      >
        <ModalContent style={{height: '100%'}}>
          <ModalBody className="p-0">
            <FullImageContainer>
              {images.length > 1 && (
                <NavigationControls>
                  <SlideButton 
                    onClick={prevSlide}
                    className="left"
                  >
                    <Icon icon="heroicons:chevron-left" width={24} />
                  </SlideButton>
                  
                  <SlideButton 
                    onClick={nextSlide}
                    className="right"
                  >
                    <Icon icon="heroicons:chevron-right" width={24} />
                  </SlideButton>
                </NavigationControls>
              )}
              <Image
                src={`${imageFolder}${images[modalImageIndex]}`}
                alt={`Image ${modalImageIndex + 1}`}
                className="w-full h-auto max-h-[80vh]"
              />

              <CloseButton onClick={() => setModalOpen(false)}>
                <Icon icon="heroicons:x-mark" width={32} />
              </CloseButton>
            </FullImageContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const SlideshowContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
`

const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => 
    props.$imagesCount === 1 ? '1fr' : 
    props.$imagesCount === 2 ? '1fr 1fr' : 
    'repeat(3, 1fr)'};
  gap: 4px;
  width: 100%;
  height: 100%;
`

const ImageWrapper = styled.div`
  cursor: pointer;
  height: 100%;
  overflow: hidden;
`

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }
`

const NavButton = styled.button`
  position: absolute;
  z-index: 5;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &.left {
    left: 8px;
  }
  
  &.right {
    right: 8px;
  }
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`

const PageIndicators = styled.div`
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
`

const PageIndicator = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.8)'};
  }
`

const NavigationControls = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  z-index: 20;
`

const SlideButton = styled.button`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 4px;
  padding: .5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`

const FullImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  width: 100%;
  height: 100%;
`

const CloseButton = styled.button`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(0, 0, 0, 0);
  color: white;
  border: 1px solid transparent;
  border-radius: 4px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  transition: all .3s;
  
  &:hover {
    background: rgba(0, 0, 0, 0.7);
    border: 1px solid #ffffff5c;
  }
`