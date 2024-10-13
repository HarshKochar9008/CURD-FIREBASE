import { Formik, Field, Form, ErrorMessage } from "formik";
import Modal from "./Modal";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const Changes = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact added successfully");
    } catch (error) {
      toast.error("Error adding contact");
    }
  };
  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Updated successfully");
    } catch (error) {
      toast.error("Error Updating contact");
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={ContactSchema}
          initialValues={
            isUpdate
              ? { name: contact.name, email: contact.email }
              : { name: "", email: "" }
          }
          onSubmit={(values) => {
            isUpdate ? updateContact(values, contact.id) : addContact(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col px-2 gap-1">
              <label htmlFor="name">Name</label>
              {/* Remove the border class from here */}
              <Field
                name="name"
                className="h-10 px-2 rounded-md outline-none focus:ring-2 focus:ring-orange-500"
              />
              <div className="text-red-500 text-s">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col px-2 gap-1">
              <label htmlFor="email">Email</label>
              {/* Remove the border class from here */}
              <Field
                type="email"
                name="email"
                className="h-10 px-2 rounded-md outline-none focus:ring-2 focus:ring-orange-500"
              />
              <div className="text-red-500 text-s">
                <ErrorMessage name="email" />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue text-white h-14 rounded-md"
            >
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default Changes;
