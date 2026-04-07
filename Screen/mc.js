// Show error modals on page load, close independently
window.addEventListener('DOMContentLoaded', function() {
		// Make error modals draggable
		function makeModalDraggable(modal) {
			const windowDiv = modal.querySelector('.error-window');
			let isDragging = false;
			let offsetX = 0;
			let offsetY = 0;
			let startX = 0;
			let startY = 0;
			// Use the title bar as the drag handle
			const titleBar = windowDiv.querySelector('.error-title');
			if (!titleBar) return;
			titleBar.style.cursor = 'move';
			titleBar.addEventListener('mousedown', function(e) {
				isDragging = true;
				startX = e.clientX;
				startY = e.clientY;
				// Get current position
				const rect = modal.getBoundingClientRect();
				offsetX = rect.left;
				offsetY = rect.top;
				document.body.style.userSelect = 'none';
			});
			document.addEventListener('mousemove', function(e) {
				if (!isDragging) return;
				let dx = e.clientX - startX;
				let dy = e.clientY - startY;
				modal.style.left = (offsetX + dx) + 'px';
				modal.style.top = (offsetY + dy) + 'px';
				modal.style.transform = 'none';
			});
			document.addEventListener('mouseup', function() {
				isDragging = false;
				document.body.style.userSelect = '';
			});
		}

		document.querySelectorAll('.error-modal').forEach(makeModalDraggable);
	document.querySelectorAll('.error-close').forEach(function(btn) {
		btn.onclick = function() {
			btn.closest('.error-modal').style.display = 'none';
		};
	});

	// Show keyboard error whenever the user types and block input
	var keyboardModal = document.getElementById('error-modal-3');
	document.addEventListener('keydown', function(e) {
		e.preventDefault();
		keyboardModal.style.display = 'block';
	});
	document.addEventListener('keypress', function(e) {
		e.preventDefault();
		keyboardModal.style.display = 'block';
	});
	document.addEventListener('keyup', function(e) {
		e.preventDefault();
		keyboardModal.style.display = 'block';
	});
});
