// registros.js
// 1. Configuração (Substitua pelos seus dados reais)
const firebaseConfig = {
    apiKey: "SEU_API_KEY",
    authDomain: "uvision-db-default.firebaseapp.com",
    databaseURL: "https://uvision-db-default-rtdb.firebaseio.com",
    projectId: "uvision-db-default",
    // ... outras chaves
  };
  
  // 2. Inicialização
  firebase.initializeApp(firebaseConfig);
  
  // 3. Conexão com o nó "Registros"
  const db = firebase.database();
  // Usamos .limitToLast(1) para otimizar e obter apenas o último registro (mais rápido!)
  const registrosRef = db.ref('Registros').limitToLast(1); 
  
  // Função auxiliar para determinar a classificação do UV (exemplo)
  function classifyUV(index) {
      if (index < 3) return { text: 'Baixo', color: 'green' };
      if (index < 6) return { text: 'Moderado', color: 'yellow' };
      if (index < 8) return { text: 'Alto', color: 'orange' };
      if (index < 11) return { text: 'Muito Alto', color: 'red' };
      return { text: 'Extremo', color: 'purple' };
  }
  
  // Função auxiliar para calcular o Tempo Seguro (exemplo)
  function calculateSafeTime(uvIndex) {
      // Esta é uma fórmula simplificada. O cálculo real depende do tipo de pele.
      if (uvIndex <= 0) return 'Indeterminado';
      const minutes = Math.floor(100 / uvIndex); // Exemplo: 100 / 7 ≈ 14 minutos
      return `${minutes} min`;
  }
  
  // 4. Lendo o último dado em tempo real (onValue)
  registrosRef.on('value', (snapshot) => {
      
      const registros = snapshot.val();
      
      // Verifica se existem dados
      if (!registros) {
          document.getElementById('uv-index-value').textContent = 'N/A';
          document.getElementById('uv-classification').textContent = 'Sem Dados';
          return;
      }
      
      // Encontra o último registro no objeto (keys são ordenadas pelo Firebase)
      const lastKey = Object.keys(registros)[0];
      const ultimoRegistro = registros[lastKey];
      
      // --- 5. ATUALIZAÇÃO DO FRONTEND COM O ÚLTIMO REGISTRO ---
      
      const uvIndex = parseInt(ultimoRegistro.Medida) || 0; // Converte Medida para número
      const safeTime = calculateSafeTime(uvIndex);
      const classification = classifyUV(uvIndex);
  
      // a) Card Índice UV Atual
      document.getElementById('uv-index-value').textContent = uvIndex;
      
      // Atualiza a classificação e a cor do badge (assumindo que você tem classes CSS como .badge-green, .badge-orange etc.)
      const uvBadgeElement = document.getElementById('uv-classification');
      uvBadgeElement.textContent = classification.text;
      // Remova classes antigas e adicione a nova classe de cor
      uvBadgeElement.className = 'uv-badge'; // Reseta
      uvBadgeElement.classList.add(`badge-${classification.color}`); 
      
      document.getElementById('safe-time-remaining').textContent = safeTime;
      
      // Atualiza a hora da última atualização
      // O timestamp do Firebase é uma string, você pode precisar formatá-lo (ex: "2025-11-25T...")
      const timestamp = new Date(ultimoRegistro.Timestamp);
      document.getElementById('last-update-time').textContent = `Atualizado às ${timestamp.toLocaleTimeString('pt-BR')}`;
      
      // b) Alerta Condicional (Exemplo: mostrar alerta se o tempo seguro for baixo)
      const alertDiv = document.getElementById('safety-alert');
      if (uvIndex >= 7) { // Se o índice for 'Alto' ou superior
          document.getElementById('alert-message').textContent = `Atenção! Índice UV Alto (${uvIndex}). Tempo seguro: ${safeTime}.`;
          alertDiv.style.display = 'flex';
      } else {
          alertDiv.style.display = 'none';
      }
  
      // c) Status de Sincronização
      const syncBtn = document.getElementById('sync-button');
      syncBtn.classList.add('syncing'); // Adicione uma classe para animar/mostrar que está atualizado
  
      setTimeout(() => {
          syncBtn.classList.remove('syncing'); // Remove após um breve período
      }, 1000);
      
      // NOTA: Para as estatísticas 'Exposição Hoje' e 'Exposição por Hora', você precisaria ler TODOS
      // os registros do dia e somar, o que requer um código mais complexo e mais dados.
      
  }, (error) => {
      console.error("Erro ao ler dados do Firebase:", error);
      document.getElementById('device-status-text').textContent = 'Erro de Conexão (Firebase)';
      document.getElementById('status-badge').textContent = 'Offline';
      document.getElementById('status-badge').className = 'badge badge-offline'; // Assumindo que você tem uma classe para offline
  });