class UiScene extends Phaser.Scene {
    constructor(){
        super('ui-scene');
        this.score = 0;
    }

    init(){
        // Referencia a la escena del juego.
        this.gameScene = this.scene.get('game-scene');
    }

    create(){
        this.setupUiElements();
        this.setupEvents();
    }

    setupUiElements(){
        // Crear el texto de la puntuación.
        this.scoreText = this.add.text(35, 8, 'Coins: 0', {
            fontSize: '20px', 
            fill: '#fff'
        });
        // Icono para las moneditas.
        this.coinIcon = this.add.image(15, 15, 'items', 3);
    }

    setupEvents(){
        // Cuando el evento updateScore en la escena sea activado, se ejecuta lo siguiente
        this.gameScene.events.on('updateScore', (score) => {
            this.score += score;
            this.scoreText.setText(`Coins: ${this.score}`);
        })

    }
}