var materialCache = {};

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

function init() {
    var scene = new THREE.Scene();

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
            ['ground_tile_porous1', 'ghost1'],
            ['ground_tile_porous1', 'barrier1']
        ]
    ];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let stack = grid[i][j];
            stack.forEach((tileTexture) => {
                let material = getMaterial(tileTexture);
                let sprite = new THREE.Sprite(material);
                sprite.scale.set(3.55, 7.490, 1);
                sprite.position.set(j, 0, i);
                scene.add(sprite);
            });
        }
    }

    camera.position.z = 10;

    var animate = function () {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    animate();
}