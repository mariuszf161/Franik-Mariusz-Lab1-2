window.onload = function(){
    let time = 0;
    let timeinterval;
    let gameinterval;
    let timeEl = document.querySelector('.time');
    let ball = document.querySelector('#ball');
    let hole = document.querySelector('.hole');
    let orientation = {x:0,y:0};

    document.querySelector('.start').addEventListener('click',function(e){
        // timer
        timeinterval = setInterval(function(e){
            time += 1;
            let sec = time % 60;
            let min = (time - time % 60) / 60;
            if(min < 10)
                timeEl.innerHTML = '0'+min+':';
            else
                timeEl.innerHTML = min+':';
            if(sec < 10)
                timeEl.innerHTML += '0'+sec;
            else
                timeEl.innerHTML += sec;
        }, 1000);

        // ruch pilki
        gameinterval = setInterval(function(){
            let left = Number(window.getComputedStyle(ball).left.split('px')[0])
            let top = Number(window.getComputedStyle(ball).top.split('px')[0])

            left += orientation.y/5;
            top += orientation.x/5;

            if(left>=1350||left<=200||top>=560||top<=162){
                return;
            }

            ball.style.top = top + 'px';
            ball.style.left = left + 'px';

            CheckDistance();
        },50);

        if(timeinterval>0)return;
        timeEl.innerHTML = '00:00';
    });

    // położenie sensora
    window.addEventListener('deviceorientation',function(e){
        orientation.x = e.beta;
        orientation.y = e.gamma;
    })

    // sprawdzanie odległości piłki od dziury
    function CheckDistance(){
        let ballX,ballY,holeX,holeY;
        ballX = Number(window.getComputedStyle(ball).top.split('px')[0])
        ballY = Number(window.getComputedStyle(ball).left.split('px')[0])
        holeX = Number(window.getComputedStyle(hole).top.split('px')[0])
        holeY = Number(window.getComputedStyle(hole).left.split('px')[0])

        let distance = Math.sqrt(Math.pow(ballX-holeX,2)+Math.pow(ballY-holeY,2));

        if(distance<10)
            win();
    }
    // Alert w wygranej
    function win(){
        clearInterval(timeinterval)
        clearInterval(gameinterval)
        timeinterval = 0;
        gameinterval = 0;
        time = 0;
        document.querySelector('.start').style.cursor = 'pointer';
        alert('Gratulacje! Spróbuj ponownie - tym razem szybciej :)');
        ball.style.top = '180px';
        ball.style.left = '215px';
    }
};