// Minimal auth helper used by static pages.
// Exposes helper on window.auth after DOMContentLoaded.
document.addEventListener('DOMContentLoaded', function(){
  window.auth = {
    isAuthenticated: function(){
      return !!localStorage.getItem('currentUser');
    },
    logout: function(){
      localStorage.removeItem('currentUser');
      location.href = 'index.html';
    }
  };
});
