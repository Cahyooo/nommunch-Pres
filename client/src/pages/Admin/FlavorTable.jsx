import { useEffect, useState } from "react";

export default function FlavorTable() {
  const [flavors, setFlavors] = useState([]);

  const [editingFlavor, setEditingFlavor] = useState(null);

  const [name, setName] = useState("");

  async function fetchFlavors() {
    const response = await fetch("http://localhost:3000/api/flavors");

    const data = await response.json();

    setFlavors(data);
  }

  useEffect(() => {
    fetchFlavors();
  }, []);

  function openCreateModal() {
    setEditingFlavor(null);

    setName("");

    document.getElementById("flavor_modal").showModal();
  }

  function openEditModal(flavor) {
    setEditingFlavor(flavor);

    setName(flavor.name);

    document.getElementById("flavor_modal").showModal();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const isEdit = editingFlavor;

    const url = isEdit
      ? `http://localhost:3000/api/flavors/${editingFlavor.id}`
      : "http://localhost:3000/api/flavors";

    const method = isEdit ? "PUT" : "POST";

    await fetch(url, {
      method,

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
      }),
    });

    fetchFlavors();

    document.getElementById("flavor_modal").close();
  }

  async function deleteFlavor(id) {
    const confirmDelete = confirm("Delete this flavor?");

    if (!confirmDelete) return;

    await fetch(`http://localhost:3000/api/flavors/${id}`, {
      method: "DELETE",
    });

    fetchFlavors();
  }

  return (
    <>
      <div className="flex justify-center mb-5">
        <button
          onClick={openCreateModal}
          className="
                    btn btn-primary mb-5
                "
        >
          Add Flavor
        </button>
      </div>

      <div
        className="
                overflow-x-auto
            "
      >
        <table
          className="
                    table table-zebra table-fixed w-full
                "
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {flavors.map((flavor, index) => (
              <tr key={flavor.id}>
                <td>{index + 1}</td>

                <td>{flavor.name}</td>

                <td
                  
                >
                    <div className="
                                    flex gap-2
                                ">
                  <button
                    onClick={() => openEditModal(flavor)}
                    className="
                                            btn btn-warning
                                            btn-sm
                                        "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteFlavor(flavor.id)}
                    className="
                                            btn btn-error
                                            btn-sm text-white
                                        "
                  >
                    Delete
                  </button>

                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="flavor_modal" className="modal">
        <div
          className="
                    modal-box
                "
        >
          <h3
            className="
                        font-bold text-lg mb-5
                    "
          >
            {editingFlavor ? "Edit Flavor" : "Add Flavor"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Flavor Name"
              className="
                                input input-bordered
                                w-full
                            "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button
              className="
      btn btn-sm btn-circle
      btn-ghost
      absolute right-2 top-2
    "
            >
              ✕
            </button>

            <button
              className="
                            btn btn-primary w-full
                        "
            >
              Save
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
