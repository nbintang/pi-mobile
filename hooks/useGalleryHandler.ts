import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

export const useGalleryHandler = () => {
  const [capturedImageFromGallery, setCapturedImageFromGallery] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const [permission, setPermission] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Camera permission is required to take photos",
        });
      } else {
        setPermission(true);
      }
    })();
  }, []);
  const openGallery =
    async (): Promise<ImagePicker.ImagePickerAsset | null> => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Camera permission is required to take photos",
        });
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        aspect: [224, 224],
        allowsEditing: true,
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        setCapturedImageFromGallery(asset);
        return asset;
      }
      return null;
    };

  const clearCapturedImageFromGallery = () => {
    setCapturedImageFromGallery(null);
  };

  return {
    hasPermission: permission,
    capturedImageFromGallery,
    openGallery,
    clearCapturedImageFromGallery,
  };
};
