var materialCache = {};
var playerPos = {x: 2, y: 1};

function movePlayer(keypress) {
    if (keypress.code === 'ArrowUp') {
        playerPos.y--;
    } else if (keypress.code === 'ArrowDown') {
        playerPos.y++;
    } else if (keypress.code === 'ArrowRight') {
        playerPos.x--;
    } else if (keypress.code === 'ArrowLeft') {
        playerPos.x++;
    }
}

function getMaterial(textureName) {
    if (materialCache[textureName]) {
        return materialCache[textureName];
    } else {
        let map = new THREE.TextureLoader().load(`city_game_tileset/${textureName}.png`);
        let material = new THREE.SpriteMaterial( {map: map} );
        materialCache[textureName] = material;
        return material;
    }
}

function getSprite(material) {
    let sprite = new THREE.Sprite(getMaterial(material));
    sprite.scale.set(3.55, 7.490, 1);
    return sprite;
}

function init() {
    let scene = new THREE.Scene();

    document.addEventListener('keydown', movePlayer);

    let aspect = window.innerWidth / window.innerHeight;
    let d = 10;
    let camera = new THREE.OrthographicCamera(-d * aspect, d*aspect, d, -d, 1, 1000);
    camera.position.set(d, d, d);
    camera.lookAt(scene.position);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    let grid = [
        [
            ['ground_tile_porous1', 'manhole1'],
            ['ground_tile_porous1', 'memorial1'],
            ['ground_tile_porous1', 'telephone-booth1']
        ],[
            ['ground_tile_porous1'],
            ['ground_tile_porous1'],
            ['ground_tile_porous1']
        ],[
            ['ground_tile_porous1', 'palm2'],
            ['ground_tile_porous1'],
            ['ground_tile_porous1', 'barrier1']
        ]
    ];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let stack = grid[i][j];
            stack.forEach((tileTexture) => {
                let sprite = getSprite(tileTexture);
                sprite.position.set(j, 0, i);
                scene.add(sprite);
            });
        }
    }

    let playerSprite = getSprite('ghost1');
    scene.add(playerSprite);

    camera.position.z = 10;

    var animate = function () {
        playerSprite.position.set(playerPos.y, 0, playerPos.x);
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    animate();
}