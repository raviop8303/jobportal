// Profile Photo Management

// Show change profile photo interface
function showChangeProfilePhoto() {
    const container = document.getElementById('dashboard-content');
    const currentPhoto = localStorage.getItem('userPhoto');
    const userName = localStorage.getItem('userName') || 'User';
    
    container.innerHTML = `
        <div class="dashboard-view">
            <h3>📸 Change Profile Photo</h3>
            <button class="btn-secondary" onclick="loadDashboard()" style="margin-bottom:20px">← Back to Dashboard</button>
            
            <!-- Current Photo Display -->
            <div style="text-align:center;padding:30px;background:rgba(139,92,246,0.05);border-radius:12px;margin-bottom:20px">
                <h4 style="margin:0 0 20px 0">Current Profile Photo</h4>
                ${currentPhoto ? 
                    `<img src="${currentPhoto}" alt="Current Photo" style="width:150px;height:150px;border-radius:50%;object-fit:cover;border:4px solid #8b5cf6;box-shadow:0 8px 16px rgba(0,0,0,0.1)">` :
                    `<div style="width:150px;height:150px;border-radius:50%;background:linear-gradient(135deg, #8b5cf6, #6d28d9);display:flex;align-items:center;justify-content:center;font-size:60px;color:white;margin:0 auto;box-shadow:0 8px 16px rgba(0,0,0,0.1)">👤</div>`
                }
                <p style="margin:15px 0 0 0;color:var(--muted);font-size:14px">${userName}</p>
            </div>
            
            <!-- Upload New Photo -->
            <div style="padding:25px;background:white;border-radius:12px;border:2px dashed #8b5cf6;margin-bottom:20px">
                <h4 style="margin:0 0 15px 0;color:#8b5cf6">📤 Upload New Photo</h4>
                <p style="color:var(--muted);font-size:14px;margin:0 0 20px 0">Choose a photo from your device (JPG, PNG, GIF - Max 5MB)</p>
                
                <form onsubmit="event.preventDefault(); uploadNewProfilePhoto()">
                    <div class="form-group">
                        <input type="file" id="new-profile-photo" accept="image/*" required 
                            style="padding:12px;border:2px solid #e5e7eb;border-radius:8px;width:100%;cursor:pointer;background:white"
                            onchange="previewNewPhoto(this)">
                    </div>
                    
                    <!-- Photo Preview -->
                    <div id="new-photo-preview" style="display:none;text-align:center;margin:20px 0;padding:20px;background:#f9fafb;border-radius:8px">
                        <p style="margin:0 0 15px 0;font-weight:600;color:#8b5cf6">Preview:</p>
                        <img id="preview-new-img" style="width:120px;height:120px;border-radius:50%;object-fit:cover;border:3px solid #8b5cf6">
                    </div>
                    
                    <div class="form-group" style="display:flex;gap:10px;margin-top:20px">
                        <button type="submit" class="btn-primary" style="flex:1;background:#8b5cf6">✓ Upload Photo</button>
                        <button type="button" class="btn-secondary" onclick="loadDashboard()" style="flex:1">Cancel</button>
                    </div>
                </form>
            </div>
            
            <!-- Remove Photo Option -->
            ${currentPhoto ? `
                <div style="padding:20px;background:rgba(239,68,68,0.05);border-radius:12px;border-left:4px solid #ef4444">
                    <h5 style="margin:0 0 10px 0;color:#ef4444">🗑️ Remove Profile Photo</h5>
                    <p style="color:var(--muted);font-size:14px;margin:0 0 15px 0">This will remove your current profile photo and show default avatar.</p>
                    <button class="btn-secondary" onclick="removeProfilePhoto()" style="background:#ef4444;color:white">Remove Photo</button>
                </div>
            ` : ''}
            
            <!-- Tips -->
            <div style="padding:20px;background:rgba(59,130,246,0.05);border-radius:12px;margin-top:20px">
                <h5 style="margin:0 0 10px 0;color:#3b82f6">💡 Photo Tips</h5>
                <ul style="margin:8px 0;padding-left:20px;color:var(--muted);font-size:14px;line-height:1.8">
                    <li>Use a clear, recent photo of yourself</li>
                    <li>Face should be clearly visible</li>
                    <li>Good lighting is important</li>
                    <li>Professional or casual both work</li>
                    <li>Square photos work best</li>
                </ul>
            </div>
        </div>
    `;
}

// Preview new photo before upload
function previewNewPhoto(input) {
    const file = input.files[0];
    if (!file) return;
    
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        alert('❌ File size too large! Please choose a photo under 5MB.');
        input.value = '';
        return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
        alert('❌ Please select an image file (JPG, PNG, GIF)');
        input.value = '';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('new-photo-preview');
        const img = document.getElementById('preview-new-img');
        img.src = e.target.result;
        preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

// Upload new profile photo
async function uploadNewProfilePhoto() {
    const fileInput = document.getElementById('new-profile-photo');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('❌ Please select a photo first');
        return;
    }
    
    // Show loading
    if (typeof showToast === 'function') {
        showToast('Uploading photo...', {type: 'info'});
    }
    
    const reader = new FileReader();
    reader.onload = async function(e) {
        const userId = localStorage.getItem('userId') || localStorage.getItem('userEmail');
        
        // Save to IndexedDB for persistence
        if (window.persistentStorage && userId) {
            try {
                await window.persistentStorage.saveProfilePhoto(userId, {
                    data: e.target.result,
                    fileName: file.name,
                    fileType: file.type,
                    fileSize: file.size
                });
                console.log('✅ Photo saved to IndexedDB');
            } catch (error) {
                console.log('IndexedDB save failed, using localStorage:', error);
                // Fallback to localStorage
                localStorage.setItem('userPhoto', e.target.result);
                localStorage.setItem('userPhotoName', file.name);
                localStorage.setItem('userPhotoSize', file.size);
                localStorage.setItem('userPhotoType', file.type);
                localStorage.setItem('userPhotoUploadDate', new Date().toISOString());
            }
        } else {
            // Fallback to localStorage
            localStorage.setItem('userPhoto', e.target.result);
            localStorage.setItem('userPhotoName', file.name);
            localStorage.setItem('userPhotoSize', file.size);
            localStorage.setItem('userPhotoType', file.type);
            localStorage.setItem('userPhotoUploadDate', new Date().toISOString());
        }
        
        // Show success message
        if (typeof showToast === 'function') {
            showToast('✅ Profile photo updated successfully!', {type: 'success'});
        } else {
            alert('✅ Profile photo updated successfully!');
        }
        
        // Reload dashboard to show new photo
        setTimeout(() => {
            loadDashboard();
            
            // Update header photo if exists
            updateHeaderPhoto();
        }, 500);
    };
    
    reader.onerror = function() {
        alert('❌ Error uploading photo. Please try again.');
    };
    
    reader.readAsDataURL(file);
}

// Remove profile photo
async function removeProfilePhoto() {
    if (!confirm('Are you sure you want to remove your profile photo?')) {
        return;
    }
    
    const userId = localStorage.getItem('userId') || localStorage.getItem('userEmail');
    
    // Remove from IndexedDB
    if (window.persistentStorage && userId) {
        try {
            await window.persistentStorage.deleteProfilePhoto(userId);
            console.log('✅ Photo removed from IndexedDB');
        } catch (error) {
            console.log('IndexedDB delete failed:', error);
        }
    }
    
    // Remove photo from localStorage
    localStorage.removeItem('userPhoto');
    localStorage.removeItem('userPhotoName');
    localStorage.removeItem('userPhotoSize');
    localStorage.removeItem('userPhotoType');
    localStorage.removeItem('userPhotoUploadDate');
    
    // Show success message
    if (typeof showToast === 'function') {
        showToast('Profile photo removed', {type: 'success'});
    } else {
        alert('✅ Profile photo removed');
    }
    
    // Reload dashboard
    setTimeout(() => {
        loadDashboard();
        
        // Update header photo
        updateHeaderPhoto();
    }, 500);
}

// Update header photo
function updateHeaderPhoto() {
    const profileBtn = document.getElementById('nav-logout');
    if (!profileBtn) return;
    
    const userName = localStorage.getItem('userName');
    const userPhoto = localStorage.getItem('userPhoto');
    
    if (userPhoto) {
        profileBtn.innerHTML = `<img src="${userPhoto}" alt="Profile" style="width:32px;height:32px;border-radius:50%;object-fit:cover;border:2px solid white">`;
        profileBtn.title = `${userName} - Click for profile menu`;
    } else if (userName) {
        profileBtn.textContent = userName.charAt(0).toUpperCase();
        profileBtn.title = `${userName} - Click for profile menu`;
    }
}
