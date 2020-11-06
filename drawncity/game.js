class Tile {
    constructor() {
        
    }
}

function init() {
    var scene = new THREE.Scene();

    let aspect = window.innerWidth / window.innerHeight;
    let d = 10;
    let camera = new THREE.OrthographicCamera(-d * aspect, d*aspect, d, -d, 1, 1000);
    camera.position.set(d, d, d);
    camera.lookAt(scene.position);
    // var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var groundMap = new THREE.TextureLoader().load( "city_game_tileset/ground_tile_porous1.png" );
    var phoneMap = new THREE.TextureLoader().load( "city_game_tileset/telephone-booth1.png" );
    var trashMap = new THREE.TextureLoader().load( "city_game_tileset/manhole1.png" );
    var barrierMap = new THREE.TextureLoader().load( "city_game_tileset/barrier1.png" );
    var groundMaterial = new THREE.SpriteMaterial( { map: groundMap } );
    var phoneMaterial = new THREE.SpriteMaterial( { map: phoneMap } );
    var trashMaterial = new THREE.SpriteMaterial( { map: trashMap } );
    var barrierMaterial = new THREE.SpriteMaterial( { map: barrierMap } );

    let grid = [
        [[groundMaterial, trashMaterial], [groundMaterial], [groundMaterial, phoneMaterial]],
        [[groundMaterial], [groundMaterial], [groundMaterial]],
        [[groundMaterial], [groundMaterial], [groundMaterial, barrierMaterial]]
    ];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let stack = grid[i][j];
            stack.forEach((tile) => {
                let sprite = new THREE.Sprite(tile);
                // sprite.scale.set(3, 6.33, 1);
                sprite.scale.set(3.55, 7.490, 1);
                sprite.position.set(-i, 0, -j);
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