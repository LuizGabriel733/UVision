// Cadastro com validação de senha e redirecionamento
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const pigmentationDiv = document.getElementById('pigmentationLevel');

  // Mostrar nível de pigmentação apenas se Vitiligo
  const skinConditionRadios = document.getElementsByName('skinCondition');
  skinConditionRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'Vitiligo' && radio.checked) {
        pigmentationDiv.classList.remove('hidden');
      } else {
        pigmentationDiv.classList.add('hidden');
      }
    });
  });

  registerForm.addEventListener('submit', function(e){
    e.preventDefault();

    const nome = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!nome || !email || !password) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    // Pegando informações de pele (opcionais)
    const skinColor = document.querySelector('input[name="skinColor"]:checked')?.value || '';
    const skinCondition = document.querySelector('input[name="skinCondition"]:checked')?.value || '';
    const pigmentation = document.querySelector('input[name="pigmentation"]:checked')?.value || '';

    // Salvar usuário no LocalStorage (simulação)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Verifica se e-mail já existe
    const exists = users.some(u => u.email === email);
    if (exists) {
      alert('Já existe um usuário com esse e-mail.');
      return;
    }

  users.push({ nome, email, password, skinColor, skinCondition, pigmentation });
  localStorage.setItem('users', JSON.stringify(users));

  // Marca sessão do usuário (simulação) e redireciona para dashboard
  localStorage.setItem('currentUser', JSON.stringify({ nome, email }));
  alert('Cadastro efetuado com sucesso! Você será redirecionado.');
  window.location.href = 'dashboard.html';
  });
});
