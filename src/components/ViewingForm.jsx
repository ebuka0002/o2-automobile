import EnquiryForm from "./EnquiryForm";
export default function ViewingForm({ vehicle }) {
  return <EnquiryForm mode="viewing" vehicle={vehicle} idPrefix="viewing" />;
}
