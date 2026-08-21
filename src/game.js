import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';
import { createKeyboardState } from './controls.js';

const raw = [
    '###############',
    '#S....#....L..#',
    '#.###.#L#####.#',
    '#...#.#....G#.#',
    '###.#.#####L#.#',
    '#...#.....#.L.#',
    '#.#.#####.#.#.#',
    '#.#...L...#.L.#',
    '#.#####.#####.#',
    '#.....#.....#.#',
    '#.###.#####.#.#',
    '#...#.......#.#',
    '###.#########.#',
    '#.L..........L#',
    '###############'
];

const grid = raw.map((row) => row.split(''));
const H = grid.length;
const W = grid[0].length;
const start = { x: 1.5, y: 1.5 };
const goal = { x: 11.5, y: 3.5 };
const player = { x: start.x, y: start.y, angle: 0 };
const words = ['key-runner'];

let unlocked = new Set();
let activeDoor = null;
let word = '';
let score = 0;
let time = 300;
let ended = false;
let timer;
let doorMeshes = [];
let renderer;
let scene;
let camera;
let mazeGroup;
let doorGroup;
let goalGroup;
let goalCore;
let avatarGroup;

const sceneElement = document.getElementById('scene');
const fallback = document.getElementById('fallback');
const mapElement = document.getElementById('map');
const typingElement = document.querySelector('.typing');
const input = document.getElementById('input');
const wordElement = document.getElementById('word');
const promptElement = document.getElementById('prompt');
const messageElement = document.getElementById('msg');
const coordinatesElement = document.getElementById('coords');
const keys = createKeyboardState();

function material(color, roughness = 0.7, metalness = 0) {
    return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

function doorId(x, y) {
    return `${Math.floor(y)},${Math.floor(x)}`;
}

function cell(x, y) {
    return grid[Math.floor(y)]?.[Math.floor(x)] || '#';
}

function blocked(x, y) {
    const value = cell(x, y);
    return value === '#' || (value === 'L' && !unlocked.has(doorId(x, y)));
}

function move(dx, dy) {
    if (!blocked(player.x + dx, player.y)) {
        player.x += dx;
    }
    if (!blocked(player.x, player.y + dy)) {
        player.y += dy;
    }
}

function moveRelative(distance) {
    move(Math.cos(player.angle) * distance, Math.sin(player.angle) * distance);
}

function buildDoor(x, y) {
    const group = new THREE.Group();
    group.position.set(x + 0.5, 0, y + 0.5);
    group.userData.id = doorId(x, y);

    const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x40182b,
        emissive: 0x8b183c,
        emissiveIntensity: 2.3,
        metalness: 0.5,
        roughness: 0.3
    });
    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.76, 2.65, 0.12), frameMaterial);
    panel.position.y = 1.35;
    group.add(panel);

    const left = new THREE.Mesh(new THREE.BoxGeometry(0.08, 3, 0.16), frameMaterial);
    const right = left.clone();
    left.position.set(-0.45, 1.5, 0);
    right.position.set(0.45, 1.5, 0);
    group.add(left, right);

    const lamp = new THREE.PointLight(0xff3d73, 2.8, 3);
    lamp.position.set(0, 2.7, 0.25);
    group.add(lamp);
    doorGroup.add(group);
    doorMeshes.push(group);
}

function buildMaze() {
    mazeGroup.clear();
    doorGroup.clear();
    doorMeshes = [];

    const floorMaterial = material(0x3a6978, 0.62, 0.22);
    const wallMaterial = material(0x0d1d32, 0.5, 0.7);
    const ceilingMaterial = material(0x060d18, 0.9);

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, H), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(W / 2, 0, H / 2);
    mazeGroup.add(floor);

    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(W, H), ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(W / 2, 3.7, H / 2);
    mazeGroup.add(ceiling);

    for (let y = 0; y < H; y += 1) {
        for (let x = 0; x < W; x += 1) {
            const value = grid[y][x];
            if (value === '#') {
                const wall = new THREE.Mesh(new THREE.BoxGeometry(0.9, 3.7, 0.9), wallMaterial);
                wall.position.set(x + 0.5, 1.85, y + 0.5);
                mazeGroup.add(wall);
                const strip = new THREE.Mesh(new THREE.BoxGeometry(0.025, 3.1, 0.025), new THREE.MeshBasicMaterial({ color: 0x39ddff }));
                strip.position.set(x + 0.5, 1.85, y + 0.02);
                mazeGroup.add(strip);
            }
            if (value === 'L') {
                buildDoor(x, y);
            }
        }
    }

    const lamps = [
        [-0.45, 0x42dfff],
        [W + 0.45, 0xff557d],
        [0, 0xff557d],
        [W, 0xffd166]
    ];
    lamps.forEach(([x, color]) => {
        const light = new THREE.PointLight(color, 2.4, 8);
        light.position.set(x, 2.6, H * 0.5);
        mazeGroup.add(light);
    });
}

function buildGoal() {
    goalGroup.clear();
    const gold = new THREE.MeshStandardMaterial({
        color: 0xffb52e,
        emissive: 0xff8c18,
        emissiveIntensity: 2.8,
        metalness: 0.35,
        roughness: 0.25
    });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.06, 10, 32), gold);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(goal.x, 0.2, goal.y);
    goalGroup.add(ring);

    goalCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.23, 1), gold);
    goalCore.position.set(goal.x, 1.2, goal.y);
    goalGroup.add(goalCore);

    const light = new THREE.PointLight(0xffb52e, 4, 5);
    light.position.set(goal.x, 1.3, goal.y);
    goalGroup.add(light);
}

function buildPlayerAvatar() {
    avatarGroup = new THREE.Group();
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x58e89a, emissive: 0x18a86b, emissiveIntensity: 1.8, metalness: 0.25, roughness: 0.3 });
    const visorMaterial = new THREE.MeshStandardMaterial({ color: 0x071c2d, emissive: 0x31d8ff, emissiveIntensity: 2.2, metalness: 0.55, roughness: 0.18 });
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.42, 4, 10), bodyMaterial);
    body.position.y = 0.55;
    avatarGroup.add(body);
    const visor = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 10), visorMaterial);
    visor.scale.set(1, 0.72, 0.62);
    visor.position.set(0.13, 0.91, 0);
    avatarGroup.add(visor);
    scene.add(avatarGroup);
}

function updatePlayer() {
    if (ended) {
        return;
    }
    if (!avatarGroup) {
        buildPlayerAvatar();
    }
    avatarGroup.visible = false;
    renderer.toneMappingExposure = 1.45;
    scene.fog.density = 0.026;
    const speed = (keys.ShiftLeft || keys.ShiftRight) ? 0.09 : 0.06;

    if (keys.KeyW || keys.ArrowUp) {
        moveRelative(speed);
    }
    if (keys.KeyA || keys.ArrowLeft) {
        player.angle -= 0.045;
    }
    if (keys.KeyD || keys.ArrowRight) {
        player.angle += 0.045;
    }

    camera.position.set(player.x, 1.18, player.y);
    camera.rotation.set(0, -player.angle - Math.PI / 2, 0);
    if (Math.hypot(player.x - goal.x, player.y - goal.y) < 0.5) {
        finish(true);
    }
}

function nearDoor() {
    let best = null;
    let bestDistance = 1;
    for (let y = 0; y < H; y += 1) {
        for (let x = 0; x < W; x += 1) {
            if (grid[y][x] !== 'L' || unlocked.has(doorId(x, y))) {
                continue;
            }
            const distance = Math.hypot(x + 0.5 - player.x, y + 0.5 - player.y);
            if (distance < bestDistance) {
                bestDistance = distance;
                best = { x, y, id: doorId(x, y) };
            }
        }
    }
    return best;
}

function updateDoorVisuals(now) {
    doorMeshes.forEach((door) => {
        door.visible = !unlocked.has(door.userData.id);
    });
    const near = nearDoor();
    const wasNear = Boolean(activeDoor);
    activeDoor = near;
    typingElement.classList.toggle('open', Boolean(near));
    input.disabled = !near;

    if (near) {
        promptElement.textContent = '単語を入力して扉を開けよう。';
        wordElement.textContent = word;
        if (!wasNear) {
            input.focus();
        }
    } else {
        promptElement.textContent = '探索中……赤い扉を探そう。';
        wordElement.textContent = '---';
    }
    if (goalCore) {
        goalCore.rotation.y = now * 0.0012;
        goalCore.position.y = 1.2 + Math.sin(now * 0.002) * 0.12;
    }
}

function drawMap() {
    mapElement.innerHTML = '';
    for (let y = 0; y < H; y += 1) {
        for (let x = 0; x < W; x += 1) {
            const item = document.createElement('div');
            const value = grid[y][x];
            item.className = `cell ${value === '#' ? 'wall' : value === 'L' && !unlocked.has(doorId(x, y)) ? 'lock' : value === 'G' ? 'goal' : ''}`;
            if (Math.floor(player.x) === x && Math.floor(player.y) === y) {
                item.className = 'cell player';
                item.style.setProperty('--heading', `${player.angle}rad`);
            }
            mapElement.appendChild(item);
        }
    }
}

function chooseWord() {
    word = words[Math.floor(Math.random() * words.length)];
}

function updateHud() {
    document.getElementById('score').textContent = score;
    document.getElementById('time').textContent = time;
    coordinatesElement.textContent = `X ${player.x.toFixed(1).padStart(4, '0')} / Y ${player.y.toFixed(1).padStart(4, '0')}`;
}

function finish(win) {
    if (ended) {
        return;
    }
    ended = true;
    clearInterval(timer);
    document.getElementById('title').textContent = win ? 'GATE BREACHED' : 'TIME UP';
    document.getElementById('result').innerHTML = win ? `脱出成功！<br>スコア：<b>${score}</b>` : `時間切れ。<br>スコア：<b>${score}</b>`;
    document.getElementById('overlay').classList.add('show');
}

function reset() {
    player.x = start.x;
    player.y = start.y;
    player.angle = 0;
    unlocked = new Set();
    score = 0;
    time = 300;
    ended = false;
    activeDoor = null;
    typingElement.classList.remove('open');
    chooseWord();
    input.value = '';
    messageElement.textContent = 'WASDで探索開始。';
    document.getElementById('overlay').classList.remove('show');
    buildMaze();
    drawMap();
    updateHud();
    clearInterval(timer);
    timer = setInterval(() => {
        if (!ended) {
            time -= 1;
            updateHud();
            if (time <= 0) {
                finish(false);
            }
        }
    }, 1000);
}

function resize() {
    const width = sceneElement.clientWidth;
    const height = sceneElement.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
}

function loop(now) {
    updatePlayer();
    updateDoorVisuals(now);
    updateHud();
    drawMap();
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}

input.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' || ended) {
        return;
    }
    if (!activeDoor) {
        messageElement.textContent = 'タイピング扉の近くにいません。';
        return;
    }
    if (input.value.trim().toLowerCase() === word) {
        unlocked.add(activeDoor.id);
        score += 250;
        time = Math.min(150, time + 8);
        messageElement.textContent = '正解！扉が開いた。+250 / +8秒';
        input.value = '';
        chooseWord();
        drawMap();
    } else {
        time = Math.max(0, time - 5);
        updateHud();
        messageElement.textContent = '不正解。5秒減少。';
        input.select();
    }
});

document.getElementById('restart').onclick = reset;
document.getElementById('again').onclick = reset;
window.addEventListener('resize', resize);

scene = new THREE.Scene();
scene.background = new THREE.Color(0x040a12);
scene.fog = new THREE.FogExp2(0x07131e, 0.047);
camera = new THREE.PerspectiveCamera(72, 1, 0.05, 100);
renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
scene.add(new THREE.HemisphereLight(0x8bdcff, 0x07111d, 0.7));
scene.add(new THREE.AmbientLight(0xb9eaff, 0.65));
mazeGroup = new THREE.Group();
doorGroup = new THREE.Group();
goalGroup = new THREE.Group();
scene.add(mazeGroup, doorGroup, goalGroup);
renderer.domElement.className = 'three-canvas';
sceneElement.prepend(renderer.domElement);
buildMaze();
buildGoal();
resize();
reset();
requestAnimationFrame(loop);