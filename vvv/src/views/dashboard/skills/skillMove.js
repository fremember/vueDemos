/*
 * @Author: fremember
 * @Date: 2021-06-29 16:20:27
 * @Description: 动画
 */
let radius = 150,
    sa = 0,
    ca = 0,
    sb = 0,
    cb = 0,
    sc = 0,
    cc = 0,

    dtr = Math.PI / 180,
    d = 300,

    mcList = [],
    active = false,
    lasta = 1,
    lastb = 1,
    distr = true,
    tspeed = 2,
    size = 250,

    mouseX = 0,
    mouseY = 0,

    howElliptical = 1,

    aA = null,
    oDiv = null;
function sineCosine (a, b, c) {
    sa = Math.sin(a * dtr)
    ca = Math.cos(a * dtr)
    sb = Math.sin(b * dtr)
    cb = Math.cos(b * dtr)
    sc = Math.sin(c * dtr)
    cc = Math.cos(c * dtr)
}
// 随机生成位置
function positionAll () {
    let phi = 0,
        theta = 0,
        max = mcList.length,

        aTmp = [ ...aA ].sort(() => { return Math.random() < 0.5 ? 1 : -1 }),
        oFragment = document.createDocumentFragment();
    aTmp.forEach(tag => {
        oFragment.appendChild(tag)
    })
    oDiv.appendChild(oFragment)

    for (let i = 1; i < max + 1; i++) {
        if(distr) {
            phi = Math.acos(-1 + (2 * i - 1) / max)
            theta = Math.sqrt(max * Math.PI) * phi
        } else {
            phi = Math.random() * (Math.PI)
            theta = Math.random() * (2 * Math.PI)
        }

        mcList[i - 1].cx = radius * Math.cos(theta) * Math.sin(phi)
        mcList[i - 1].cy = radius * Math.sin(theta) * Math.sin(phi)
        mcList[i - 1].cz = radius * Math.cos(phi)
        
        if (aA[i - 1]) {
            aA[i - 1].style.left = mcList[i - 1].cx + oDiv.offsetWidth / 2 - mcList[i - 1].offsetWidth / 2 + 'px'
            aA[i - 1].style.top = mcList[i - 1].cy + oDiv.offsetHeight / 2 - mcList[i - 1].offsetHeight / 2 + 'px'
        }
    }
}
function update () {
    let a, b;
    if(active) {
        a = (-Math.min(Math.max(-mouseY, -size), size) / radius) * tspeed
        b = (Math.min(Math.max(-mouseX, -size), size) / radius) * tspeed
    } else {
        a = lasta * 0.98
        b = lastb * 0.98
    }
    lasta = a
    lastb = b
    if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
        return;
    }

    let c = 0
    sineCosine(a, b, c)

    for (let j = 0; j < mcList.length; j++) {
        let rx1 = mcList[j].cx,
            ry1 = mcList[j].cy * ca + mcList[j].cz * (-sa),
            rz1 = mcList[j].cy * sa + mcList[j].cz * ca,

            rx2 = rx1 * cb + rz1 * sb,
            ry2 = ry1,
            rz2 = rx1 * (-sb) + rz1 * cb,

            rx3 = rx2 * cc + ry2 * (-sc),
            ry3 = rx2 * sc + ry2 * cc,
            rz3 = rz2,
            per = 0;

        mcList[j].cx = rx3;
        mcList[j].cy = ry3;
        mcList[j].cz = rz3;

        per = d / (d + rz3);

        mcList[j].x = (howElliptical * rx3 * per) - (howElliptical * 2);
        mcList[j].y = ry3 * per;
        mcList[j].scale = per;
        mcList[j].alpha = per;

        mcList[j].alpha = (mcList[j].alpha - 0.6) * (10 / 6);
    }

    doPosition()
    depthSort()
}

function doPosition () {
    let l = oDiv.offsetWidth / 2,
        t = oDiv.offsetHeight / 2;
    for (var i = 0; i < mcList.length; i++) {
        if (aA[i]) {
            aA[i].style.left = mcList[i].cx + l - mcList[i].offsetWidth / 2 + 'px'
            aA[i].style.top = mcList[i].cy + t - mcList[i].offsetHeight / 2 + 'px'

            aA[i].style.fontSize = Math.ceil(12 * mcList[i].scale / 2) + 8 + 'px'

            aA[i].style.filter = "alpha(opacity=" + 100 * mcList[i].alpha + ")"
            aA[i].style.opacity = mcList[i].alpha
        }
    }
}

function depthSort() {
    let aTmp = []

    for (let i = 0; i < aA.length; i++) {
        aTmp.push(aA[i])
    }
    aTmp = aTmp.filter(item => item)
    aTmp.sort((vItem1, vItem2) => {
        if (vItem1.cz > vItem2.cz) {
            return -1
        } else if (vItem1.cz < vItem2.cz) {
            return 1
        } else {
            return 0
        }
    })

    for (let i = 0; i < aTmp.length; i++) {
        aTmp[i].style.zIndex = i
    }
}

export function mineMove(_oDiv, _aA) {
    let i = 0,
        oTag = null;
    aA = _aA
    oDiv = _oDiv
    mcList = []
    aA.forEach(tag => {
        oTag = {}
        oTag.offsetWidth = tag.offsetWidth
        oTag.offsetHeight = tag.offsetHeight
        mcList.push(oTag)
    })

    sineCosine(0, 0, 0)
    positionAll()


    oDiv.onmouseover = function () {
        active = true
    }

    oDiv.onmouseout = function () {
        active = false
    }

    oDiv.onmousemove = function (ev) {
        var oEvent = window.event || ev

        mouseX = oEvent.clientX - (oDiv.offsetLeft + oDiv.offsetWidth / 2)
        mouseY = oEvent.clientY - (oDiv.offsetTop + oDiv.offsetHeight / 2)
        // 修改速度
        mouseX /= 25
        mouseY /= 25
    }
    
    let timer = setInterval(() => {
        let _href = window.location.href
        if (_href.indexOf('/dashboard/index') >= 0) {
            update()
        } else {
            clearInterval(timer)
            timer = null
        }
    }, 30)
}