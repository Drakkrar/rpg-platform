class TitleScene extends Phaser.Scene {
    constructor(){
        super('title-scene');
    }

    create(){
        // Texto como titulo
        this.titleText = this.add.text(this.scale.width /2, this.scale.height /2, '[ Br34k ]', {
            fontSize: '64px',
            fill: '#fff'
        });
        this.titleText.setOrigin(0.5);

        // Boton para iniciar el juego
        this.startGameButton = new UiButton(this, this.scale.width /2, this.scale.height * 0.65, 'button1', 'button2', 'Start Game', this.startScene.bind(this, 'game-scene'));
        
    }

    // Funcion para realizar un callback de la escena, aun no descubro el .bind, Es algo que ereda de la escena pero tengo mis dudas aun.
    startScene(targetScene){
        this.scene.start(targetScene)
    }
}