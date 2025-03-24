// 모듈 불러오기
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
        background: '#F7F4C8',
        width: 620,
        height: 850,
    }
});
const world = engine.world;

// 벽 생성
const leftWall = Bodies.rectangle(15, 395, 30, 790, {
    isStatic: true,
    render: { fillStyle: '#E6B143' }
})
const rightWall = Bodies.rectangle(605, 395, 30, 790, {
    isStatic: true,
    render: { fillStyle: '#E6B143' }
})
const ground = Bodies.rectangle(310, 820, 620, 60, {
    isStatic: true,
    render: { fillStyle: '#E6B143' }
})
const topLine = Bodies.rectangle(310, 150, 620, 2, {
    isStatic: true,
    render: { fillStyle: '#E6B143' }
})

World.add(world, [leftWall, rightWall, ground, topLine]);

Render.run(render);
Runner.run(engine);
