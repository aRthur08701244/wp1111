const name2abbre = {"黃鐘揚":"鐘揚", "李彥儒":"彥儒", "陳孟宏":"孟宏", "yl h":"yl", "劉慕德 /Joshua Lau":"慕德"}
const abbre2name = {}
for (i in name2abbre){
    abbre2name[name2abbre[i]] = i}
const headColor = ["#A9A9F0", "#E0DD7E", "#AD5339", "#95AE52", "#383736"]
const participantID = ['participant-0', 'participant-1', 'participant-2', 'participant-3', 'participant-4']



let bodyNode = document.getElementsByTagName('body')[0]
bodyNode.innerHTML = `
<div id="root", class="google-meet__root">
    <div class="google-meet__main">
        <section class="google-meet__pinned" id="myself">
            <img class="participant__out" src="./img/close.png" style="opacity:0%" />
            <div>
                <span class="pinned__text">你</span>
                <img class="pinned__icon" id="root_img-pin" src="./img/pin.png" alt="pin" />
            </div>
            <div class="pinned__head"> 
                <div>鐘揚</div>
                <div class="pinned__head__hover" onclick="expand()">
                    <img class="hover-0" src="./img/unpin.png" />
                    <img class="hover-1" src="./img/four-squares.png" />
                    <img class="hover-2" src="./img/two-arrows.png" />
                </div>
            </div>
            <img class="pinned__icon" id="root_img-microphone" src="./img/microphone-mute.png" alt="micro-muted" />
        </section>
        <section class="google-meet__side">
            <div class="side__participant" id="participant-0">
                <img class="participant__out" src="./img/close.png" onclick="kickOut('participant-0')" />
                <span class="participant__name">李彥儒</span>
                <div class="participant__head">
                    <div>彥儒</div>
                    <div class="participant__head__hover" onclick="toPin('participant-0')">
                        <img class="hover-3" src="./img/unpin.png" />
                        <img class="hover-4" src="./img/four-squares.png" />
                        <img class="hover-5" src="./img/two-arrows.png" />
                    </div>
                </div>
                <img class="participant__microphone" src="./img/microphone-mute.png" alt="micro-muted" />
            </div>
            <div class="side__participant" id="participant-1">
                <img class="participant__out" src="./img/close.png" onclick="kickOut('participant-1')" />
                <span class="participant__name">陳孟宏</span>
                <div class="participant__head">
                    <div>孟宏</div>
                    <div class="participant__head__hover" onclick="toPin('participant-1')">
                        <img class="hover-3" src="./img/unpin.png" />
                        <img class="hover-4" src="./img/four-squares.png" />
                        <img class="hover-5" src="./img/two-arrows.png" />
                    </div>
                </div>
                <img class="participant__microphone" src="./img/microphone-mute.png" alt="micro-muted" />
            </div>
            <div class="side__participant" id="participant-2">
                <img class="participant__out" src="./img/close.png" onclick="kickOut('participant-2')" />
                <span class="participant__name">yl h</span>
                <div class="participant__head">
                    <div>yl</div>
                    <div class="participant__head__hover" onclick="toPin('participant-2')">
                        <img class="hover-3" src="./img/unpin.png" />
                        <img class="hover-4" src="./img/four-squares.png" />
                        <img class="hover-5" src="./img/two-arrows.png" />
                    </div>
                </div>
                <img class="participant__microphone" src="./img/microphone-mute.png" alt="micro-muted" />
            </div>
            <div class="side__participant" id="participant-3">
                <img class="participant__out" src="./img/close.png" onclick="kickOut('participant-3')" />
                <span class="participant__name">劉慕德 / Joshua Lau</span>
                <div class="participant__head">
                    <div>慕德</div>
                    <div class="participant__head__hover" onclick="toPin('participant-3')">
                        <img class="hover-3" src="./img/unpin.png" />
                        <img class="hover-4" src="./img/four-squares.png" />
                        <img class="hover-5" src="./img/two-arrows.png" />
                    </div>
                </div>
                <img class="participant__microphone" src="./img/microphone-mute.png" alt="micro-muted" />
            </div>
            <div class="side__participant" id="participant-4">
                <img class="participant__out" src="./img/close.png" onclick="kickOut('participant-4')" />
                <span class="participant__name">童子瑜</span>
                <div class="participant__head">
                    <div>子瑜</div>
                    <div class="participant__head__hover" onclick="toPin('participant-4')">
                        <img class="hover-3" src="./img/unpin.png" />
                        <img class="hover-4" src="./img/four-squares.png" />
                        <img class="hover-5" src="./img/two-arrows.png" />
                    </div>
                </div>
                <img class="participant__microphone" src="./img/microphone-mute.png" alt="micro-muted" />
            </div>
        </section>
    </div>
    <footer class="google-meet__footer">
        <div class="footer__text"> <p>凌晨12:43 | Web Programming</p> </div>
        <div class="footer__function">
            <div class="footer__function__label" id="label-0">
                <div class="footer__function__hint" id="hint-0"> 開啟麥克風 </div>
                <div class="footer__function__button" id="func-0">
                    <img class="footer__function__icon" src="./img/microphone-mute.png" />
                </div>
            </div>

            <div class="footer__function__label" id="label-1">
                <div class="footer__function__hint" id="hint-1"> 開啟攝影機 </div>
                <div class="footer__function__button" id="func-1">
                    <img class="footer__function__icon" src="./img/no-video.png" />
                </div>
            </div>

            <div class="footer__function__label" id="label-2">
                <div class="footer__function__hint" id="hint-2"> 舉手 </div>
                <div class="footer__function__button" id="func-2">
                    <img class="footer__function__icon" src="./img/hand.png" />
                </div>
            </div>

            <div class="footer__function__label" id="label-3">
                <div class="footer__function__hint" id="hint-3"> 分享螢幕 </div>
                <div class="footer__function__button" id="func-3">
                    <img class="footer__function__icon" src="./img/present.png" />
                </div>
            </div>

            <div class="footer__function__label" id="label-4">
                <div class="footer__function__hint" id="hint-4"> 更多選項 </div>
                <div class="footer__function__button" id="func-4">
                    <img class="footer__function__icon" src="./img/more.png" />
                </div>
            </div>

            <div class="footer__function__label" id="label-5">
                <div class="footer__function__hint" id="hint-5"> 退出通話 </div>
                <div class="footer__function__button" id="func-5">
                    <img class="footer__function__icon" src="./img/telephone.png" />
                </div>
            </div>
        </div>
        <div class="footer__info">
            <img class="footer__info__icon" id="info-0" src="./img/info.png" />
            <img class="footer__info__icon" id="info-1" src="./img/team.png" />
            <img class="footer__info__icon" id="info-2" src="./img/comment.png" />
            <img class="footer__info__icon" id="info-3" src="./img/shapes.png" />
            <img class="footer__info__icon" id="info-4" src="./img/lock.png" />
        </div>
    </footer>
</div>
`


// Pinned HTML Template
let pinHTMLTemplate = document.getElementsByClassName("google-meet__pinned")[0].innerHTML

// Side HTML Template
let sideHTMLTemplate = document.getElementsByClassName("side__participant")[0].innerHTML

// Onclick Functions

function refreshInput() {
    // 處理「我」的點擊功能
    try {
        let funcNode0 = document.getElementById("myself").getElementsByClassName("pinned__head__hover")[0]
        funcNode0.onclick = function tmp() {toPin(this.parentNode.parentNode.id)}
    }
    catch (e) {}
    try {
        let funcNode0 = document.getElementById("myself").getElementsByClassName("participant__head__hover")[0]
        funcNode0.onclick = function tmp() {toPin(this.parentNode.parentNode.id)}
    }
    catch (e) {}

    // 處理「其他參與者」的點擊功能
    for (var i=0; i<participantID.length; i++){
        try {
            let funcNode1 = document.getElementById(participantID[i]).children[0]
            funcNode1.onclick = function tmp() {kickOut(this)}
        }
        catch (e) {}
        try {
            let funcNode1 = document.getElementById(participantID[i]).children[0]
            try {
                let funcNode2 = funcNode1.parentNode.getElementsByClassName("participant__head__hover")[0]
                funcNode2.onclick = function tmp() {toPin(this.parentNode.parentNode.id)}
            }
            catch (e) {
                let funcNode2 = funcNode1.parentNode.getElementsByClassName("pinned__head__hover")[0]
                funcNode2.onclick = function tmp() {expand()}
            }
            
        }   
        catch (e) {}
    }

    // 處理「被釘選」的點擊功能
    try {
        let funcNode0 = document.getElementsByClassName("pinned__head__hover")[0]
        funcNode0.onclick = function tmp() {expand()}
    }
    catch (e) {}

    let num_otherParticipant = 0
    for (var i=0; i<participantID.length; i++){
        if (document.getElementById(participantID[i]) != null) {
            num_otherParticipant = num_otherParticipant + 1
        }
    }
    if (num_otherParticipant == 0){
        let mainNode = document.getElementsByClassName("google-meet__main")[0]
        mainNode.removeChild(document.getElementsByClassName('google-meet__side')[0])

        if (document.getElementsByClassName("google-meet__pinned").length == 0) {
            // 新增node之外包裝
            let newPinNode = document.createElement("section")
            newPinNode.className = "google-meet__pinned"
            newPinNode.id = 'myself'
            // 新增node之內包裝
            newPinNode.innerHTML = pinHTMLTemplate
            mainNode.appendChild(newPinNode)
        }
        document.getElementsByClassName('google-meet__pinned')[0].style.width = '100%'
        document.getElementsByClassName('google-meet__pinned')[0].style.height = '100%'
    }

}
refreshInput()


// All Kinds of Functions

function kickOut(kickOutNode) {
    // if (kickOutNode.parentNode.className=="google-meet__pinned"){console.log("google-meet__pinned")}
    // else if (kickOutNode.parentNode.className=="side__participant"){console.log("side__participant")}
    kickOutNode.parentNode.parentNode.removeChild(kickOutNode.parentNode)
    if (kickOutNode.parentNode.className == "google-meet__pinned"){
        // 擴大Side Section
        let sideNode = document.querySelectorAll(".google-meet__side")[0]
        sideNode.style.width = '100%'

        // 更改Side Section icon格式
        let sideParticipantNode = document.querySelectorAll(".side__participant")
        for (var i=0; i<sideParticipantNode.length; i++){
            sideParticipantNode[i].className = "side__participant__expand"
        }

        let participantHeadNode = document.querySelectorAll(".participant__head")
        for (var i=0; i<participantHeadNode.length; i++){
            participantHeadNode[i].classList.add("participant__head__expand")
        }

        let participantMicroNode = document.querySelectorAll(".participant__microphone")
        for (var i=0; i<participantMicroNode.length; i++){
            participantMicroNode[i].classList.add("participant__microphone__expand")
        }
    }

    refreshInput()
    
}

function toSide() {
    // 抓取原PinnedHead資訊
    let pinnedNode = document.getElementsByClassName("google-meet__pinned")[0]
    let pinID = pinnedNode.id
    let pinName = pinnedNode.children[1].children[0].textContent

    let pinnedHeadNode = document.getElementsByClassName("pinned__head")[0]
    let headAbbre = pinnedHeadNode.children[0].textContent
    let headColor = pinnedHeadNode.style.background

    let sideNode = document.getElementsByClassName("google-meet__side")[0]
    // 新增node之外包裝
    let newParticipantNode = document.createElement("div")
    newParticipantNode.className = "side__participant"
    newParticipantNode.id = pinID
    // 新增node之內包裝
    newParticipantNode.innerHTML = sideHTMLTemplate
    // 更改node之內包裝
    newParticipantNode.children[1].textContent = pinName
    newParticipantNode.children[2].style.background = headColor
    newParticipantNode.children[2].children[0].textContent = headAbbre
    // if (pinName == "你") {newParticipantNode.removeChild(newParticipantNode.children[0])}
    if (pinName == "你") {newParticipantNode.children[0].style.opacity = "0%"}
    if (pinName != "你") {newParticipantNode.children[0].style.opacity = "100%"}
    // 新增node
    sideNode.appendChild(newParticipantNode)

    refreshInput()

}

function toPin(toPinID) {

    if (document.getElementsByClassName("google-meet__pinned").length > 0) {expand()}

    // 抓取原SideHead資訊
    let toPinNode = document.getElementById(toPinID)
    // let toPinID = toPinNode.id
    let toPinName = toPinNode.children[1].textContent
    let toPinAbbre = toPinNode.children[2].children[0].textContent
    let toPinColor = toPinNode.children[2].style.background

    let mainNode = document.getElementsByClassName("google-meet__main")[0]
    // 新增node之外包裝
    let newPinNode = document.createElement("section")
    newPinNode.className = "google-meet__pinned"
    newPinNode.id = toPinID
    // 新增node之內包裝
    newPinNode.innerHTML = pinHTMLTemplate
    // 更改node之內包裝
    newPinNode.children[1].children[0].textContent = toPinName
    newPinNode.children[3].style.background = toPinColor
    newPinNode.children[2].children[0].textContent = toPinAbbre
    // if (toPinName != "你") {newPinNode.appendChild(toPinNode.children[0])}  
    if (toPinName != "你") {newPinNode.children[0].style.opacity = "100%"}
    if (toPinName == "你") {newPinNode.children[0].style.opacity = "0%"}  
    pin()
    mainNode.insertBefore(newPinNode, mainNode.firstChild)
    
    // // 刪除toPinNode
    toPinNode.parentNode.removeChild(toPinNode)

    refreshInput()

}

function expand() {

    toSide()

    // 刪掉Pin Section
    let mainNode = document.getElementsByClassName("google-meet__main")[0]
    let pinnedNode = document.getElementsByClassName("google-meet__pinned")[0]
    mainNode.removeChild(pinnedNode)

    // 擴大Side Section
    let sideNode = document.querySelectorAll(".google-meet__side")[0]
    sideNode.style.width = '100%'

    // 更改Side Section icon格式
    let sideParticipantNode = document.querySelectorAll(".side__participant")
    for (var i=0; i<sideParticipantNode.length; i++){
        sideParticipantNode[i].className = "side__participant__expand"
    }

    let participantHeadNode = document.querySelectorAll(".participant__head")
    for (var i=0; i<participantHeadNode.length; i++){
        participantHeadNode[i].classList.add("participant__head__expand")
    }

    let participantMicroNode = document.querySelectorAll(".participant__microphone")
    for (var i=0; i<participantMicroNode.length; i++){
        participantMicroNode[i].classList.add("participant__microphone__expand")
    }

    refreshInput()

}

function pin() {
    let sideNode = document.querySelectorAll(".google-meet__side")[0]
    sideNode.style.width = '30%'

    // 更改Side Section icon格式
    let sideParticipantNode = document.querySelectorAll(".side__participant__expand")
    for (var i=0; i<sideParticipantNode.length; i++){
        sideParticipantNode[i].className = "side__participant"
    }

    let participantHeadNode = document.querySelectorAll(".participant__head__expand")
    for (var i=0; i<participantHeadNode.length; i++){
        participantHeadNode[i].classList.remove("participant__head__expand")
    }

    let participantMicroNode = document.querySelectorAll(".participant__microphone__expand")
    for (var i=0; i<participantMicroNode.length; i++){
        participantMicroNode[i].classList.remove("participant__microphone__expand")
    }

    refreshInput()

}