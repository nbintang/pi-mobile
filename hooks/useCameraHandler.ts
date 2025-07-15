
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";



export const useImagePicker = () => {
  const [capturedImage, setCapturedImage] = useState< ImagePicker.ImagePickerAsset | null>(
    null
  );
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

  const openCamera = async (): Promise<ImagePicker.ImagePickerAsset | null> => {
    if (!permission) {
      Toast.show({
        type: "error",
        text1: "Camera permission is required",
      });
      return null;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [224, 224],
      quality: 1,
      exif: true,
    });
    if (!result.canceled) {
      const asset = result.assets[0];
      setCapturedImage(asset);
      return asset;
    }
    return null;
  };

  const clearCapturedImage = () => setCapturedImage(null);

  return {
    capturedImage,
    openCamera,
    clearCapturedImage,
    hasPermission: permission,
  };
};
