// Siber-Punk Ajan Modu - iPhone 8 ve Android için

// Firebase yapılandırması
const firebaseConfig = {
    apiKey: "AIzaSyD3X5Y7Z9C1V3B5N7M9K1L3J5H7G9F1D3",
    authDomain: "siber-punk-komuta.firebaseapp.com",
    databaseURL: "https://siber-punk-komuta-default-rtdb.firebaseio.com",
    projectId: "siber-punk-komuta",
    storageBucket: "siber-punk-komuta.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef1234567890"
};

// Firebase başlat
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Cihaz verilerini Firebase'e gönder
function sendDeviceData() {
    // Jiroskop verileri
    window.addEventListener('deviceorientation', (event) => {
        const alpha = event.alpha;
        const beta = event.beta;
        const gamma = event.gamma;
        
        database.ref('deviceData').push({
            type: 'gyroscope',
            alpha: alpha,
            beta: beta,
            gamma: gamma,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    });
    
    // Pil durumu
    navigator.getBattery().then((battery) => {
        battery.addEventListener('levelchange', () => {
            database.ref('deviceData').push({
                type: 'battery',
                level: battery.level,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            });
        });
    });
    
    // Depolama durumu
    if (navigator.storage && navigator.storage.estimate) {
        navigator.storage.estimate().then((storage) => {
            database.ref('deviceData').push({
                type: 'storage',
                used: storage.usage,
                quota: storage.quota,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            });
        });
    }
}

// Komutları dinle
function listenForCommands() {
    database.ref('commands').on('child_added', (snapshot) => {
        const command = snapshot.val().command;
        
        // Komuta göre işlem yap
        if (command === 'alert') {
            showAlert();
        } else if (command === 'lock') {
            lockScreen();
        } else if (command === 'wipe') {
            wipeData();
        }
    });
}

// Siber uyarı göster
function showAlert() {
    const alertDiv = document.createElement('div');
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '0';
    alertDiv.style.left = '0';
    alertDiv.style.width = '100%';
    alertDiv.style.height = '100%';
    alertDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    alertDiv.style.color = '#00ff00';
    alertDiv.style.display = 'flex';
    alertDiv.style.justifyContent = 'center';
    alertDiv.style.alignItems = 'center';
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = '<h1>SIYBER UYARI!</h1>';
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        document.body.removeChild(alertDiv);
    }, 5000);
}

// Ekranı kilitle
function lockScreen() {
    const lockDiv = document.createElement('div');
    lockDiv.style.position = 'fixed';
    lockDiv.style.top = '0';
    lockDiv.style.left = '0';
    lockDiv.style.width = '100%';
    lockDiv.style.height = '100%';
    lockDiv.style.backgroundColor = '#000';
    lockDiv.style.color = '#00ff00';
    lockDiv.style.display = 'flex';
    lockDiv.style.justifyContent = 'center';
    lockDiv.style.alignItems = 'center';
    lockDiv.style.zIndex = '9999';
    lockDiv.innerHTML = '<h1>EKRAN KİLİTLİ</h1>';
    
    document.body.appendChild(lockDiv);
}

// Verileri sil
function wipeData() {
    const wipeDiv = document.createElement('div');
    wipeDiv.style.position = 'fixed';
    wipeDiv.style.top = '0';
    wipeDiv.style.left = '0';
    wipeDiv.style.width = '100%';
    wipeDiv.style.height = '100%';
    wipeDiv.style.backgroundColor = '#000';
    wipeDiv.style.color = '#ff0000';
    wipeDiv.style.display = 'flex';
    wipeDiv.style.justifyContent = 'center';
    wipeDiv.style.alignItems = 'center';
    wipeDiv.style.zIndex = '9999';
    wipeDiv.innerHTML = '<h1>VERİLER SİLİNDİ!</h1>';
    
    document.body.appendChild(wipeDiv);
    
    setTimeout(() => {
        document.body.removeChild(wipeDiv);
    }, 5000);
}

// Ajan modunu başlat
function startAgentMode() {
    sendDeviceData();
    listenForCommands();
}

// Sayfa yüklendiğinde ajan modunu başlat
window.onload = function() {
    startAgentMode();
};
