// Show error modals on page load, close independently
window.addEventListener('DOMContentLoaded', function() {
	document.querySelectorAll('.error-close').forEach(function(btn) {
		btn.onclick = function() {
			btn.closest('.error-modal').style.display = 'none';
		};
	});

	// Show keyboard error whenever the user types and block input
	var keyboardModal = document.getElementById('error-modal-2');
	document.addEventListener('keydown', function(e) {
		e.preventDefault();
		if (keyboardModal.style.display === 'none' || keyboardModal.style.display === '') {
			keyboardModal.style.display = 'block';
		}
	});
});
