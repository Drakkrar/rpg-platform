class GameScene extends Phaser.Scene {
    constructor(){
        super('game-scene');
    }

    init(){
        // Si se usa scene.launch en lugar de scene.start Phaser interactua con las dos escenas al mismo tiempo.
        this.scene.launch('ui-scene');
    }

    create(){
        // Audios
        this.createAudio();
        // Entidades
        this.createChest();
        this.createPlayer();
        // Paredes
        this.createWalls();
            // Colisionadores
        this.addCollisions();
        // Inputs
        this.createInput();
    }

    update(){
        this.player.update(this.cursors);
    }

    createAudio(){
        this.goldPickupAudio = this.sound.add('goldSound');
    }

    createPlayer(){
        this.player = new Player(this, 32, 32, 'characters', 0);
    }

    createChest(){
        // create a chest group
        this.chests = this.physics.add.group();
        // create chest positions array
        this.chestPositions = [[100,100], [200,200], [300,300], [400,400],[500,500]];
        // specify the max number of chests we can have
        this.maxNumberOfChests = 3;
        // spawn a chest
        for (let i = 0; i< this.maxNumberOfChests; i += 1) {
        this.spawnChest();
        }
    }

    createWalls(){
        this.wall = this.physics.add.image(500, 100, 'button1');
        this.wall.setImmovable();
    }

    createInput(){
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    addCollisions(){
        this.physics.add.collider(this.player, this.wall);
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
    }


    spawnChest(){
        // Crear una posicion en el mapa
        const location = this.chestPositions[Math.floor(Math.random() * this.chestPositions.length)];

        // Verificar si no hay solapamiento en las posiciones de los cofres.
        let deadChest = this.chests.getFirstDead();
        if (!deadChest){
            const chest = new Chest(this, location[0], location[1], 'items', 0);
            // Agrega el cofre creado al grupo de cofres.
            this.chests.add(chest);
        } else {
            deadChest.setPosition(location[0], location[1]);
            deadChest.makeActive();
        }

    }

    collectChest(player, chest){
        // Reproduce el sonido
        this.goldPickupAudio.play();

        // Actualiza las monedas por evento.
        this.events.emit('updateScore', chest.coins);

        ///// Practicando con los eventos del juego. Agregando oro al jugador.
        this.events.emit('updateGold', chest.coins);
        console.log(player.gold);

        // Deshabilita el cofre, pero no lo elimina de la memoria.
        chest.makeInactive();

        this.time.delayedCall(1000, this.spawnChest, [], this); // NEW
    }
}