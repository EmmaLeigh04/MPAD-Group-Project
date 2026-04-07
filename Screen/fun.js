document.addEventListener('DOMContentLoaded', () => {
  const appMap = {
    notepad: 'apps/notepad/index.html',
    mail: 'apps/mail/index.html',
    documents: 'apps/documents/index.html',
    browser: 'apps/browser/index.html',
    encrypted: 'apps/documents/encrypted.html',
    secret: '../secret/secret.html'
  };
  const windows = document.getElementById('windows');
  let topZ = 100;

  function toggleApp(name, title) {
    // Check if app window is already open
    const win = windows.querySelector(`.win-frame[data-app="${name}"]`);
    if (win) {
      win.remove();
      return;
    }
    const src = appMap[name];
    if (!src) {
      alert('App not found: ' + name + '\n\nOpen apps available: ' + Object.keys(appMap).join(', '));
      console.error('No app mapping for', name, 'appMap keys=', Object.keys(appMap));
      return;
    }
    openAppIframe(src, title || (name[0].toUpperCase() + name.slice(1)), name);
  }

  function openAppIframe(src, title, appName) {
    try {
      const template = document.getElementById('template-window');
      if (!template) throw new Error('template-window not found');
      const node = template.content.cloneNode(true);
      const win = node.querySelector('.win-frame');
      if (!win) throw new Error('.win-frame not found in template');
      // Set Notepad or IE title, color, and icon
      const titlebar = win.querySelector('.titlebar');
      const notepadIcon = win.querySelector('.np2-titlebar-icon.notepad-icon');
      const ieIcon = win.querySelector('.np2-titlebar-icon.ie-icon');
      // Add support for documents icon
      let documentsIcon = win.querySelector('.np2-titlebar-icon.documents-icon');
      if (!documentsIcon) {
        documentsIcon = document.createElement('img');
        documentsIcon.src = '../icons/windowsIcons/documents.png';
        documentsIcon.alt = 'Documents icon';
        documentsIcon.className = 'np2-titlebar-icon documents-icon';
        documentsIcon.style.height = '20px';
        documentsIcon.style.width = '20px';
        documentsIcon.style.marginRight = '8px';
        documentsIcon.style.display = 'none';
        if (titlebar) titlebar.insertBefore(documentsIcon, titlebar.querySelector('.title'));
      }
      if (appName === 'notepad') {
        win.querySelector('.title').textContent = 'Untitled - Notepad';
        if (titlebar) {
          titlebar.style.background = '#1976d2';
          win.querySelector('.title').style.color = '#fff';
        }
        if (notepadIcon) notepadIcon.style.display = 'inline-block';
        if (ieIcon) ieIcon.style.display = 'none';
        if (documentsIcon) documentsIcon.style.display = 'none';
      } else if (appName === 'browser') {
        win.querySelector('.title').textContent = 'Internet Explorer';
        if (titlebar) {
          titlebar.style.background = '#1976d2';
          win.querySelector('.title').style.color = '#fff';
        }
        if (notepadIcon) notepadIcon.style.display = 'none';
        if (ieIcon) ieIcon.style.display = 'inline-block';
        if (documentsIcon) documentsIcon.style.display = 'none';
      } else if (appName === 'documents') {
        win.querySelector('.title').textContent = 'Documents';
        if (titlebar) {
          titlebar.style.background = '#1976d2';
          win.querySelector('.title').style.color = '#fff';
        }
        if (notepadIcon) notepadIcon.style.display = 'none';
        if (ieIcon) ieIcon.style.display = 'none';
        if (documentsIcon) documentsIcon.style.display = 'inline-block';
      } else {
        win.querySelector('.title').textContent = title;
        if (titlebar) {
          titlebar.style.background = '#ece9d8';
          win.querySelector('.title').style.color = '#222';
        }
        if (notepadIcon) notepadIcon.style.display = 'none';
        if (ieIcon) ieIcon.style.display = 'none';
        if (documentsIcon) documentsIcon.style.display = 'none';
      }
      // Show Notepad icon only for Notepad
      const icon = win.querySelector('.np2-titlebar-icon');
      if (icon) {
        if (appName === 'notepad') {
          icon.style.display = 'inline-block';
        } else {
          icon.style.display = 'none';
        }
      }
      // ...existing code...

      // Mark window with app name for toggling
      if (appName) win.setAttribute('data-app', appName);

      // Make Documents window a little wider
      if (appName === 'documents') {
        win.style.width = '420px';
        win.style.minWidth = '420px';
        win.style.maxWidth = '440px';
      }

      const contents = win.querySelector('.contents');
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.className = 'app-iframe';
      iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation');
      contents.appendChild(iframe);

      // Hook keydown inside iframe to trigger keyboard error in parent
      iframe.addEventListener('load', function() {
        try {
          iframe.contentDocument.addEventListener('keydown', function(e) {
            e.preventDefault();
            var keyboardModal = document.getElementById('error-modal-2');
            if (keyboardModal && (keyboardModal.style.display === 'none' || keyboardModal.style.display === '')) {
              keyboardModal.style.display = 'block';
            }
          });
        } catch(e) {}
      });

      // initial position and stacking
      win.style.left = (120 + Math.random() * 80) + 'px';
      win.style.top = (80 + Math.random() * 40) + 'px';
      win.style.zIndex = ++topZ;
      windows.appendChild(win);

      // close button
      const closeBtn = win.querySelector('.close');
      if (closeBtn) closeBtn.addEventListener('click', () => win.remove());

      // bring to front on mousedown
      win.addEventListener('mousedown', () => {
        win.style.zIndex = ++topZ;
      });

      // basic drag behavior on titlebar
      if (titlebar) titlebar.addEventListener('mousedown', (e) => {
        e.preventDefault();
        let startX = e.clientX;
        let startY = e.clientY;
        const rect = win.getBoundingClientRect();
        let origLeft = rect.left;
        let origTop = rect.top;

        function onMove(ev) {
          win.style.left = origLeft + (ev.clientX - startX) + 'px';
          win.style.top = origTop + (ev.clientY - startY) + 'px';
        }
        function onUp() { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); }
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
      });

      // focus for accessibility
      win.setAttribute('tabindex', '-1');
      win.focus();

      console.log('Opened app iframe:', src);
    } catch (err) {
      console.error('Failed to open app iframe:', err);
      alert('Failed to open app: ' + err.message + '\nSee console for details.');
    }
  }

  // wire icons: single-click, double-click or Enter to open
    document.querySelectorAll('.icon').forEach(icon => {
      // Toggle app on double-click or Enter
      icon.addEventListener('dblclick', () => toggleApp(icon.dataset.app));
      icon.addEventListener('keydown', e => { if (e.key === 'Enter') toggleApp(icon.dataset.app); });
    });

  // expose for debugging
  window.openAppIframe = openAppIframe;
});