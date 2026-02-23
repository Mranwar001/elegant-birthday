import React, { useState, useEffect, useRef } from 'react';
import { images } from '../data';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleImages, setVisibleImages] = useState([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const imagesPerPage = 6;

  useEffect(() => {
    setVisibleImages(images.slice(0, imagesPerPage * page));
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleImages.length < images.length) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => observer.disconnect();
  }, [visibleImages.length]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="gallery-container">
      <div className="masonry-grid">
        {visibleImages.map((image, index) => (
          <div 
            key={image.id}
            className="gallery-item"
            onClick={() => handleImageClick(image)}
          >
            <img 
              src={image.thumbnail} 
              alt={image.caption}
              loading="lazy"
              className="gallery-image"
            />
            <div className="image-caption">
              <h3>{image.caption}</h3>
              <p>{image.location} • {image.date}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div ref={loader} className="loader-trigger">
        {visibleImages.length < images.length && (
          <div className="loading-spinner">Loading more memories...</div>
        )}
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>×</button>
            <img src={selectedImage.src} alt={selectedImage.caption} className="modal-image" />
            <div className="modal-caption">
              <h2>{selectedImage.caption}</h2>
              <p>{selectedImage.location} • {selectedImage.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
