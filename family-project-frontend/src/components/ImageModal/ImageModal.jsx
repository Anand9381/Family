import "./ImageModal.css";

const ImageModal = ({ image, onClose }) => {
  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <span className="close-btn" onClick={onClose}>✕</span>
      <img
        src={image}
        alt="Zoomed"
        className="zoomed-image"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default ImageModal;
