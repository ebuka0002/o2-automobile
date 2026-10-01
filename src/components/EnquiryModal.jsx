import Modal from "./Modal";
import EnquiryForm from "./EnquiryForm";
import { useStore } from "../context/StoreContext";

/** Global modal driven by the store: openEnquiry(vehicle) / openViewing(vehicle). */
export default function EnquiryModal() {
  const { modal, closeModal } = useStore();
  const title = modal?.mode === "viewing" ? "Book a Viewing" : "Vehicle Enquiry";
  return (
    <Modal open={!!modal} onClose={closeModal} title={title}>
      {modal && <EnquiryForm mode={modal.mode} vehicle={modal.vehicle} idPrefix="modal" onDone={closeModal} />}
    </Modal>
  );
}
