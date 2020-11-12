class TileStack {
    constructor(tiles, traversable) {
        this.tiles = tiles;
        this.traversable = traversable;
    }
}

var grid = [
    [
        new TileStack(['ground_tile_porous1'], true),
        new TileStack(['ground_tile_porous1'], true),
        new TileStack(['ground_tile_porous1'], true),
        new TileStack(['ground_tile_porous1'], true)
    ],[
        new TileStack(['ground_tile_porous1'], true),
        new TileStack(['ground_tile_porous1', 'manhole1'], true),
        new TileStack(['ground_tile_porous1', 'memorial1'], false),
        new TileStack(['ground_tile_porous1', 'telephone-booth1'], false)
    ],[
        new TileStack(['ground_tile_porous1'], true),
        new TileStack(['ground_tile_porous1'], true),
        new TileStack(['ground_tile_porous1'], true),
        new TileStack(['ground_tile_porous1'], true)
    ],[
        new TileStack(['ground_tile_porous1'], true),
        new TileStack(['ground_tile_porous1', 'palm2'], false),
        new TileStack(['ground_tile_porous1'], true),
        new TileStack(['ground_tile_porous1', 'barrier1'], false)
    ]
];

var materialCache = {};
var playerPos = {x: 2, y: 1};

function movePlayer(keypress) {
    let newX = playerPos.x, newY = playerPos.y;
    if (keypress.code === 'ArrowUp') {
        newY--;
    } else if (keypress.code === 'ArrowDown') {
        newY++;
    } else if (keypress.code === 'ArrowRight') {
        newX--;
    } else if (keypress.code === 'ArrowLeft') {
        newX++;
    }
    if (newX >= 0 && newY >= 0 && newX < grid.length && newY < grid[0].length && grid[newX][newY] && grid[newX][newY].traversable) {
        playerPos = {x: newX, y: newY};
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

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let stack = grid[i][j].tiles;
            stack.forEach((tileTexture) => {
                let sprite = getSprite(tileTexture);
                sprite.position.set(j, 0, i);
                scene.add(sprite);
            });
        }
    }

    let playerSprite = getSprite('ghost1');
    let playerShadow = getSprite('shadow1');
    scene.add(playerShadow);
    scene.add(playerSprite);

    camera.position.z = 10;

    let start;
    var animate = function (timestamp) {
        if (!start) {
            start = timestamp;
        }
        const elapsed = timestamp - start;
        let hoverOffset = Math.sin(elapsed/1000)*.15 + .25;
        playerSprite.position.set(playerPos.y, hoverOffset, playerPos.x);
        playerShadow.position.set(playerPos.y, 0, playerPos.x);
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    animate();
}