/*
 * @Author: fremember
 * @Date: 2021-06-29 18:24:19
 * @Description: 仪表盘
 */
const PIDEG = Math.PI / 180
export function Panel (options) {
    let properties = {
        tick_length: 80,
        large_tick_length: 110,
        tick_thickness: 6,
        tick_group_length: 9,
        ticks_groups_begin: 0,
        total_degrees: 240,
        tick_color: "#555962",
        tick_on_color: "#527d98",
        on_color_gradient: null,
        bg_color: null,
        panel_scale: 1,
        animation_duration: 550,
        total_tick: 101,
        show_num: true,
        show_center_num: true,
        center_font_size: 200,
        center_font_color: '#555962',
        cur_score_circle_color: '#555962',
        center_offset: {
            x: 0,
            y: 0
        },
        center_num_font_family: 'HanHei SC, PingFang SC, Arial, sans-serif',
        num_gap: 1,
        num_begin: 0,
        num_font_size: 16,
        tickmask_offset: 0,
        num_font_family: 'HanHei SC, PingFang SC, Arial, sans-serif',
        circle_radius: 5,
        circle_offset: 0,
        center_text_unit: '分',
        center_text_offset: {
            x: 16,
            y: 8
        }
    }
    this.mergeOptions(properties, options)
    this._canvas = options.canvas
    this.canvas = document.createElement('canvas')
    this.canvas.width = this._canvas.width
    this.canvas.height = this._canvas.height
    this.delatLength = this.large_tick_length - this.tick_length
    this.context = this.canvas.getContext('2d')
    this._context = this._canvas.getContext('2d')
    this._percent = options.percent || 0
    this._target_percent = this._percent
    this.tickmask_offset = this.getTickMarkOffset(this.tickmask_offset)
    this._halfCanvasWidth = this.canvas.width / 2
    this._halfCanvasHeight = this.canvas.height / 2
    this._rotation_deg = this.getRotationDeg()
    return this
}
// 初始化配置项
Panel.prototype.mergeOptions = function (defaultOpt, options) {
    let _this = this
    this._property_list = Object.keys(defaultOpt)
    this._property_list.forEach(key => {
        _this[key] = typeof options[key] === 'undefined' ? defaultOpt[key] : options[key]
    })
}
Panel.prototype.getTickMarkOffset = function () {
    return this.tickmask_offset + this.circle_radius * 2 + this.circle_offset
}
Panel.prototype.getRotationDeg = function () {
    return this.total_degrees / (this.total_tick - 1) * PIDEG;
}
Panel.prototype.render = function (percent) {
    if (percent) {
        this._percent = percent
    }
    let canvas = this.canvas,
        context = this.context;
    context.save()
    this._prepareStage()
    let num_ticks = this.total_tick,
        starting_deg = (180 - this.total_degrees) / 2;
    context.rotate(starting_deg * PIDEG)
    this._drawScoreTipCircle(this._halfCanvasWidth - this.circle_radius, this.circle_radius, 0)

    for(let i = 0; i <= num_ticks; i++) {
        let is_on = (((i - 1) / num_ticks) * 100 < this._percent),
            _isLargeTick = this._isLargeTick(i),
            rect_scale = _isLargeTick ? this.large_tick_scale : 1,
            tick_length = _isLargeTick ? this.large_tick_length : this.tick_length,
            color = this._getTickColor(is_on, i);
        context.fillStyle = color
        if (_isLargeTick) {
            context.fillRect(-1 * this._halfCanvasWidth + this.circle_radius * 2 + this.circle_offset, -this.tick_thickness / 2, tick_length, this.tick_thickness)
            if (this.show_num) {
                this._drawPanelNum(tick_length, i)
            }
        } else {
            context.fillRect(-1 * this._halfCanvasWidth + this.circle_radius * 2 + this.circle_offset + this.delatLength, -this.tick_thickness / 2, tick_length, this.tick_thickness)
        }
        context.rotate(this._rotation_deg)
    }

    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
    this._context.drawImage(this.canvas, 0, 0)
    context.restore()
}



Panel.prototype.setTickOnColor = function (option) {
    this.tick_on_color = option.tick_on_color || this.tick_on_color
    this.on_color_gradient = option.on_color_gradient || null
    this.center_font_color = option.center_font_color || this.tick_on_color
    this.cur_score_circle_color = option.cur_score_circle_color || this.cur_score_circle_color || this.tick_on_color
}
Panel.prototype.setAnimaDur = function (duration) {
    this.animation_duration = duration
}

Panel.prototype.updatePercent = function (percent, options) {
    if(percent - 0.1 < 0) {
        return
    }
    let _this = this,
        _options = options || {};
    this._target_percent = percent
    let duration = ('animation_duration' in _options) ? _options.animation_duration : _this.animation_duration
    if (duration) {
        let lastUpdate = +new Date(),
            start = this._percent,
            end = this._target_percent,
            change_per_ms = (end - start) / duration,
            increasing = change_per_ms > 0 ? 1 : 0;
        this.colorArray = this._gradientColorArray();
        let update = function () {
            let now = +new Date(),
                elapsed = now - lastUpdate;
            _this._percent += elapsed * change_per_ms
            lastUpdate = now
            if ((increasing && _this._percent < _this._target_percent) || (!increasing && _this._percent > _this._target_percent)) {
                _this.render()
                _this._requestAnimFrame(update)
            } else {
                _this._percent = _this._target_percent
                _this.render()
            }
        }
        _this._requestAnimFrame(update)
    } else {
        _this._percent = percent
        _this.render()
    }
}

Panel.prototype._requestAnimFrame = function (f) {
    let anim = window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.oRequestAnimationFrame
        || window.msRequestAnimationFrame
        || function (callback, element) {
            window.setTimeout(function () {
                callback(+new Date)
            }, 1000 / 60)
        };
    anim(f)
}


// 设置背景
Panel.prototype._applyBG = function () {
    let canvas = this.canvas,
        context = this.context;
    if (this.bg_color) {
        context.save()
        context.fillStyle = this.bg_color
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.restore()
    }
}
// 初始化画布
Panel.prototype._prepareStage = function () {
    let canvas = this.canvas,
        context = this.context;
    context.clearRect(0, 0, canvas.width, canvas.height)
    this._applyBG()
    // 重置画布中心到中下位置
    context.translate(this._halfCanvasWidth, this._halfCanvasHeight - this.tick_thickness / 2)
    // 设置绘制内容的缩放
    context.scale(this.panel_scale, this.panel_scale)
    // 绘制中间的数字
    if (this.show_center_num) {
        this._drawCenterNum()
    }
}
Panel.prototype._gradientColorArray = function () {
    let colorArray = []
    if (!this.on_color_gradient || !this._target_percent) {
        return
    }
    for (let i = 0; i < this.on_color_gradient.length - 1; i++) {
        let next = this.on_color_gradient[i + 1],
            cur = this.on_color_gradient[i],
            colorStep = (next.percent - cur.percent) / 100 * this.total_tick;
        colorArray = colorArray.concat(new gradientColor(cur.color, next.color, colorStep))
    }
    return colorArray
}
Panel.prototype._getTickColor = function (is_on, index) {
    let _index = index < 1 ? 1 : index
    if (is_on) {
        if (this.colorArray && this.colorArray.length > 0) {
            return this.colorArray[_index - 1]
        } else {
            return this.tick_on_color
        }
    } else {
        return this.tick_color
    }
}
Panel.prototype._isLargeTick = function (currentNum) {
    return (currentNum + this.ticks_groups_begin - 1) % (this.tick_group_length + 1) === 0
};
Panel.prototype._drawScoreTipCircle = function (beginX, beginY) {
    let context = this.context,
        is_on = this._percent > 0.01;
    context.save()
    context.fillStyle = this._percent > 0.01 ? this.cur_score_circle_color : this.tick_color
    context.rotate(this._percent * this.total_degrees / 100 * PIDEG)
    context.beginPath()
    context.arc(-beginX, -beginY, this.circle_radius, 0, Math.PI * 2, true)
    context.closePath()
    context.fill()
    context.restore()
}
// 绘制中间的数字
Panel.prototype._drawCenterNum = function () {
    let canvas = this.canvas,
        context = this.context,
        fillColor = this.center_font_color ? this.center_font_color.split('-') : [this.tick_on_color],
        centerText = Math.floor(this._percent * ((this.total_tick - 1) * this.num_gap + this.num_begin) / 100),
        panelWidth = this.canvas.width / 2 - this.circle_radius * 2 - this.circle_offset - this.large_tick_length - this.tickmask_offset;
    context.save()
    if(fillColor.length == 2) {// 渐变色处理
        let gradient = context.createLinearGradient(-panelWidth, 0, panelWidth, 0)
        gradient.addColorStop('0', fillColor[0])
        gradient.addColorStop('0.7', fillColor[1])
        gradient.addColorStop('1', fillColor[1])
        context.fillStyle = gradient
    } else {// 纯色处理
        context.fillStyle = fillColor[0]
    }
    context.font = `${this.center_font_size}px ${this.center_num_font_family}`
    context.textAlign = 'center'
    context.textBaseline = 'middle'

    let centerTextWidth = Math.floor(context.measureText(centerText).width)

    context.fillText(centerText, this.center_offset.x, this.center_offset.y)
    context.font = '30px ' + this.num_font_family
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(this.center_text_unit, centerTextWidth / 2 + this.center_text_offset.x, this.center_text_offset.y)
    context.restore()
}
Panel.prototype._drawPanelNum = function (tick_length, tickIndex) {
    let canvas = this.canvas,
        context = this.context,
        text = this.num_begin + this.num_gap * tickIndex - 1,
        textWidth = context.measureText(text).width;
    context.save()
    context.translate(-1 * this._halfCanvasWidth + tick_length + this.circle_radius * 2 + this.circle_offset + this.num_font_size / 2, -this.tick_thickness / 2)
    context.rotate(-90 * PIDEG)
    context.font = this.num_font_size + 'px ' + this.num_font_family
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(text, 0, this.tickmask_offset)
    context.restore()
};

// 渐变
function gradientColor(startColor, endColor, step) {
    let startRGB = this.colorRgb(startColor),
        startR = startRGB[0],
        startG = startRGB[1],
        startB = startRGB[2],
        endRGB = this.colorRgb(endColor),
        endR = endRGB[0],
        endG = endRGB[1],
        endB = endRGB[2],
        sR = (endR - startR) / step,//总差值
        sG = (endG - startG) / step,
        sB = (endB - startB) / step,
        colorArr = [];
    for(let i = 0; i < step; i++) {
        // 计算每一步的hex值
        let hex = this.colorHex(`rgba(${parseInt((sR * i + startR))}, ${parseInt((sG * i + startG))}, ${parseInt((sB * i + startB))})`)
        colorArr.push(hex)
    }
    return colorArr
}
// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
gradientColor.prototype.colorRgb = function (sColor) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,
        _sColor = sColor.toLowerCase();
    if (_sColor && reg.test(_sColor)) {
        if (_sColor.length === 4) {
            let sColorNew = '#'
            for (let i = 1; i < 4; i += 1) {
                sColorNew += _sColor.slice(i, i + 1).concat(_sColor.slice(i, i + 1))
            }
            _sColor = sColorNew
        }
        //处理六位的颜色值
        let sColorChange = []
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt('0x' + _sColor.slice(i, i + 2)))
        }
        return sColorChange
    } else {
        return _sColor
    }
}

// 将rgb表示方式转换为hex表示方式
gradientColor.prototype.colorHex = function (rgb) {
    let _this = rgb,
        reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
        let aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, '').split(','),
            strHex = '#';
        for (let i = 0; i < aColor.length; i++) {
            let hex = Number(aColor[i]).toString(16)
            hex = hex < 10 ? 0 + '' + hex : hex// 保证每个rgb的值为2位
            if (hex === '0') {
                hex += hex
            }
            strHex += hex
        }
        if (strHex.length !== 7) {
            strHex = _this
        }
        return strHex
    } else if (reg.test(_this)) {
        let aNum = _this.replace(/#/, '').split('')
        if (aNum.length === 6) {
            return _this
        } else if (aNum.length === 3) {
            let numHex = '#'
            for (let i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i])
            }
            return numHex
        }
    } else {
        return _this
    }
}