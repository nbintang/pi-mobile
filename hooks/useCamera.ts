// hooks/useCamera.ts
import { useState, useRef, useEffect } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

interface CapturedPhoto {
  uri: string;
  width: number;
  height: number;
}

export const useCamera = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<CapturedPhoto | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  // Request media library permissions on mount
  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Media library permission is required to save photos');
      }
    })();
  }, []);

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async (): Promise<CapturedPhoto | null> => {
    if (!cameraRef.current || isCapturing) return null;

    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      
      if (photo) {
        const capturedPhoto: CapturedPhoto = {
          uri: photo.uri,
          width: photo.width,
          height: photo.height,
        };
        
        setCapturedImage(capturedPhoto);
        setShowCamera(false);
        
        // Save to media library
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        
        return capturedPhoto;
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to take picture');
    } finally {
      setIsCapturing(false);
    }
    
    return null;
  };

  const openCamera = async (): Promise<boolean> => {
    if (!permission) return false;

    if (!permission.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert('Permission denied', 'Camera permission is required to take photos');
        return false;
      }
    }

    setShowCamera(true);
    return true;
  };

  const closeCamera = () => {
    setShowCamera(false);
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setShowCamera(true);
  };

  const clearCapturedImage = () => {
    setCapturedImage(null);
  };

  return {
    // States
    facing,
    showCamera,
    capturedImage,
    isCapturing,
    permission,
    cameraRef,
    
    // Actions
    toggleCameraFacing,
    takePicture,
    openCamera,
    closeCamera,
    retakePicture,
    clearCapturedImage,
    
    // Computed
    hasPermission: permission?.granted ?? false,
  };
};
