#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

// Configurações do display
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Pinos e sensores
#define ONE_WIRE_BUS 0
#define RELAY_PIN 12

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

// Credenciais WiFi
const char* ssid = "Henrique";
const char* password = "12345678";
const char* serverUrl = "http://192.168.170.194:3000";
//const char* ssid = "AP_101.2GHz";
//const char* password = "Casanova1006";
//const char* serverUrl = "http://192.168.0.115:3000";

WiFiClient wifiClient;
HTTPClient http;

float minTemperatura = 23.0;
float maxTemperatura = 24.0;
bool statusRele = false;

void setup() {
    // Inicializa a comunicação serial
    Serial.begin(9600);
    while (!Serial) {
        ;  // Aguarda o monitor serial inicializar
    }

    Serial.println("\nInicializando...");

    // Inicializar o display
    lcd.init();
    lcd.clear();
    lcd.backlight();

    // Inicializar o sensor de temperatura
    sensors.begin();

    // Configurar relé como saída
    pinMode(RELAY_PIN, OUTPUT);
    digitalWrite(RELAY_PIN, HIGH); // Relé desligado inicialmente

    // Conectar ao WiFi
    conectarWiFi();
}

void loop() {
    // Ler e exibir temperatura
    static unsigned long lastTemperatureUpdate = 0;

    sensors.requestTemperatures();
    float tempC = sensors.getTempCByIndex(0);

    lcd.setCursor(0, 1);
    lcd.print("Temp: ");
    lcd.print(tempC, 1);
    lcd.print(" C");

    if (millis() - lastTemperatureUpdate > 5000) {
        // Enviar temperatura para o servidor a cada 10 segundos
        enviarTemperatura(tempC);
        lastTemperatureUpdate = millis();
    }

    // Controlar o relé
    if (sensors.getTempCByIndex(0) < minTemperatura) {
      statusRele = true;
        digitalWrite(RELAY_PIN, LOW); // Ativa o relé
    } else if (sensors.getTempCByIndex(0) > maxTemperatura) {
      statusRele = false;
        digitalWrite(RELAY_PIN, HIGH); // Desativa o relé
    }

    // Atualizar as configurações do servidor a cada 60 segundos
    static unsigned long lastConfigUpdate = 0;
    if (millis() - lastConfigUpdate > 10000) {
        obterConfiguracoesTemperatura();
        lastConfigUpdate = millis();
    }
}

void conectarWiFi() {
    Serial.print("Conectando-se a ");
    Serial.println(ssid);

    WiFi.begin(ssid, password);

    // Aguardar conexão
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("\nConectado à rede WiFi!");
    Serial.print("Endereço IP: ");
    Serial.println(WiFi.localIP());
}

void enviarTemperatura(float temperatura) {
    if (WiFi.status() == WL_CONNECTED) {
        
        http.begin(wifiClient, String(serverUrl) + "/temperatura/current");  // Usa WiFiClient com a URL

        http.addHeader("content-type", "application/json");

        // Cria o corpo da requisição com a temperatura atual
        String jsonData = "{\"temperatura\":" + String(temperatura) + ", \"statusAquecedor\":" + String(statusRele) + "}";

        int httpResponseCode = http.POST(jsonData);

        if (httpResponseCode > 0) {
            String resposta = http.getString();
            
            // Deserializa a resposta JSON para formatar a saída
            DynamicJsonDocument doc(512);
            DeserializationError error = deserializeJson(doc, resposta);

            if (!error) {
                String message = doc["message"];
                float tempAtualizada = doc["temperatura"];

                Serial.println("Resposta do servidor:");
                Serial.println("----------------------------");
                Serial.println("Mensagem: " + message);
                Serial.print("Temperatura Atualizada: ");
                Serial.println(tempAtualizada);
                Serial.println("----------------------------");
            } else {
                Serial.println("Erro ao analisar a resposta do servidor.");
            }
        } else {
            Serial.println("Erro ao enviar temperatura. Código HTTP: " + String(httpResponseCode));
        }
        
        http.end();
    } else {
        Serial.println("WiFi desconectado");
    }
}

void obterConfiguracoesTemperatura() {
    if (WiFi.status() == WL_CONNECTED) {
        http.begin(wifiClient, String(serverUrl) + "/temperatura/settings");  // Usa WiFiClient com a URL

        int httpResponseCode = http.GET();

        if (httpResponseCode > 0) {
            String resposta = http.getString();
            Serial.println("Configurações recebidas: " + resposta);

            // Extrair minTemperatura e maxTemperatura da resposta JSON
            DynamicJsonDocument doc(1024);
            deserializeJson(doc, resposta);
            minTemperatura = doc["minTemperatura"];
            maxTemperatura = doc["maxTemperatura"];

        } else {
            Serial.println("Erro ao obter configurações. Código HTTP: " + String(httpResponseCode));
        }

        http.end();
    } else {
        Serial.println("WiFi desconectado");
    }
}