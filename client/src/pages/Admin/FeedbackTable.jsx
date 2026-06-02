import { useEffect, useState } from "react";

export default function FeedbackTable() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchFeedbacks() {
    try {
      const response = await fetch("http://localhost:3000/api/feedbacks");

      const data = await response.json();

      setFeedbacks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteFeedback(id) {
    const confirmDelete = confirm("Delete this feedback?");

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:3000/api/feedbacks/${id}`, {
        method: "DELETE",
      });

      fetchFeedbacks();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchFeedbacks();
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
            <th>Product</th>
            <th>Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {feedbacks.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center">
                No feedback found
              </td>
            </tr>
          )}

          {feedbacks.map((feedback, index) => (
            <tr key={feedback.id}>
              <th>{index + 1}</th>

              <td>{feedback.name}</td>

              <td>
                <div className="badge badge-dash">{feedback.email}</div>
              </td>

              <td>
                <div className="badge badge-outline">
                  {feedback.product_name}
                </div>
              </td>

              <td className="max-w-xs truncate">{feedback.message}</td>

              <td>{new Date(feedback.created_at).toLocaleDateString()}</td>

              <td>
                <button
                  onClick={() => deleteFeedback(feedback.id)}
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
