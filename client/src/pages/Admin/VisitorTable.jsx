import { useEffect, useState } from "react";

export default function VisitorTable() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchVisitors() {
    try {
      const response = await fetch("http://localhost:3000/api/visitors");

      const data = await response.json();

      setVisitors(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteVisitor(id) {
    const confirmDelete = confirm("Delete this visitor?");

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:3000/api/visitors/${id}`, {
        method: "DELETE",
      });

      fetchVisitors();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchVisitors();
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
            <th>Joined At</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {visitors.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">
                No visitors found
              </td>
            </tr>
          )}

          {visitors.map((visitor, index) => (
            <tr key={visitor.id}>
              <th>{index + 1}</th>

              <td>{visitor.name}</td>

              <td>
                <div className="badge badge-dash">{visitor.email}</div>
              </td>

              <td>{new Date(visitor.created_at).toLocaleDateString()}</td>

              <td>
                <button
                  onClick={() => deleteVisitor(visitor.id)}
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
