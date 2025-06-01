# 🌡️ Sistema de Controle de Temperatura para Aquários

Este projeto tem como objetivo automatizar o controle da temperatura da água em aquários utilizando sensores, microcontrolador com Wi-Fi e uma interface web. Ele permite o monitoramento e o controle remoto da temperatura ideal para garantir o bem-estar dos peixes e plantas aquáticas.

## 📌 Motivação

Manter a temperatura estável em aquários é um desafio comum, especialmente durante mudanças climáticas. O controle manual de aquecedores submersíveis costuma ser impreciso e inconveniente. Com esse sistema, o aquarista pode visualizar e ajustar a temperatura de forma automática e remota, promovendo maior praticidade e segurança.

---

## ⚙️ Funcionalidades

- **Medição precisa da temperatura:** Sensor DS18B20 à prova d'água realiza leituras contínuas da temperatura.
- **Controle automático do aquecedor:** Um relé ativa ou desativa o aquecedor submersível com base nas leituras.
- **Monitoramento remoto:** Integração via Wi-Fi usando o Wemos D1 R2 (ESP8266), com acesso pela interface web.
- **Exibição local:** Display LCD mostra a temperatura em tempo real no próprio aquário.

---

## 🧰 Tecnologias e Componentes Utilizados

### Hardware
- Wemos D1 R2 (ESP8266)
- Sensor de Temperatura DS18B20 (à prova d’água)
- Relé
- Aquecedor Submersível
- Display LCD (I2C)
- Protoboard e jumpers
- Fonte de alimentação

### Software
- **Arduino IDE:** Programação em C++ para controle do hardware
- **Back-end:** Node.js
- **Front-end:** React com TypeScript
- **Banco de dados:** MongoDB

---

## 🚀 Como Executar o Projeto

1. Abra o código-fonte na **Arduino IDE**
2. Instale as bibliotecas necessárias
3. Configure seu Wi-Fi (`SSID` e `senha`) no sketch
4. Envie o código para o Wemos D1 R2

### Back-end
- cd backend
- npm install
- npm start

### Front-end
- cd frontend
- npm install
- npm run dev
