import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Dialog } from '@headlessui/react';

const ImageUploader = ({ onImagesChange }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    const updatedImages = [...selectedImages, ...newImages];
    setSelectedImages(updatedImages);
    onImagesChange(updatedImages); // Pass the updated array to the parent component
  };

  const handleRemoveImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    onImagesChange(updatedImages); // Pass the updated array to the parent component
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
  });

  return (
    <div className="flex flex-col items-center">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className="w-full h-40 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer p-4 hover:border-[#0093ff]"
      >
        <input {...getInputProps()} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          width="32"
          height="32"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
          />
        </svg>
        <button
          type="button"
          className="mt-2 bg-[#0093ff] text-white px-4 py-2 rounded-md"
        >
          Select
        </button>
        <p className="text-sm text-gray-500 mt-2">OR DROP FILES HERE</p>
      </div>

      {/* Display Selected Images in a Grid */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {selectedImages.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image.preview}
              alt={`Selected ${index}`}
              className="w-full h-32 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Optional: Modal to View Image (HeadlessUI Dialog) */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <div className="bg-white p-4 rounded shadow-lg">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              Image Preview
            </Dialog.Title>
            <img
              src={selectedImages.length ? selectedImages[0].preview : ''}
              alt="Preview"
              className="w-full mt-4"
            />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-[#0093ff] text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ImageUploader;
