const authparty_wsc = new WebSocket(`ws://calls.auth.party:3005`, "apvcProtocol")

authparty_wsc.main_send = authparty_wsc.send;
authparty_wsc.send = (obj)=>{
    authparty_wsc.main_send(
        JSON.stringify(obj),
    );
}

authparty_wsc.onopen = ()=>{
    const userAgent = navigator.userAgent;
    authparty_wsc.send({
        type: 'join',
        data: userAgent,
    })
}
console.log(`[+] Loaded Voice Calls (calls.auth.party)`);

authparty_wsc.onmessage = (msg) => {
    console.info(`[*] ${msg}`)
    switch(msg.data.split(":")[0]) {
        case "pause":
            document.querySelector('.video-stream').pause()
            break
        case "play":
            document.querySelector('.video-stream').play()
            break
        case "next":
            document.getElementsByClassName('ytp-next-button ytp-button')[0].click()
            break
        case "autorep":
            document.querySelector('.ytp-right-controls > button:nth-child(1)').click()
            // Show autorep status
            for(let j=0;j<2;j++)
                document.querySelector('.video-stream').click();
            break
        case "fullscreen":
            document.querySelector('.ytp-fullscreen-button').click()
            break
        case "voldown":
            document.querySelector('.video-stream').volume -= 0.050
            break
        case "volup":
            document.querySelector('.video-stream').volume += 0.050
            break
        case "welcome":
            console.info(`[+] Opened WebSocket (with ID: ${msg.data.split(':')[1]})`)
            break
        case "sendhtml":
            console.log(`sending`)
            authparty_wsc.send(`receivehtml<-apvc->${document.querySelector('ytd-item-section-renderer.ytd-watch-next-secondary-results-renderer').outerHTML}`)
            break
        case "goto":
            location.href = `${msg.data.split(':')[1]}`
        default:
            console.log("[-] Couldn't understand")
    }
}