import React, { useContext, useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    Button,
    ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Context from "../context/Context";
import { signIn, signUp } from "../firebase";
export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("signUp");
    const {
        theme: { colors },
    } = useContext(Context);

    async function handlePress() {
        if (mode === "signUp") {
            await signUp(email, password);
        }
        if (mode === "signIn") {
            await signIn(email, password);
        }
    }
    return (
        <ImageBackground
            resizeMode="cover"
            source={require("../assets/bg_login.jpg")}
            style={{ flex: 1 }}
        >
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    // backgroundColor: "#433069",
                }}
            >
                <Text
                    style={{
                        color: "#fffffd",
                        fontSize: 24,
                        marginBottom: 20,
                    }}
                >
                    Welcome to Universe
                </Text>
                <Image
                    source={require("../assets/logo_login.png")}
                    style={{ width: 180, height: 180 }}
                    resizeMode="cover"
                />
                <View style={{ marginTop: 20 }}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="green"
                        value={email}
                        onChangeText={setEmail}
                        style={{
                            borderBottomColor: colors.primary,
                            borderBottomWidth: 2,
                            width: 250,
                            color: "#fbafe0",
                            backgroundColor: "white",
                            borderRadius: 3
                        }}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="green"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        style={{
                            borderBottomColor: colors.primary,
                            borderBottomWidth: 2,
                            width: 250,
                            marginTop: 20,
                            color: "#fbafe0",
                            backgroundColor: "white",
                            borderRadius: 3
                        }}
                    />
                    <View style={{ marginTop: 20 }}>
                        <Button
                            title={mode === "signUp" ? "Sign Up" : "Sign in"}
                            disabled={!password || !email}
                            color={colors.secondary}
                            onPress={handlePress}
                        />
                    </View>
                    <TouchableOpacity
                        style={{ marginTop: 15, alignItems: "center" }}
                        onPress={() =>
                            mode === "signUp"
                                ? setMode("signIn")
                                : setMode("signUp")
                        }
                    >
                        <Text style={{ color: "white", fontWeight: "400" }}>
                            {mode === "signUp"
                                ? "Already have an account? Sign in"
                                : "Don't have an account? Sign Up"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}
