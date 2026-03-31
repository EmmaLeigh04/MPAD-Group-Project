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
			// Stack each modal slightly off from the previous
			modals[idx].style.transform = `translate(${idx * 32}px, ${idx * 32}px)`;
			modals[idx].style.zIndex = 9999 + idx;
			modals[idx].querySelector('.error-close').onclick = function() {
				modals[idx].style.display = 'none';
				if (modals[idx+1]) showModal(idx+1);
			};
		}
	}
	showModal(0);
});
