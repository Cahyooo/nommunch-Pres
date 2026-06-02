import { useEffect, useState } from "react";

export default function ProductTable() {
  const [products, setProducts] = useState([]);

  const [flavors, setFlavors] = useState([]);

  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState({
    flavor_id: "",
    name: "",
    price: "",
    description: "",
    image_url: "",
  });

  const [image, setImage] = useState(null);

  async function fetchProducts() {
    const response = await fetch("http://localhost:3000/api/products");

    const data = await response.json();

    setProducts(data);
  }

  async function fetchFlavors() {
    const response = await fetch("http://localhost:3000/api/flavors");

    const data = await response.json();

    setFlavors(data);
  }

  function openCreateModal() {
    setEditingProduct(null);

    setForm({
      flavor_id: "",
      name: "",
      price: "",
      description: "",
      image_url: "",
    });

    document.getElementById("product_modal").showModal();
  }

  function openEditModal(product) {
    setEditingProduct(product);

    setForm({
      flavor_id: product.flavor_id,
      name: product.name,
      price: product.price,
      description: product.description,
      image_url: product.image_url,
    });

    document.getElementById("product_modal").showModal();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("flavor_id", form.flavor_id);

    formData.append("name", form.name);

    formData.append("price", form.price);

    formData.append("description", form.description);

    if (image) {
      formData.append("image", image);
    }

    const isEdit = editingProduct;

    const url = isEdit
      ? `http://localhost:3000/api/products/${editingProduct.id}`
      : "http://localhost:3000/api/products";

    const method = isEdit ? "PUT" : "POST";

    await fetch(url, {
      method,
      body: formData,
    });

    fetchProducts();

    document.getElementById("product_modal").close();
  }

  async function deleteProduct(id) {
    const confirmDelete = confirm("Delete this product?");

    if (!confirmDelete) return;

    await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  }

  useEffect(() => {
    fetchProducts();
    fetchFlavors();
  }, []);

  return (
    <>
      <div className="flex justify-center mb-5">
        <button onClick={openCreateModal} className="btn btn-primary">
          Add Product
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Flavor</th>
              <th>Price</th>
              <th>Description</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center">
                  No products found
                </td>
              </tr>
            )}

            {products.map((product) => (
              <tr key={product.id}>
                {/* IMAGE */}
                <td>
                  <div className="avatar">
                    <div
                      className="
                      mask mask-squircle
                      h-14 w-14
                    "
                    >
                      <img src={product.image_url} alt={product.name} />
                    </div>
                  </div>
                </td>

                {/* NAME */}
                <td>
                  <div className="font-bold">{product.name}</div>
                </td>

                {/* FLAVOR */}
                <td>
                  <div
                    className="
                    badge badge-outline
                  "
                  >
                    {product.flavor}
                  </div>
                </td>

                {/* PRICE */}
                <td>Rp {Number(product.price).toLocaleString("id-ID")}</td>

                {/* DESCRIPTION */}
                <td
                  className="
                  max-w-xs truncate
                "
                >
                  {product.description}
                </td>

                {/* ACTION */}
                <td>
                  <div
                    className="
                    flex justify-center gap-2
                  "
                  >
                    <button
                      onClick={() => openEditModal(product)}
                      className="
                        btn btn-warning btn-sm
                      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="
                        btn btn-error btn-sm
                        text-white
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

      {/* MODAL */}
      <dialog id="product_modal" className="modal">
        <div className="modal-box">
          <h3
            className="
            font-bold text-lg mb-5
          "
          >
            {editingProduct ? "Edit Product" : "Add Product"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <button
              className="
      btn btn-sm btn-circle
      btn-ghost
      absolute right-2 top-2
    "
            >
              ✕
            </button>

            {/* PRODUCT NAME */}
            <input
              type="text"
              placeholder="Product Name"
              className="
                input input-bordered
                w-full
              "
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            {/* FLAVOR */}
            <select
              className="
                select select-bordered
                w-full
              "
              value={form.flavor_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  flavor_id: e.target.value,
                })
              }
            >
              <option value="">Select Flavor</option>

              {flavors.map((flavor) => (
                <option key={flavor.id} value={flavor.id}>
                  {flavor.name}
                </option>
              ))}
            </select>

            {/* PRICE */}
            <input
              type="number"
              placeholder="Price"
              className="
                input input-bordered
                w-full
              "
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
            />

            {/* DESCRIPTION */}
            <textarea
              placeholder="Description"
              className="
                textarea textarea-bordered
                w-full
              "
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />

            {/* IMAGE URL */}
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setImage(e.target.files[0])}
            />

            {/* SAVE BUTTON */}
            <button
              className="
                btn btn-primary
                w-full
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
