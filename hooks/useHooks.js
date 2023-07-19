import { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { db } from "../firebase";

export default function useContacts() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const q = query(
      collection(db, "users")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setContacts(
        snapshot.docs.map((doc)=> ({
          displayName: doc.data().displayName,
          email : doc.data().email,
          photoURL: doc.data().photoURL,
          uid: doc.data().uid
        }))
      )
    });
    return () => unsubscribe();
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Contacts.requestPermissionsAsync();
  //     if (status === "granted") {
  //       const { data } = await Contacts.getContactsAsync({
  //         fields: [Contacts.Fields.Emails],
  //       });
  //       if (data.length > 0) {
  //         // console.log("--------------------", data);
  //         setContacts(
  //           data
  //             .filter(
  //               (c) =>
  //                 c.firstName && c.emails && c.emails[0] && c.emails[0].email
  //             )
  //             .map(mapContactToUser)
  //         );
  //       }
  //     }
  //   })();
  // }, []);
  return contacts
}
function mapContactToUser(contact) {
  return {
    contactName:
      contact.firstName && contact.lastName
        ? `${contact.firstName} ${contact.lastName}`
        : contact.firstName,
    email: contact.emails[0].email,
  };
}
