import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Button,
    ImageBackground
} from "react-native";
import Constants from "expo-constants";
import GlobalContext from "../context/Context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { pickImage, askForPermission, uploadImage } from "../utils";
import { auth, db } from "../firebase";
import { updateProfile } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
    const [displayName, setDisplayName] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [permissionStatus, setPermissionStatus] = useState(null);
    const navigation = useNavigation();
    useEffect(() => {
        (async () => {
            const status = await askForPermission();
            setPermissionStatus(status);
        })();
    }, []);

    const {
        theme: { colors },
    } = useContext(GlobalContext);

    async function handlePress() {
        const user = auth.currentUser;
        let photoURL;
        if (selectedImage) {
            const { url } = await uploadImage(
                selectedImage,
                `images/${user.uid}`,
                "profilePicture"
            );
            photoURL = url;
        }
        const userData = {
            displayName,
            email: user.email,
        };
        if (photoURL) {
            userData.photoURL = photoURL;
        }

        await Promise.all([
            updateProfile(user, userData),
            setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid }),
        ]);
        navigation.navigate("home");
    }

    async function handleProfilePicture() {
        const result = await pickImage();
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    }

    if (!permissionStatus) {
        return <Text>Loading</Text>;
    }
    if (permissionStatus !== "granted") {
        return <Text>You need to allow this permission</Text>;
    }
    return (
        <ImageBackground
            resizeMode="cover"
            source={require("../assets/bg_profile.jpg")}
            style={{ flex: 1 }}
        >
            <React.Fragment>
                <StatusBar style="auto" />
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                        paddingTop: Constants.statusBarHeight + 20,
                        padding: 20,
                    }}
                >
                    <Text style={{ fontSize: 22, color: "green", fontWeight: "800" }}>
                        Profile Info
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            color: "white",
                            marginTop: 20,
                        }}
                    >
                        Give me your name and show me your stupid face
                    </Text>
                    <TouchableOpacity
                        onPress={handleProfilePicture}
                        style={{
                            marginTop: 30,
                            borderRadius: 120,
                            width: 120,
                            height: 120,
                            backgroundColor: colors.background,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {!selectedImage ? (
                            <MaterialCommunityIcons
                                name="camera-plus"
                                color={colors.iconGray}
                                size={45}
                            />
                        ) : (
                            <Image
                                source={{ uri: selectedImage }}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: 120,
                                }}
                            />
                        )}
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Type your name"
                        placeholderTextColor="green"
                        value={displayName}
                        onChangeText={setDisplayName}
                        style={{
                            borderBottomColor: colors.primary,
                            marginTop: 40,
                            borderBottomWidth: 2,
                            fontWeight: "700",
                            color: "#fbafe0",
                            width: "100%",
                        }}
                    />
                    <View style={{ marginTop: "auto", width: 80 }}>
                        <Button
                            title="Next"
                            color={colors.secondary}
                            onPress={handlePress}
                            disabled={!displayName}
                        />
                    </View>
                </View>
            </React.Fragment>
        </ImageBackground>
    );
}
