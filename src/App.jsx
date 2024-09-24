import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import Changes from "./components/Changes";
import useDisclose from "./hooks/useDisclose";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoContact from "./components/NoContact";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const {isOpen,onOpen,onClose} = useDisclose();
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactsList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactsList);
        });
      } catch (error) {
        console.error(error);
      }
    };

    getContacts();
  }, []);
  const filteredContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);

      return filteredContacts;
    });
  };

  return (
    <>
    <div className="mx-auto max-w-[370px]">
      <Navbar />
      <div className="flex gap-2">
        <div className="relative flex flex-grow items-center">
          <FiSearch className="absolute ml-1 text-white text-3xl" />
          <input
            onChange={filteredContacts}
            type="text"
            className="flex-grow h-10 rounded-md border border-white bg-transparent text-white pl-9"
          />
        </div>
        <AiFillPlusCircle onClick={onOpen} className="cursor-pointer text-5xl text-white" />
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {contacts.length <= 0 ? (
          <NoContact />
        ) : (
          contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact}/>
          ))
        )}
      </div>
    </div>
    <Changes isOpen={isOpen} onClose={onClose}/>
    <ToastContainer position="bottom-center" />
    </> 

  );
};

export default App;