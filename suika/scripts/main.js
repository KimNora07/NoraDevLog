// 모듈 불러오기
import { FRUITS } from "./fruits.js";

var Engine  = Matter.Engine, 
    Render  = Matter.Render, 
    Runner  = Matter.Runner, 
    Bodies  = Matter.Bodies, 
    World   = Matter.World;

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
            restitution: 0.4,
        });

    // 현재 과일 값 저장
    currentBody = body;
    currentFruit = fruits;
    // 월드에 배치
    World.add(world, body);
}

addFruits();
