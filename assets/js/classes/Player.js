class Player extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, frame, velocity = 160){
        super(scene, x, y, key, frame);
        this.scene = scene;
        this.velocity = velocity;
        this.gold = 10;

        //enable physicis
        this.scene.physics.world.enable(this);
        //set immovable if another object collides
        this.setImmovable(false);

        this.setScale(2);
        this.setCollideWorldBounds(true);

        this.scene.add.existing(this);

        this.setupEvents();

    }

    update(cursors) {
        this.body.setVelocity(0);

        if (cursors.left.isDown){
            this.body.setVelocityX(-this.velocity);
        } else if (cursors.right.isDown){
            this.body.setVelocityX(this.velocity);
        }
    
        if (cursors.up.isDown){
            this.body.setVelocityY(-this.velocity);
        } else if (cursors.down.isDown){
            this.body.setVelocityY(this.velocity);
        }
    
    }

    setupEvents(){
        // Agrega el oro recolectado del cofre a una propiedad del jugador
        this.scene.events.on('updateGold', (coins) =>{
            this.gold += coins;
        })

    }

}