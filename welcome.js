// Script for welcome.html: handle green arrow click
window.addEventListener('DOMContentLoaded', function() {
  var arrow = document.getElementById('green-arrow');
  if (arrow) {
    arrow.addEventListener('click', function() {
      window.location.href = 'mc.html';
    });
  }
});
