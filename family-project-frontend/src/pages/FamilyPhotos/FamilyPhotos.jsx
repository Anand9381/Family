import { useEffect, useState } from "react";
import api from "../../api/api";
import PasswordModal from "../../components/PasswordModal/PasswordModal";
import ImageModal from "../../components/ImageModal/ImageModal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./FamilyPhotos.css";

const FamilyPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    const res = await api.get("/family");
    setPhotos(res.data);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", file);
    await api.post("/family/add", formData);
    setFile(null);
    fetchPhotos();
  };

  const deleteImage = async () => {
    await api.delete(`/family/${deleteId}`);
    setDeleteId(null);
    fetchPhotos();
  };

  // ✅ DRAG HANDLER
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setPhotos(items);
  };

  return (
    <div className="family-page">
      <button className="add-btn">
        <label>
          + Add
          <input hidden type="file" onChange={(e) => setFile(e.target.files[0])} />
        </label>
      </button>

      <button className="upload-btn" onClick={() => setShowPassword(true)}>
        Upload
      </button>

      {showPassword && (
        <PasswordModal
          onClose={() => setShowPassword(false)}
          onSuccess={uploadImage}
        />
      )}

      {deleteId && (
        <PasswordModal
          onClose={() => setDeleteId(null)}
          onSuccess={deleteImage}
        />
      )}

      {zoomImage && (
        <ImageModal image={zoomImage} onClose={() => setZoomImage(null)} />
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="familyPhotos" direction="horizontal">
          {(provided) => (
            <div
              className="photo-grid"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {photos.map((p, index) => (
                <Draggable key={p._id} draggableId={p._id} index={index}>
                  {(provided) => (
                    <div
                      className="photo-card"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                     <img
  src={p.imageUrl}
  alt="family"
  onClick={() => setZoomImage(p.imageUrl)}
/>

                      <span
                        className="delete-icon"
                        onClick={() => setDeleteId(p._id)}
                      >
                        🗑
                      </span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default FamilyPhotos;
