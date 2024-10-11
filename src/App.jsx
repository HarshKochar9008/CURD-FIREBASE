// App.js or the main file where you're using BackgroundBeamsWithCollision
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
import BackgroundBeamsWithCollision from "./components/BackgroundBeamsWithCollision";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclose();

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
      {/* Fullscreen background */}
      <div className="relative h-screen w-full overflow-hidden flex justify-center items-center bg-gray-900">
        {/* BackgroundBeamsWithCollision will be full screen */}
        <BackgroundBeamsWithCollision className="absolute inset-0 z-0" />

        {/* Foreground content with phone-like dimensions */}
        <div className="relative z-10 mx-auto h-full max-h-[800px] w-full max-w-[400px] sm:max-w-[370px]rounded-lg bg-blue p-4 shadow-xl overflow-hidden">
          <Navbar />
          <div className="flex gap-2 mt-4">
            <div className="relative flex flex-grow items-center">
              <FiSearch className="absolute ml-1 text-white text-3xl" />
              <input
                onChange={filteredContacts}
                type="text"
                className="flex-grow h-10 rounded-md border border-white bg-transparent text-white pl-9"
              />
            </div>
            <AiFillPlusCircle
              onClick={onOpen}
              className="cursor-pointer text-5xl text-white"
            />
          </div>
          <div className="mt-4 flex flex-col gap-3 overflow-y-auto">
            {contacts.length <= 0 ? (
              <NoContact />
            ) : (
              contacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Changes modal and Toast */}
      <Changes isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
