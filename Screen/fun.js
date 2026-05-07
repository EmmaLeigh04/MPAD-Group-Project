document.addEventListener('DOMContentLoaded', () => {
  const appMap = {
    notepad: '/apps/notepad/',
    mail: '/apps/mail/',
    documents: '/apps/documents/',
    browser: '/apps/browser/',
    encrypted: '/apps/documents/',
    secret: '/apps/secret/',
    evidence: '/apps/evidence/'
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

  // Expose toggleApp globally so iframes (like Documents) can call it
  window.toggleApp = toggleApp;

  function openAppIframe(src, title, appName) {
    try {
      const template = document.getElementById('template-window');
      if (!template) throw new Error('template-window not found');
      const node = template.content.cloneNode(true);
      const win = node.querySelector('.win-frame');
      if (!win) throw new Error('.win-frame not found in template');
      // Set Notepad, IE, Documents, Mail, or Note icon and titlebar color
      const titlebar = win.querySelector('.titlebar');
      const notepadIcon = win.querySelector('.np2-titlebar-icon.notepad-icon');
      const ieIcon = win.querySelector('.np2-titlebar-icon.ie-icon');
      // Documents icon
      let documentsIcon = win.querySelector('.np2-titlebar-icon.documents-icon');
      if (!documentsIcon) {
        documentsIcon = document.createElement('img');
        documentsIcon.src = '/static/icons/windowsIcons/documents.png';
        documentsIcon.alt = 'Documents icon';
        documentsIcon.className = 'np2-titlebar-icon documents-icon';
        documentsIcon.style.height = '20px';
        documentsIcon.style.width = '20px';
        documentsIcon.style.marginRight = '8px';
        documentsIcon.style.display = 'none';
        if (titlebar) titlebar.insertBefore(documentsIcon, titlebar.querySelector('.title'));
      }
      // Note icon (for secret app)
      let noteIcon = win.querySelector('.np2-titlebar-icon.note-icon');
      if (!noteIcon) {
        noteIcon = document.createElement('img');
        noteIcon.src = '/static/icons/windowsIcons/newnote.png';
        noteIcon.alt = 'Note icon';
        noteIcon.className = 'np2-titlebar-icon note-icon';
        noteIcon.style.height = '20px';
        noteIcon.style.width = '20px';
        noteIcon.style.marginRight = '8px';
        noteIcon.style.display = 'none';
        if (titlebar) titlebar.insertBefore(noteIcon, titlebar.querySelector('.title'));
      }
      // Mail icon
      let mailIcon = win.querySelector('.np2-titlebar-icon.mail-icon');
      if (!mailIcon) {
        mailIcon = document.createElement('img');
        mailIcon.src = '/static/icons/windowsIcons/mail.png';
        mailIcon.alt = 'Mail icon';
        mailIcon.className = 'np2-titlebar-icon mail-icon';
        mailIcon.style.height = '20px';
        mailIcon.style.width = '20px';
        mailIcon.style.marginRight = '8px';
        mailIcon.style.display = 'none';
        if (titlebar) titlebar.insertBefore(mailIcon, titlebar.querySelector('.title'));
      }
      if (appName === 'notepad') {
        win.querySelector('.title').textContent = 'Untitled - Notepad2';
        if (titlebar) {
          titlebar.style.background = '#1976d2';
          win.querySelector('.title').style.color = '#fff';
        }
        if (notepadIcon) notepadIcon.style.display = 'inline-block';
        if (noteIcon) noteIcon.style.display = 'none';
        if (ieIcon) ieIcon.style.display = 'none';
        if (documentsIcon) documentsIcon.style.display = 'none';
        if (mailIcon) mailIcon.style.display = 'none';
      } else if (appName === 'secret') {
        win.querySelector('.title').textContent = 'Untitled - Notepad2';
        if (titlebar) {
          titlebar.style.background = '#1976d2';
          win.querySelector('.title').style.color = '#fff';
        }
        if (notepadIcon) notepadIcon.style.display = 'none';
        if (noteIcon) noteIcon.style.display = 'inline-block';
        if (ieIcon) ieIcon.style.display = 'none';
        if (documentsIcon) documentsIcon.style.display = 'none';
        if (mailIcon) mailIcon.style.display = 'none';
      } else if (appName === 'browser') {
        win.querySelector('.title').textContent = 'Internet Explorer';
        if (titlebar) {
          titlebar.style.background = '#1976d2';
          win.querySelector('.title').style.color = '#fff';
        }
        if (notepadIcon) notepadIcon.style.display = 'none';
        if (ieIcon) ieIcon.style.display = 'inline-block';
        if (documentsIcon) documentsIcon.style.display = 'none';
        if (mailIcon) mailIcon.style.display = 'none';
      } else if (appName === 'documents') {
        win.querySelector('.title').textContent = 'Documents';
        if (titlebar) {
          titlebar.style.background = '#1976d2';
          win.querySelector('.title').style.color = '#fff';
        }
        if (notepadIcon) notepadIcon.style.display = 'none';
        if (ieIcon) ieIcon.style.display = 'none';
        if (documentsIcon) documentsIcon.style.display = 'inline-block';
        if (mailIcon) mailIcon.style.display = 'none';
      } else if (appName === 'mail') {
        win.querySelector('.title').textContent = 'Mail';
        if (titlebar) {
          titlebar.style.background = '#1976d2';
          win.querySelector('.title').style.color = '#fff';
        }
        if (notepadIcon) notepadIcon.style.display = 'none';
        if (ieIcon) ieIcon.style.display = 'none';
        if (documentsIcon) documentsIcon.style.display = 'none';
        if (noteIcon) noteIcon.style.display = 'none';
        if (mailIcon) mailIcon.style.display = 'inline-block';
      } else if (appName === 'evidence') {
        win.querySelector('.title').textContent = 'Evidence';
        if (titlebar) {
          titlebar.style.background = '#1976d2';
          win.querySelector('.title').style.color = '#fff';
        }
        if (notepadIcon) notepadIcon.style.display = 'none';
        if (noteIcon) noteIcon.style.display = 'inline-block';
        if (ieIcon) ieIcon.style.display = 'none';
        if (documentsIcon) documentsIcon.style.display = 'none';
        if (mailIcon) mailIcon.style.display = 'none';
      } else {
        win.querySelector('.title').textContent = title;
        if (titlebar) {
          titlebar.style.background = '#ece9d8';
          win.querySelector('.title').style.color = '#222';
        }
        if (notepadIcon) notepadIcon.style.display = 'none';
        if (ieIcon) ieIcon.style.display = 'none';
        if (documentsIcon) documentsIcon.style.display = 'none';
        if (noteIcon) noteIcon.style.display = 'none';
        if (mailIcon) mailIcon.style.display = 'none';
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
            if (keyboardModal) {
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
      // Toggle app on double-click or Enter (use window.toggleApp so the Clippy-tracking patch is always used)
      icon.addEventListener('dblclick', () => window.toggleApp(icon.dataset.app));
      icon.addEventListener('keydown', e => { if (e.key === 'Enter') window.toggleApp(icon.dataset.app); });
    });

  // expose for debugging
  window.openAppIframe = openAppIframe;

  // Track opened apps for Clippy (exclude 'encrypted' — it's an alias, not a real icon)
  const allApps = Object.keys(appMap).filter(a => a !== 'encrypted');
  let openedApps = JSON.parse(sessionStorage.getItem('openedApps') || '[]');
  let clippyShown = sessionStorage.getItem('clippyShown') === 'true';

  function checkClippy() {
    if (!clippyShown && allApps.every(app => openedApps.includes(app))) {
      clippyShown = true;
      sessionStorage.setItem('clippyShown', 'true');
      showClippy();
    }
  }

  function showClippy() {
    if (document.getElementById('clippy-container')) return;
    const clippy = document.createElement('div');
    clippy.id = 'clippy-container';
    clippy.style.position = 'fixed';
    clippy.style.left = '50%';
    clippy.style.top = '50%';
    clippy.style.transform = 'translate(-50%, 0)';
    clippy.style.zIndex = '9999';
    clippy.innerHTML = `
      <div id="clippy-bubble" style="position:absolute; bottom:120px; left:0; background:#f9e79f; border:2px solid #222; border-radius:6px; padding:10px 18px 10px 18px; min-width:260px; font-size:15px; color:#222; box-shadow:2px 4px 12px rgba(0,0,0,0.08); font-family: 'MS Sans Serif', Arial, sans-serif;">
        <div style='margin-bottom:10px;'>It looks like you've seen everything!<br>Would you like to find out the truth?</div>
        <div style='display:flex; justify-content:flex-end; gap:10px;'>
          <button id="clippy-leave" style="padding:2px 18px; border-radius:2px; border:1px solid #222; background:#fff; color:#222; font-weight:bold; font-family:inherit; cursor:pointer;">Yes</button>
          <button id="clippy-stay" style="padding:2px 18px; border-radius:2px; border:1px solid #222; background:#fff; color:#222; font-weight:bold; font-family:inherit; cursor:pointer;">No</button>
        </div>
        <!-- Speech bubble tail: border color matches bubble, border width matches border, tail is layered for border and fill -->
        <div style="position:absolute; left:70px; bottom:-22px; width:0; height:0; z-index:2; border-left:18px solid transparent; border-right:18px solid transparent; border-top:22px solid #222;"></div>
        <div style="position:absolute; left:72px; bottom:-20px; width:0; height:0; z-index:3; border-left:16px solid transparent; border-right:16px solid transparent; border-top:20px solid #f9e79f;"></div>
      </div>
      <img src="/static/images/Clippy.webp" alt="Clippy" style="width:90px; position:absolute; left:70px; bottom:0; z-index:2;">
    `;
    document.body.appendChild(clippy);
    document.getElementById('clippy-leave').onclick = () => { window.location.href = '/conclusion/'; };
    document.getElementById('clippy-stay').onclick = () => { clippy.querySelector('div').innerHTML = "Keep exploring!"; };
  }

  // DEBUG: Show Clippy immediately for testing
  // showClippy(); // Remove or comment out this line to disable immediate Clippy

  // Patch toggleApp to track opened apps
  const origToggleApp = toggleApp;
  window.toggleApp = function(name, title) {
    if (!openedApps.includes(name)) {
      openedApps.push(name);
      sessionStorage.setItem('openedApps', JSON.stringify(openedApps));
      checkClippy();
    }
    origToggleApp(name, title);
  };

  // On load, check if Clippy should be shown
  checkClippy();
});