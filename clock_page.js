function updateClock() {
    const actualTime = document.querySelector("input#wrong_clock").value;
    const clockText = document.querySelector("h2#clock_text");    
    if (actualTime == '') {
        const now = new Date();
        let hour = now.getHours();
        let min = now.getMinutes();
        let sec = now.getSeconds();

        function addLeadingZero(n) {
            let nOut = n.toString();
            if (nOut.length < 2) {
                return '0' + nOut;
            } else {
                return nOut;
            }
        }
        hour = addLeadingZero(hour)
        min = addLeadingZero(min)
        sec = addLeadingZero(sec)
        clockText.innerHTML = `${hour}:${min}:${sec}`;
    } else {
        clockText.innerHTML = `${actualTime.toString()}:00`
    }
    
}

function updateSectionHeight() {
    // Update container height according to its width
    const container = document.querySelector('section');
    const width = getComputedStyle(container).width;
    const numericWidth = parseFloat(width.match(/\d+/)[0]);
    container.style.height = `${numericWidth}px` //1.618
}


function updateTimeStyle () {
    function imgsrc(a_string) {
        return `<img src="img/${a_string}.png" alt="${a_string}">`
    }

    function setStyle(period_of_the_day) {
        // pexels - Free and Open Image Database
        const periodsOfTheDay = {
            'morning': {
                'msg': "It's morning", 
                'img': imgsrc('morning')},
            'lunch': {
                'msg': "It's lunch time",
                'img': imgsrc('lunch')},
            'afternoon': {
                'msg': "It's afternoon",
                'img': imgsrc('afternoon')},
            'sunset': {
                'msg': "It's sunset",
                'img': imgsrc('sunset')},
            'night': {
                'msg': "It's night",
                'img': imgsrc('night')},
        }
        const text = document.querySelector("div#time_msg")
        const img = document.querySelector("div.large")
        const body = document.querySelector('body')
        text.innerHTML = periodsOfTheDay[period_of_the_day].msg
        body.classList.add(period_of_the_day);
        console.log(body.classList)
        img.innerHTML = periodsOfTheDay[period_of_the_day].img
    }

    const clockText = document.querySelector("h2#clock_text").innerText; 
    const timeParts = clockText.split(':');

    const h = parseInt(timeParts[0]);
    const m = parseInt(timeParts[1]);
    const s = parseInt(timeParts[2]);
    const daytime = h + m/60 + s/3600;
    
    if (daytime >= 7 && daytime < 11) {
        setStyle('morning')
    } else if (daytime >= 11 && daytime < 13.5) {
        setStyle('lunch')
    } else if (daytime >= 13.5 && daytime < 17) {
        setStyle('afternoon')
    } else if (daytime >= 17 && daytime < 19) {
        setStyle('sunset')
    } else {
        setStyle('night')
    }

}

function load() {
    updateClock();
    updateTimeStyle();
}

//updateSectionHeight();
load();
setInterval(load, 1000);
