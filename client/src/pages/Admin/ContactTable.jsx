import { useEffect, useState } from "react";

export default function ContactTable() {
  const [contacts, setContacts] = useState([]);

  const [loading, setLoading] = useState(true);

  async function fetchContacts() {
    try {
      const response = await fetch("http://localhost:3000/api/contacts");

      const data = await response.json();

      setContacts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteContact(id) {
    const confirmDelete = confirm("Delete this contact?");

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:3000/api/contacts/${id}`, {
        method: "DELETE",
      });

      fetchContacts();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {contacts.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">
                No contacts found
              </td>
            </tr>
          )}
          {contacts.map((contact, index) => (
            <tr key={contact.id}>
              <td>{index + 1}</td>

              <td>{contact.name}</td>

              <td>
                <div className="badge badge-outline">{contact.email}</div>
              </td>

              <td className="max-w-xs">{contact.message}</td>

              <td>{new Date(contact.created_at).toLocaleDateString()}</td>

              <td>
                <button
                  onClick={() => deleteContact(contact.id)}
                  className="
          btn btn-sm btn-error
          text-white
        "
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
