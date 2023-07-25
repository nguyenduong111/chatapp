import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, ImageBackground } from "react-native";
import ListItem from "../components/ListItem";
import GlobalContext from "../context/Context";
import { db } from "../firebase";
import useContacts from "../hooks/useHooks";

export default function Contacts() {
    const contacts = useContacts();
    const route = useRoute();
    const image = route.params && route.params.image;
    return (
        <ImageBackground
            resizeMode="cover"
            source={require("../assets/bg_select.jpg")}
            style={{ flex: 1 }}
        >
            <FlatList
                style={{ flex: 1, padding: 10 }}
                data={contacts}
                keyExtractor={(_, i) => i}
                renderItem={({ item }) => (
                    <ContactPreview contact={item} image={image} />
                )}
            />
        </ImageBackground>
    );
}

function ContactPreview({ contact, image }) {
    const { unfilteredRooms, rooms } = useContext(GlobalContext);
    const [user, setUser] = useState(contact);

    useEffect(() => {
        const q = query(
            collection(db, "users"),
            where("email", "==", contact.email)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (snapshot.docs.length) {
                const userDoc = snapshot.docs[0].data();
                setUser((prevUser) => ({ ...prevUser, userDoc }));
            }
        });
        return () => unsubscribe();
    }, []);
    return (
        <ListItem
            style={{
                marginTop: 7,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                height: 50,
                borderRadius: 4,
                // color: "red"
            }}
            type="contacts"
            user={user}
            image={image}
            room={unfilteredRooms.find((room) =>
                room.participantsArray.includes(contact.email)
            )}
        />
    );
}
