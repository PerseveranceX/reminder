let iconNum = 1;

function remind() {
    if (iconNum > 5)
        iconNum = 1;
    registration.showNotification("Look at something +6 meters away, for +20 seconds.",
        {
            'icon': `eye-icon-${iconNum}.png`,
            'body': 'Do It Now!',
            'requireInteraction': 'true',
            'actions': [{ 'action': 'yes', 'title': 'Sure' }, { 'action': 'No', 'title': 'No, I\'m a lazy idiot!' }]
        });
    iconNum++;
    setTimeout(remind, 32000);
}

self.addEventListener("message", async (event) => {
    if (event.data == 'start') {
        remind();
        const windowClients = await clients.matchAll({ type: "window" });
        windowClients[0].postMessage('Send this message to window.navigator.serviceWorker.controller');
        //registration.active.postMessage("test");
    }
});

self.addEventListener("notificationclick", (event) => {
    console.log(event.action);
    //  event.notification.close();
});