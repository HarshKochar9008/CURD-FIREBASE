import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import Changes from "./Changes";
import useDisclose from "../hooks/useDisclose";
import { toast } from "react-toastify";



const ContactCard = ({ contact }) => {
    const {isOpen,onClose,onOpen} =useDisclose();  

    const deleteContact = async (id) => {
        try {
            await deleteDoc(doc(db, "contacts", id)) 
            toast.success("Contact Deleted Successfully");
        } catch (error) {
            toast.error("Error Deleting Contact");
        }
    }
  return (
    <>
      <div key={contact.id} className="flex items-center bg-white justify-between p-2 rounded-lg">
        <div className="flex gap-4">
          <HiOutlineUserCircle className="text-blue text-5xl" />
        <div>
          <h2 className="font-semibold">{contact.name}</h2>
          <h1 className="text-m">{contact.email}</h1>
        </div>
      </div>
      <div className="flex text-3xl">
        <RiEditCircleLine onClick={onOpen} className="cursor-pointer"/>
        <IoMdTrash onClick={() => deleteContact(contact.id)} className="text-medblue cursor-pointer" />
      </div>
    </div> 
    <Changes contact={contact} isUpdate={true} isOpen={isOpen} onClose={onClose}/>
    </>
  );                                                                                                                                
};

export default ContactCard;
