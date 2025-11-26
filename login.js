const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function(e){
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  // Recupera usuários do LocalStorage (simulação)
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Verifica se o usuário existe e a senha está correta
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Marca sessão e redireciona
    localStorage.setItem('currentUser', JSON.stringify({ nome: user.nome, email: user.email }));
    alert(`Bem-vindo de volta, ${user.nome}!`);
    window.location.href = 'dashboard.html';
  } else {
    alert('E-mail ou senha incorretos!');
  }
});