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
  const fileInputRef = useRef(null);

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

      setName('');
      setProdPrice('');
      setImageFile(null);
      setImagePreview(null);
      setImageBase64('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      showAlert('success', 'Product added successfully!');
      await loadProducts();
    } catch (error) {
      showAlert('danger', 'Error adding product: ' + error.message);
    } finally {
      setUploading(false);
    }
  }

  async function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const newPrice = prompt('Enter new price:', product.price);
    if (newPrice) {
      try {
        const { error } = await supabase
          .from('products')
          .update({ price: parseInt(newPrice) })
          .eq('id', id);

        if (error) throw error;
        showAlert('success', 'Product updated!');
        await loadProducts();
      } catch (error) {
        showAlert('danger', 'Error editing product: ' + error.message);
      }
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

  return (
    <div>
      <h3>Manage Products</h3>
      {alert && <Alert type={alert.type} message={alert.message} />}

      <div className="card">
        <h4>Add Product</h4>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="product-name">Product Name</label>
            <input type="text" id="product-name" placeholder="e.g., 5kg Gas Cylinder" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="product-price">Price (\u20A6)</label>
            <input type="number" id="product-price" placeholder="e.g., 25500" min="0" value={prodPrice} onChange={e => setProdPrice(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="product-image">Product Image</label>
            <input
              type="file"
              id="product-image"
              accept="image/*"
              onChange={handleFileSelect}
              ref={fileInputRef}
            />
            {imagePreview && (
              <div style={{ marginTop: '10px', padding: '10px', background: '#f0f8ff', borderRadius: '8px', textAlign: 'center' }}>
                <img src={imagePreview} alt="Preview" style={{ maxHeight: '120px', maxWidth: '100%', objectFit: 'contain' }} />
                <p style={{ fontSize: '0.8rem', color: 'var(--gray)', marginTop: '5px' }}>{imageFile?.name}</p>
              </div>
            )}
          </div>
        </div>
        <button className="btn-primary" onClick={addProduct} disabled={uploading}>
          {uploading ? 'Saving...' : 'Add Product'}
        </button>
      </div>

      <div className="product-grid">
        {products.length === 0 ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--gray)', padding: '30px' }}>No products added yet</p>
        ) : (
          products.map(p => (
            <div key={p.id} className="product-item">
              <div className="product-image-box">
                {failedImages.has(p.id) ? (
                  <span style={{ color: 'var(--gray)', fontSize: '2rem' }}>?</span>
                ) : (
                  <img src={p.image_url} alt={p.name} onError={() => handleImageError(p.id)} />
                )}
              </div>
              <div className="product-name">{p.name}</div>
              <div className="product-price">\u20A6{parseInt(p.price).toLocaleString()}</div>
              <div className="product-actions">
                <button className="btn-secondary" onClick={() => editProduct(p.id)} style={{ flex: 1 }}>Edit</button>
                <button className="btn-danger" onClick={() => handleDeleteClick(p.id)} style={{ flex: 1 }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

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
