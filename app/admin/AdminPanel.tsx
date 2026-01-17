'use client';

import React, { useState, useMemo } from 'react';
import { Spring, SpringImage } from '@/models/types/spring';
import updateSpring from '@/app/actions/updateSpring';
import { Search, FloppyDisk, Plus, Trash, Check, Xmark } from 'iconoir-react';
import './AdminPanel.css';
import { getSpringImage } from '@/utils/springImage';
import Image from 'next/image';

interface AdminPanelProps {
  initialSprings: Spring[];
}

export default function AdminPanel({ initialSprings }: AdminPanelProps) {
  const [springs, setSprings] = useState<Spring[]>(initialSprings);
  const [selectedSpringId, setSelectedSpringId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Spring | null>(null);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filter, setFilter] = useState('');

  // -- Derivations --
  const filteredSprings = useMemo(() => {
    return springs.filter((s) => s.name.includes(filter));
  }, [springs, filter]);

  // -- Handlers --

  const handleSelect = (id: string) => {
    const s = springs.find((item) => item._id === id);
    if (!s) return;

    const deepCopy = JSON.parse(JSON.stringify(s));

    if (!deepCopy.location.coordinates) {
      deepCopy.location.coordinates = { pool: [0, 0], parking: [0, 0] };
    }
    if (!deepCopy.location.coordinates.pool || deepCopy.location.coordinates.pool.length < 2) {
      deepCopy.location.coordinates.pool = [0, 0];
    }
    if (
      !deepCopy.location.coordinates.parking ||
      deepCopy.location.coordinates.parking.length < 2
    ) {
      deepCopy.location.coordinates.parking = [0, 0];
    }

    setSelectedSpringId(id);
    setFormData(deepCopy);
    setStatus('idle');
    setErrorMessage('');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!formData) return;
    const { name, value, type } = e.target;
    const newSpring = JSON.parse(JSON.stringify(formData));

    // Handle nested paths like "location.minutesByFoot"
    if (name.includes('.')) {
      const parts = name.split('.');
      let current = newSpring;
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]];
      }
      const lastKey = parts[parts.length - 1];

      if (type === 'checkbox') {
        current[lastKey] = (e.target as HTMLInputElement).checked;
      } else if (type === 'number') {
        current[lastKey] = parseFloat(value);
      } else {
        current[lastKey] = value;
      }
    } else {
      // Top level fields
      if (type === 'checkbox') {
        // @ts-ignore
        newSpring[name] = (e.target as HTMLInputElement).checked;
      } else if (type === 'number') {
        // @ts-ignore
        newSpring[name] = parseFloat(value);
      } else {
        // @ts-ignore
        newSpring[name] = value;
      }
    }

    setFormData(newSpring);
  };

  const handleImageChange = (index: number, field: keyof SpringImage, val: string) => {
    if (!formData) return;
    const newSpring = JSON.parse(JSON.stringify(formData));
    newSpring.images[index][field] = val;
    setFormData(newSpring);
  };

  const addImage = () => {
    if (!formData) return;
    const newSpring = JSON.parse(JSON.stringify(formData));
    newSpring.images.push({ image: '', credit: '', link: '' });
    setFormData(newSpring);
  };

  const removeImage = (index: number) => {
    if (!formData) return;
    const newSpring = JSON.parse(JSON.stringify(formData));
    newSpring.images.splice(index, 1);
    setFormData(newSpring);
  };

  const handleSave = async () => {
    if (!formData || !selectedSpringId) return;
    setStatus('saving');

    try {
      const res = await updateSpring(selectedSpringId, formData);
      if (res.status === 'success' && res.data) {
        setStatus('success');
        // Update local list
        setSprings((prev) => prev.map((s) => (s._id === res.data!._id ? res.data! : s)));
        setFormData(JSON.parse(JSON.stringify(res.data)));
        setTimeout(() => setStatus('idle'), 2000);
      } else {
        setStatus('error');
        setErrorMessage(res.error?.message || 'Unknown error');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  };

  // -- Render Helpers --

  const renderTextField = (label: string, name: string, val: string | number) => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input type="text" name={name} value={val} onChange={handleChange} className="form-input" />
    </div>
  );

  const renderNumberField = (label: string, name: string, val: number) => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input type="number" name={name} value={val} onChange={handleChange} className="form-input" />
    </div>
  );

  const renderCheckbox = (label: string, name: string, checked: boolean) => (
    <label className="checkbox-group">
      <input type="checkbox" name={name} checked={checked} onChange={handleChange} />
      <span className="text-sm font-medium">{label}</span>
    </label>
  );

  const renderCoordinatePair = (label: string, pathPrefix: string, values: number[]) => {
    const lat = values?.[0] ?? 0;
    const lng = values?.[1] ?? 0;
    return (
      <div className="form-group">
        <label className="form-label">{label}</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <span className="text-xs text-gray-500">Lat</span>
            <input
              type="number"
              name={`${pathPrefix}.0`}
              value={lat}
              onChange={handleChange}
              className="form-input"
              step="any"
            />
          </div>
          <div style={{ flex: 1 }}>
            <span className="text-xs text-gray-500">Lng</span>
            <input
              type="number"
              name={`${pathPrefix}.1`}
              value={lng}
              onChange={handleChange}
              className="form-input"
              step="any"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h1>Springs Admin</h1>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Filter springs..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="search-input"
            />
            <Search
              style={{ position: 'absolute', right: '10px', top: '8px', color: '#999' }}
              width={18}
            />
          </div>
        </div>
        <div className="springs-list">
          {filteredSprings.map((s) => (
            <div
              key={s._id}
              onClick={() => handleSelect(s._id)}
              className={`spring-item ${selectedSpringId === s._id ? 'active' : ''}`}
            >
              {s.name}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        {formData ? (
          <>
            {/* Toolbar */}
            <div className="toolbar">
              <h2>{formData.name}</h2>
              <div className="toolbar-actions">
                {status === 'success' && (
                  <span className="status-message status-success flex items-center gap-1">
                    <Check width={18} /> Saved!
                  </span>
                )}
                {status === 'error' && (
                  <span className="status-message status-error flex items-center gap-1">
                    <Xmark width={18} /> {errorMessage}
                  </span>
                )}
                <button onClick={handleSave} disabled={status === 'saving'} className="save-button">
                  <FloppyDisk width={18} />
                  {status === 'saving' ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>

            {/* Scrollable Form Area */}
            <div className="form-scroll-area">
              <div className="form-container">
                {/* Section 1: Basic Info */}
                <div className="form-section">
                  <h3 className="section-title">Basic Info</h3>
                  <div className="form-grid">
                    {renderTextField('Name', 'name', formData.name)}
                    {renderTextField('Main Region', 'mainRegion', formData.mainRegion)}
                    {renderTextField('Sub Region', 'subRegion', formData.subRegion)}
                    <div className="full-width form-group">
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        className="form-textarea"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Details */}
                <div className="form-section">
                  <h3 className="section-title">Details</h3>
                  <div className="form-grid four-cols" style={{ marginBottom: '20px' }}>
                    {renderCheckbox(
                      'Has Shadow',
                      'springDetails.hasShadow',
                      formData.springDetails.hasShadow
                    )}
                    {renderCheckbox(
                      'Sitting Spots',
                      'springDetails.hasSitingSpots',
                      formData.springDetails.hasSitingSpots
                    )}
                    {renderCheckbox(
                      'Accessible',
                      'springDetails.IsAccessible',
                      formData.springDetails.IsAccessible
                    )}
                    {renderCheckbox(
                      'Shallow',
                      'springDetails.isShallow',
                      formData.springDetails.isShallow
                    )}
                    {renderCheckbox('Deep', 'springDetails.isDeep', formData.springDetails.isDeep)}
                    {renderCheckbox(
                      'Hot Spring',
                      'springDetails.isHotSpring',
                      formData.springDetails.isHotSpring
                    )}
                    {renderCheckbox(
                      'Clear Water',
                      'springDetails.hasClearWater',
                      formData.springDetails.hasClearWater
                    )}
                    {renderCheckbox(
                      'Has View',
                      'springDetails.hasView',
                      formData.springDetails.hasView
                    )}
                  </div>
                  <div className="form-grid four-cols">
                    {renderTextField('Type', 'springDetails.typeOf', formData.springDetails.typeOf)}
                    {renderNumberField(
                      'Depth (m)',
                      'springDetails.howDeep',
                      formData.springDetails.howDeep
                    )}
                    {renderNumberField(
                      'Temp (°C)',
                      'springDetails.temperature',
                      formData.springDetails.temperature
                    )}
                    {renderNumberField('Size', 'springDetails.size', formData.springDetails.size)}
                  </div>
                </div>

                {/* Section 3: Location */}
                <div className="form-section">
                  <h3 className="section-title">Location</h3>
                  <div className="form-grid">
                    {renderTextField('Waze Link', 'location.wazeLink', formData.location.wazeLink)}
                    {renderNumberField(
                      'Minutes Walk',
                      'location.minutesByFoot',
                      formData.location.minutesByFoot
                    )}
                    {renderCoordinatePair(
                      'Pool Coordinates',
                      'location.coordinates.pool',
                      formData.location.coordinates.pool
                    )}
                    {renderCoordinatePair(
                      'Parking Coordinates',
                      'location.coordinates.parking',
                      formData.location.coordinates.parking
                    )}
                    <div className="full-width form-group">
                      <label className="form-label">Directions</label>
                      <textarea
                        name="location.directions"
                        rows={3}
                        value={formData.location.directions}
                        onChange={handleChange}
                        className="form-textarea"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Images */}
                <div className="form-section">
                  <div className="image-list-header">
                    <h3 className="section-title" style={{ border: 'none', margin: 0, padding: 0 }}>
                      Images
                    </h3>
                    <button onClick={addImage} className="add-image-btn">
                      <Plus width={18} /> Add Image
                    </button>
                  </div>
                  {formData.images.length === 0 && (
                    <p className="text-gray-400 text-sm italic">No images.</p>
                  )}

                  <div>
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="image-item">
                        <div className="image-preview">
                          {img.image ? (
                            <Image src={getSpringImage(formData)} alt="" fill width={100} height={100}/>
                          ) : null}
                        </div>
                        <div className="image-fields">
                          <div className="form-group">
                            <input
                              type="text"
                              placeholder="URL"
                              value={img.image}
                              onChange={(e) => handleImageChange(idx, 'image', e.target.value)}
                              className="form-input"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              placeholder="Credit"
                              value={img.credit || ''}
                              onChange={(e) => handleImageChange(idx, 'credit', e.target.value)}
                              className="form-input"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              placeholder="Link"
                              value={img.link || ''}
                              onChange={(e) => handleImageChange(idx, 'link', e.target.value)}
                              className="form-input"
                            />
                          </div>
                        </div>
                        <button onClick={() => removeImage(idx)} className="remove-image-btn">
                          <Trash width={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <p>Select a spring from the list to edit</p>
          </div>
        )}
      </div>
    </div>
  );
}
