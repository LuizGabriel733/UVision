# [cite_start]UVision: Pulseira Inteligente para Monitoramento de Radiação UV [cite: 1]

> [cite_start]Um projeto de pulseira inteligente voltada ao monitoramento de radiação ultravioleta (UV) e prevenção do câncer de pele. 

![[INSERIR IMAGEM DA PULSEIRA AQUI]](https://via.placeholder.com/600x300)

## 🎯 Sobre o Projeto

[cite_start]A exposição excessiva à radiação solar é um grave problema de saúde pública[cite: 15]. [cite_start]De acordo com a OMS, cerca de 60 mil pessoas morrem anualmente por doenças relacionadas a essa exposição[cite: 14]. [cite_start]Em países tropicais como o Brasil, a incidência solar é elevada na maior parte do ano, aumentando os riscos[cite: 15].

[cite_start]O **UVision** nasce como uma tecnologia assistiva universal [cite: 10] [cite_start]com o objetivo de promover a prevenção e a conscientização sobre os efeitos da radiação solar[cite: 9]. [cite_start]A pulseira monitora a exposição e incentiva hábitos mais seguros [cite: 9][cite_start], sendo especialmente útil para trabalhadores e praticantes de atividades ao ar livre[cite: 10].

[cite_start]Este projeto integra ciência, tecnologia e saúde preventiva para contribuir com a redução de casos de câncer de pele[cite: 11].

## 🚀 Funcionalidades Principais

* [cite_start]**Monitoramento em Tempo Real:** Utiliza o sensor ML8511 para detectar a intensidade dos raios UV (faixa de 280-390 nm)[cite: 7].
* [cite_start]**Cálculo de Dose:** Converte os dados de irradiância em unidades de Dose Eritêmica Padrão (SED), uma métrica internacional para riscos à saúde[cite: 8].
* [cite_start]**Personalização:** O firmware permite ajustar as medições com base no tipo de pele, uso de protetor solar e áreas corporais expostas[cite: 33].
* [cite_start]**Classificação de Risco:** Categoriza o risco em quatro níveis: baixo, moderado, alto e muito alto[cite: 34].
* [cite_start]**Alertas Preventivos:** Emite alertas (sonoros ou luminosos [cite: 48][cite_start]) quando o tempo seguro de exposição é ultrapassado[cite: 34].
* [cite_start]**Conectividade:** Transmite os dados via Bluetooth para um aplicativo móvel[cite: 35].
* [cite_start]**Histórico de Exposição:** O aplicativo armazena o histórico diário e semanal, facilitando o acompanhamento dos hábitos[cite: 35].

## 🛠️ Hardware e Tecnologias

O protótipo foi desenvolvido utilizando os seguintes componentes principais:

* [cite_start]**Microcontrolador:** ESP32 [cite: 32]
* [cite_start]**Sensor UV:** Sensor Óptico ML8511 [cite: 31]
* [cite_start]**Comunicação:** Bluetooth (integrado ao ESP32) [cite: 35]
* **Firmware:** C/C++ (Arduino)
* **App Móvel:** `[INSERIR TECNOLOGIA DO APP, EX: FLUTTER, KOTLIN, ETC.]`

## ⚙️ Como Funciona (Fluxo de Dados)

1.  [cite_start]O sensor **ML8511** capta a luz solar e a converte em sinais elétricos proporcionais à irradiância[cite: 31].
2.  [cite_start]O **ESP32** processa esses sinais[cite: 32].
3.  [cite_start]O firmware calcula a **Dose Eritêmica Padrão (SED)**, levando em conta as personalizações do usuário (tipo de pele, etc.)[cite: 32, 33].
4.  [cite_start]O sistema classifica o **Nível de Risco** (Baixo a Muito Alto)[cite: 34].
5.  [cite_start]Se o limite de exposição segura for atingido, a pulseira emite um **alerta**[cite: 34].
6.  [cite_start]Paralelamente, os dados são enviados via **Bluetooth** para o aplicativo, onde o histórico é armazenado[cite: 35].

## 📦 Como Usar o Projeto

`[ESTA SEÇÃO É UM PLACEHOLDER - Você deve adicionar as instruções de como compilar e rodar o seu código. Por exemplo:]`

**Pré-requisitos:**

* Arduino IDE ou PlatformIO
* Biblioteca `[Nome da Biblioteca]`
* O aplicativo móvel `[Nome do App]`

**Passos para o Firmware:**

1.  Clone este repositório:
    ```bash
    git clone [https://github.com/edwfreitas/UVision_Inovatech.git](https://github.com/edwfreitas/UVision_Inovatech.git)
    cd UVision_Inovatech
    ```
2.  Abra o arquivo `.ino` na Arduino IDE.
3.  Configure a placa para "ESP32 Dev Module" (ou similar).
4.  Compile e envie o código para a placa.

**Passos para o Aplicativo:**

* O repositório do aplicativo pode ser encontrado aqui: `[LINK PARA O REPOSITÓRIO DO APP]`
* `[Instruções de build do app]`

## 📈 Resultados e Limitações

[cite_start]Os testes indicaram que a pulseira é eficiente no registro e interpretação das variações de radiação solar[cite: 47]. [cite_start]Os alertas em tempo real mostraram-se eficazes na conscientização do usuário[cite: 48].

[cite_start]Uma limitação observada é a necessidade de calibração precisa do sensor, pois diferentes ângulos e condições climáticas podem influenciar as medições[cite: 50]. [cite_start]Apesar disso, o desempenho geral foi considerado satisfatório[cite: 51].

## 🎓 Autores e Contexto do Projeto

[cite_start]Este projeto foi desenvolvido como parte do curso de **Sistema de Informação (4º Período)** do `[NOME DA INSTITUIÇÃO AQUI]`[cite: 3].

**Orientador(es):**
* [cite_start]`[NOME DO ORIENTADOR(A)]` [cite: 4]

**Equipe (Autores):**
* Alexandro Simas
* Arleson Marinho
* Caio Luan
* Camilly Matelins
* Charles Gabriel
* Christian Marques
* Danilo Clever
* **Eduardo Freitas (edwfreitas)**
* Erich Mark
* Gabriela Marques
* George Ruso
* Giovanna Isabelle
* Guilherme John
* Hilary Larissa
* Isaac Lira
* Jamilly Carvalho
* Josias Tomáz
* Lara Jessica
* Lucas Silva
* Luiz Gabriel
* Mateus Fidelis
* Matheus Araújo
* Robison Nascimento
* Thaianny Cristine
* Yamilla Nicásio
* [cite_start]Yuri Girão [cite: 2]

## 📜 Licença

`[ADICIONAR LICENÇA AQUI, EX: MIT]`

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
