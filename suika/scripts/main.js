// 모듈 불러오기
import { FRUITS } from "./fruits.js";

var Engine  = Matter.Engine, 
    Render  = Matter.Render, 
    Runner  = Matter.Runner, 
    Bodies  = Matter.Bodies, 
    World   = Matter.World,
    Body = Matter.Body,
    Events = Matter.Events;

// 선언
const engine = Engine.create();
const render = Render.create({
    engine,
    element: document.body,
    options: {
        wireframes: false,
        background: '#EF88BE',
        width: 620,
        height: 850,
    }
});
const world = engine.world;

// 벽 생성
const leftWall = Bodies.rectangle(15, 395, 30, 790, {
    isStatic: true,
    render: { fillStyle: '#EA3680' }
})
const rightWall = Bodies.rectangle(605, 395, 30, 790, {
    isStatic: true,
    render: { fillStyle: '#EA3680' }
})
const ground = Bodies.rectangle(310, 820, 620, 60, {
    isStatic: true,
    render: { fillStyle: '#EA3680' }
})
const topLine = Bodies.rectangle(310, 150, 620, 2, {
    name: "topLine",
    isStatic: true,
    isSensor: true,
    render: { fillStyle: '#EA3680' }
})

World.add(world, [leftWall, rightWall, ground, topLine]);

Render.run(render);
Runner.run(engine);

// 현재 과일 값을 저장하는 변수
let currentBody = null;
let currentFruit = null;
let disableAction = false;

// 과일을 추가하는 함수
function addFruits(){
    const index = Math.floor(Math.random() * 5);
    const fruits = FRUITS[index];

    const body = Bodies.circle(300, 50, fruits.radius, 
        {
            index: index,
            isSleeping: true,
            render:{
                sprite: {texture: `${fruits.name}.png`}
            },
            restitution: 0.6,
        });

    // 현재 과일 값 저장
    currentBody = body;
    currentFruit = fruits;
    // 월드에 배치
    World.add(world, body);
}

// 카보드 입력 받기
window.onkeydown = (event) => {

    if(disableAction) return;

    switch(event.code){
        case "KeyA":
            if(currentBody.position.x - currentFruit.radius > 30){
                Body.setPosition(currentBody, {
                    x: currentBody.position.x - 10,
                    y: currentBody.position.y
                })
            }
            break;
        case 'KeyD':
            if(currentBody.position.x + currentFruit.radius < 590){
                Body.setPosition(currentBody, {
                    x: currentBody.position.x + 10,
                    y: currentBody.position.y
                })
            }
            break;
        case 'Space':
            currentBody.isSleeping = false;
            disableAction = true;
            // 지연시키는 함수
            setTimeout(() => {
                addFruits();
                disableAction = false;
            }, 200);
            break;
    }
}

Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach((collision) => {
        // 같은 과일일 경우
        if(collision.bodyA.index == collision.bodyB.index){
            const index = collision.bodyA.index;
            if(index == FRUITS.length - 1) return;
            World.remove(world, [collision.bodyA, collision.bodyB]);
            const newFruit = FRUITS[index + 1];
            const newBody = Bodies.circle
            (
                collision.collision.supports[0].x, 
                collision.collision.supports[0].y, 
                newFruit.radius,
                {
                    index: index + 1,
                    render:{ sprite: {texture: `${newFruit.name}.png`}},
                }
            );
            World.add(world, newBody);
        }

        // 게임 종료 조건 이벤트 생성
        if(!disableAction && collision.bodyA.name === "topLine" || collision.bodyB.name === "topLine"){
            alert("GameOver!");
            disableAction = true;
        }
    })
});

addFruits();
