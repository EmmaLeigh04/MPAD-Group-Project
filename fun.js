document.addEventListener('DOMContentLoaded', () => {
  const appMap = {
    notepad: 'apps/notepad/index.html',
    mail: 'apps/mail/index.html',
    documents: 'apps/documents/index.html'
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
      win.querySelector('.title').textContent = title;

      // Mark window with app name for toggling
      if (appName) win.setAttribute('data-app', appName);

      const contents = win.querySelector('.contents');
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.className = 'app-iframe';
      iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');
      contents.appendChild(iframe);

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
      const titlebar = win.querySelector('.titlebar');
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