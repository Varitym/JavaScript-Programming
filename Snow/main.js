window.onload = function(){
    let canvas = document.getElementById("sky");
    let ctx = canvas.getContext("2d");
    let w = window.innerWidth;
    let h = window.innerHeight;

    canvas.height = h;
    canvas.width = w;

    let maxf = 500;
    let flakes = [];

    for(let i=0; i<maxf; i++){
        flakes.push({
            x: Math.random()*w,
            y: Math.random()*h,
            r: Math.random()*5+2,
            d: Math.random()+1,

        })
    }

    function drawFlakes(){
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "white";
        ctx.beginPath();
        for(let i= 0; i<maxf; i++){
            let f = flakes[i];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);

        }
        ctx.fill();
        moveFlakes();
    }

    let angle = 0;
    function moveFlakes(){
        angle += 0.01;
        for(let i=0; i < maxf; i++){
            let f = flakes[i];
            f.y += Math.pow(f.d, 2)+1;
            f.x += Math.sin(angle)*1;

            if(f.y>h){
                flakes[i] = {x: Math.random()*w, 
                            y: 0,
                            r: f.r,
                            d: f.d,
                            };
            }
        }
    }
    setInterval(drawFlakes, 25);

}