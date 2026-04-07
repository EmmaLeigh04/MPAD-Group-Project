// Show error modals on page load, close independently
window.addEventListener('DOMContentLoaded', function() {
				// Play error sound if update error is visible on load
				var updateModal = document.getElementById('error-modal-1');
				if (updateModal && updateModal.style.display !== 'none') {
					setTimeout(function() { playErrorSound(); }, 100);
				}
			function playErrorSound() {
				var audio = document.getElementById('error-audio');
				if (audio) {
					audio.currentTime = 0;
					audio.play();
				}
			}
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

		// Show error sound when any error modal is shown
		function showErrorModal(modal) {
			modal.style.display = 'block';
			playErrorSound();
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
		showErrorModal(keyboardModal);
	});
	document.addEventListener('keypress', function(e) {
		e.preventDefault();
		showErrorModal(keyboardModal);
	});
	document.addEventListener('keyup', function(e) {
		e.preventDefault();
		showErrorModal(keyboardModal);
	});
});
