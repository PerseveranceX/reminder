(async () => {
    if ("serviceWorker" in navigator) {
        try {
            const myWorker = await navigator.serviceWorker.register("worker.js");
            if (Notification.permission == "granted") {
                if (document.getElementById('enable-btn') != null)
                    button.remove();
                myWorker.active.postMessage("start");
            } else {
                let button = document.createElement('div');
                button.id = 'enable-btn';
                button.innerText = 'Enable notifications';
                document.body.append(button);
                button.addEventListener('click', request(myWorker));
            }

        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    } else {
        console.log("Service Worker is not supported in your browser!");
        alert("Service Worker is not supported in your browser!");
    }
})();

function request(worker) {
    if (Notification.permission != "granted") {
        Notification.requestPermission().then((permission) => {
            let button = document.querySelector("#enable-btn");
            if (permission == "granted") {
                if (button != null)
                    button.remove();
                worker.active.postMessage("start");
            } else {
                let notify = document.createElement("div");
                notify.innerText = "Notifications are blocked!";
                notify.id = "notify";
                button.append(notify);
            }
        });
    }
}

onmessage = (e) => {
    console.log(e);
}

