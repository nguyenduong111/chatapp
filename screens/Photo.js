import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { pickImage } from "../utils";

export default function Photo() {
  const navigation = useNavigation();
  const [canceled, setCanceled] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const result = await pickImage();
      navigation.navigate("contacts", { image: result });
      if (result.canceled) {
        setCanceled(true);
        setTimeout(() => navigation.navigate("chats"), 100);
      }
    });
    return () => unsubscribe()
  }, [navigation, canceled]);
  return <View />;
}
