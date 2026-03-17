// Show error modals in sequence on page load
window.addEventListener('DOMContentLoaded', function() {
	const modals = [
		document.getElementById('error-modal-1'),
		document.getElementById('error-modal-2')
	];
	let current = 0;
	function showModal(idx) {
		if (modals[idx]) {
			modals[idx].style.display = 'flex';
			modals[idx].querySelector('.error-close').onclick = function() {
				modals[idx].style.display = 'none';
				if (modals[idx+1]) showModal(idx+1);
			};
		}
	}
	showModal(0);
});
