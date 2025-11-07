# UVision: Pulseira Inteligente para Monitoramento de Radiação UV

> Um projeto de pulseira inteligente voltada ao monitoramento de radiação ultravioleta (UV) e prevenção do câncer de pele.

![[INSERIR IMAGEM DA PULSEIRA AQUI]](https://via.placeholder.com/600x300)

## 🎯 Sobre o Projeto

A exposição excessiva à radiação solar é um grave problema de saúde pública. De acordo com a OMS, cerca de 60 mil pessoas morrem anualmente por doenças relacionadas a essa exposição. Em países tropicais como o Brasil, a incidência solar é elevada na maior parte do ano, aumentando os riscos.

O **UVision** nasce como uma tecnologia assistiva universal com o objetivo de promover a prevenção e a conscientização sobre os efeitos da radiação solar. A pulseira monitora a exposição e incentiva hábitos mais seguros, sendo especialmente útil para trabalhadores e praticantes de atividades ao ar livre.

Este projeto integra ciência, tecnologia e saúde preventiva para contribuir com a redução de casos de câncer de pele.

## 🚀 Funcionalidades Principais

* **Monitoramento em Tempo Real:** Utiliza o sensor ML8511 para detectar a intensidade dos raios UV (faixa de 280-390 nm).
* **Cálculo de Dose:** Converte os dados de irradiância em unidades de Dose Eritêmica Padrão (SED), uma métrica internacional para riscos à saúde.
* **Personalização:** O firmware permite ajustar as medições com base no tipo de pele, uso de protetor solar e áreas corporais expostas.
* **Classificação de Risco:** Categoriza o risco em quatro níveis: baixo, moderado, alto e muito alto.
* **Alertas Preventivos:** Emite alertas (sonoros ou luminosos) quando o tempo seguro de exposição é ultrapassado.
* **Conectividade:** Transmite os dados via Bluetooth para um aplicativo móvel.
* **Histórico de Exposição:** O aplicativo armazena o histórico diário e semanal, facilitando o acompanhamento dos hábitos.

## 🛠️ Hardware e Tecnologias

O protótipo foi desenvolvido utilizando os seguintes componentes principais:

* **Microcontrolador:** ESP32
* **Sensor UV:** Sensor Óptico ML8511
