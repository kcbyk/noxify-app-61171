// vibration-listener.js
// Bu script, Firebase üzerinden vibration komutunu dinler ve telefonu titretsin

// Firebase yapılandırması
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Firebase başlat
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Vibration komutunu dinle
function listenForVibration() {
    database.ref('vibration').on('value', (snapshot) => {
        const vibration = snapshot.val();
        if (vibration) {
            // Telefonu titretsin
            navigator.vibrate([100, 50, 100]);
            // Vibration komutunu sıfırla
            database.ref('vibration').set(false);
        }
    });
}

// Sayfa yüklendiğinde vibration dinleyicisini başlat
window.onload = listenForVibration;