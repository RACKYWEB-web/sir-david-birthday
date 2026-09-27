import React, { createContext, useContext, useState, useEffect } from 'react';
import { CELEBRANT_INFO } from '../data/experienceData';

interface PhotoContextType {
  photoUrl: string | null;
  setPhotoUrl: (url: string) => void;
  removePhoto: () => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const STORAGE_KEY = 'sibigam_david_celebrant_photo_v4';

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photoUrl, setPhotoUrlState] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 1. Check local storage for user-uploaded or overridden photo
    const storedPhoto = localStorage.getItem(STORAGE_KEY);
    if (storedPhoto && storedPhoto.trim() !== '') {
      setPhotoUrlState(storedPhoto);
      return;
    }

    // 2. Fallback to default photoUrl defined in experienceData
    if (CELEBRANT_INFO.photoUrl && CELEBRANT_INFO.photoUrl.trim() !== '') {
      setPhotoUrlState(CELEBRANT_INFO.photoUrl);
    }
  }, []);

  const setPhotoUrl = (url: string) => {
    setPhotoUrlState(url);
    try {
      localStorage.setItem(STORAGE_KEY, url);
    } catch (e) {
      console.warn('Could not save photo to localStorage', e);
    }
  };

  const removePhoto = () => {
    setPhotoUrlState(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Could not remove photo from localStorage', e);
    }
  };

  return (
    <PhotoContext.Provider
      value={{
        photoUrl,
        setPhotoUrl,
        removePhoto,
        isModalOpen,
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const useCelebrantPhoto = (): PhotoContextType => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('useCelebrantPhoto must be used within a PhotoProvider');
  }
  return context;
};
