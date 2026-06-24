import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../supabase';
import ConfirmModal from '../components/ConfirmModal';
import Alert from '../components/Alert';

function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const [uploading, setUploading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [failedImages, setFailedImages] = useState(new Set());
  const [editingProduct, setEditingProduct] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [editImageBase64, setEditImageBase64] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 4000);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      showAlert('danger', 'Error loading products: ' + error.message);
    }
  }

  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showAlert('warning', 'Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showAlert('warning', 'Image must be under 5MB');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onload = () => setImageBase64(reader.result);
    reader.readAsDataURL(file);
  }

  function handleEditFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showAlert('warning', 'Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showAlert('warning', 'Image must be under 5MB');
      return;
    }

    setEditImageFile(file);
    setEditImagePreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onload = () => setEditImageBase64(reader.result);
    reader.readAsDataURL(file);
  }

  function clearForm() {
    setName('');
    setProdPrice('');
    setImageFile(null);
    setImagePreview(null);
    setImageBase64('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function addProduct() {
    if (!name || !prodPrice || !imageBase64) {
      showAlert('warning', 'Please fill in all fields and select an image');
      return;
    }

    setUploading(true);

    try {
      const { error } = await supabase
        .from('products')
        .insert([{ name, price: parseInt(prodPrice), image_url: imageBase64 }]);

      if (error) throw error;

      clearForm();
      showAlert('success', 'Product added successfully!');
      await loadProducts();
    } catch (error) {
      showAlert('danger', 'Error adding product: ' + error.message);
    } finally {
      setUploading(false);
    }
  }

  function openEdit(product) {
    setEditingProduct(product.id);
    setEditPrice(String(product.price));
    setEditImageFile(null);
    setEditImagePreview(null);
    setEditImageBase64('');
    if (editFileInputRef.current) editFileInputRef.current.value = '';
  }

  async function saveEdit() {
    if (!editingProduct || !editPrice) return;

    try {
      const updateData = { price: parseInt(editPrice) };
      if (editImageBase64) {
        updateData.image_url = editImageBase64;
      }

      const { error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', editingProduct);

      if (error) throw error;
      showAlert('success', 'Product updated!');
      setEditingProduct(null);
      setEditPrice('');
      setEditImageFile(null);
      setEditImagePreview(null);
      setEditImageBase64('');
      await loadProducts();
    } catch (error) {
      showAlert('danger', 'Error updating product: ' + error.message);
    }
  }

  function handleDeleteClick(id) {
    setConfirmDelete(id);
  }

  async function confirmDeleteProduct() {
    if (!confirmDelete) return;
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', confirmDelete);

      if (error) throw error;
      showAlert('success', 'Product deleted!');
      setConfirmDelete(null);
      await loadProducts();
    } catch (error) {
      showAlert('danger', 'Error deleting product: ' + error.message);
      setConfirmDelete(null);
    }
  }

  const handleImageError = (id) => {
    setFailedImages(prev => new Set([...prev, id]));
  };

  const currentEditProduct = products.find(p => p.id === editingProduct);

  return (
    <div className="products-page">
      <h3>Manage Products</h3>
      {alert && <Alert type={alert.type} message={alert.message} />}

      <div className="card add-product-card">
        <div className="add-product-header">
          <h4>Add New Product</h4>
          <span className="add-product-count">{products.length} product{products.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="add-product-body">
          <div className="add-product-fields">
            <div className="form-group">
              <label htmlFor="product-name">Product Name</label>
              <input type="text" id="product-name" placeholder="e.g., 5kg Gas Cylinder" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="product-price">Price (₦)</label>
              <input type="number" id="product-price" placeholder="e.g., 25500" min="0" value={prodPrice} onChange={e => setProdPrice(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="product-image">Product Image</label>
              <input type="file" id="product-image" accept="image/*" onChange={handleFileSelect} ref={fileInputRef} />
            </div>
          </div>
          {imagePreview && (
            <div className="add-product-preview">
              <img src={imagePreview} alt="Preview" />
              <span className="add-product-preview-name">{imageFile?.name}</span>
            </div>
          )}
        </div>
        <div className="add-product-footer">
          <button className="btn-primary" onClick={addProduct} disabled={uploading}>
            {uploading ? 'Saving...' : 'Add Product'}
          </button>
          {imagePreview && <button className="btn-secondary" onClick={clearForm}>Clear</button>}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="products-empty">
          <span className="products-empty-icon">📦</span>
          <p>No products added yet</p>
          <span className="products-empty-sub">Use the form above to add your first product</span>
        </div>
      ) : (
        <>
          <div className="products-view-toggle">
            <button className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>Grid View</button>
            <button className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}>Table View</button>
          </div>

          {viewMode === 'grid' ? (
            <div className="product-grid">
              {products.map(p => (
                <div key={p.id} className="product-item">
                  <div className="product-image-box">
                    {failedImages.has(p.id) ? (
                      <div className="product-image-failed">
                        <span>📷</span>
                        <span>Image failed to load</span>
                      </div>
                    ) : (
                      <img src={p.image_url} alt={p.name} onError={() => handleImageError(p.id)} />
                    )}
                  </div>
                  <div className="product-item-body">
                    <div className="product-name">{p.name}</div>
                    <div className="product-price">₦{parseInt(p.price).toLocaleString()}</div>
                  </div>
                  <div className="product-actions">
                    <button className="btn-secondary" onClick={() => openEdit(p)}>Edit</button>
                    <button className="btn-danger" onClick={() => handleDeleteClick(p.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Added</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td className="td-product-img">
                        {failedImages.has(p.id) ? (
                          <span className="product-table-img-failed">📷</span>
                        ) : (
                          <img src={p.image_url} alt={p.name} onError={() => handleImageError(p.id)} />
                        )}
                      </td>
                      <td className="td-product-name">{p.name}</td>
                      <td className="td-amount">₦{parseInt(p.price).toLocaleString()}</td>
                      <td className="td-date">{p.created_at ? new Date(p.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</td>
                      <td className="td-actions">
                        <button className="btn-secondary" onClick={() => openEdit(p)}>Edit</button>
                        <button className="btn-danger" onClick={() => handleDeleteClick(p.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {editingProduct && currentEditProduct && (
        <div className="modal-overlay" onClick={() => setEditingProduct(null)}>
          <div className="modal-card edit-product-modal" onClick={e => e.stopPropagation()}>
            <h3>Edit Product</h3>
            <p className="modal-product-name">{currentEditProduct.name}</p>
            <div className="edit-product-current-img">
              {failedImages.has(currentEditProduct.id) ? (
                <span>📷</span>
              ) : (
                <img src={editImagePreview || currentEditProduct.image_url} alt={currentEditProduct.name} />
              )}
            </div>
            <div className="edit-product-fields">
              <div className="form-group">
                <label htmlFor="edit-price">Price (₦)</label>
                <input type="number" id="edit-price" placeholder="Enter new price" min="0" value={editPrice} onChange={e => setEditPrice(e.target.value)} autoFocus />
              </div>
              <div className="form-group">
                <label htmlFor="edit-image">Change Image (optional)</label>
                <input type="file" id="edit-image" accept="image/*" onChange={handleEditFileSelect} ref={editFileInputRef} />
                {editImagePreview && (
                  <div className="edit-image-preview-new">
                    <span>New image selected</span>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setEditingProduct(null)}>Cancel</button>
              <button className="btn-primary" onClick={saveEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <ConfirmModal
          title="Delete Product"
          message="Are you sure you want to delete this product?"
          confirmLabel="Delete"
          confirmType="danger"
          onConfirm={confirmDeleteProduct}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}

export default Products;
