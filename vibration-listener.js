// vibration-listener.js
// Bu script, Firebase üzerinden vibration komutunu dinler ve telefonu titretsin

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

// Vibration komutunu dinle
function listenForVibration() {
    database.ref('commands').on('value', (snapshot) => {
        const command = snapshot.val();
        if (command === 'vibration') {
            // Telefonu titretsin
            navigator.vibrate([100, 50, 100]);
            // Komutu sıfırla
            database.ref('commands').set(null);
        }
    });
}

// Sayfa yüklendiğinde vibration dinleyicisini başlat
window.onload = listenForVibration;