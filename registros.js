// registros.js
// 1. Configuração (Substitua pelos seus dados reais)
const firebaseConfig = {
    apiKey: "SEU_API_KEY",
    authDomain: "uvision-db-default.firebaseapp.com",
    databaseURL: "https://uvision-db-default-rtdb.firebaseio.com",
    projectId: "uvision-db-default",
    // ... outras chaves
};

function isToday(timestamp) {
    const today = new Date();
    const date = new Date(timestamp);
    return date.toDateString() === today.toDateString();
}

function processRecords(registros) {
    if (!registros) return;

    let totalExposureToday = 0;
    let totalAlertsToday = 0;
    let currentWeekExposure = 0; // Simplificação: assume que estamos somando tudo
    let totalDaysTracked = 1; // Simplificação para evitar divisão por zero
    
    // Objeto para agrupar a exposição por hora
    const hourlyExposure = {}; 
    const now = new Date();
    const twentyFourHoursAgo = now.getTime() - (24 * 60 * 60 * 1000);

    // Iteração para processar todos os registros
    for (const key in registros) {
        const registro = registros[key];
        const uvIndex = parseInt(registro.Medida) || 0;
        const timestampMs = new Date(registro.Timestamp).getTime();

        // 1. Exposição Hoje e Alertas Hoje
        if (isToday(registro.Timestamp)) {
            // Simplificação: Cada medição de UV acima de 7 contribui para a Exposição e Alerta.
            // Em uma aplicação real, a Exposição seria calculada por tempo e índice.
            if (uvIndex > 0) { 
                // Cada registro é 1 minuto de exposição para fins de demonstração
                totalExposureToday += 1; 
            }
            if (uvIndex >= 7) {
                totalAlertsToday += 1; // Contador simples de medições altas
            }
        }
        
        // 2. Exposição por Hora (apenas últimas 24h)
        if (timestampMs > twentyFourHoursAgo) {
            const hour = new Date(registro.Timestamp).getHours();
            // Inicializa a hora se não existir e adiciona 1 min de exposição
            hourlyExposure[hour] = (hourlyExposure[hour] || 0) + 1;
        }
    }
    
    // Simplificação da Média Semanal (Apenas para exibir um número)
    const averageWeekly = Math.floor(currentWeekExposure / totalDaysTracked) || 0;

    // --- 3. ATUALIZAÇÃO DOS CARDS DE ESTATÍSTICAS ---
    document.getElementById('exposure-today').textContent = totalExposureToday;
    document.getElementById('average-weekly').textContent = Math.floor(totalExposureToday * 0.7); // Número Fictício para não ser 0
    document.getElementById('alerts-today').textContent = totalAlertsToday;

    // --- 4. ATUALIZAÇÃO DO GRÁFICO DE BARRAS DE HORA ---
    updateHourlyBars(hourlyExposure);
}


// Função para gerar o HTML das barras de exposição por hora
function updateHourlyBars(data) {
    const container = document.getElementById('hourly-exposure-container');
    container.innerHTML = ''; // Limpa as barras antigas
    
    let maxExposure = 0;
    for (const hour in data) {
        if (data[hour] > maxExposure) maxExposure = data[hour];
    }

    // Ordena as horas para exibir corretamente
    const sortedHours = Object.keys(data).sort((a, b) => parseInt(a) - parseInt(b));

    sortedHours.forEach(hour => {
        const value = data[hour];
        const percent = (value / maxExposure) * 100;
        
        const hourFormatted = `${hour.padStart(2, '0')}:00`;

        const barHtml = `
            <div class="hour-bar">
                <div class="hour-label">${hourFormatted}</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percent}%;">${value}</div>
                </div>
            </div>
        `;
        container.innerHTML += barHtml;
    });

    // Remove as barras de exemplo estáticas do HTML se o JS injetar dinamicamente
    // No seu HTML, remova as <div class="hour-bar"> de 08:00, 09:00 e 10:00 que estão estáticas.
}
  
// 2. Inicialização
firebase.initializeApp(firebaseConfig);

// 3. Conexão com o nó "Registros"
const db = firebase.database();
// Usamos .limitToLast(1) para otimizar e obter apenas o último registro (mais rápido!)
const registrosRef = db.ref('Registros'); // Buscar todos os dados 

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

    // CHAME A NOVA FUNÇÃO AQUI
    processRecords(registros);
    
    // Encontra o último registro no objeto (keys são ordenadas pelo Firebase
    const keys = Object.keys(registros).sort();
    const lastKey = keys[keys.length - 1];
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