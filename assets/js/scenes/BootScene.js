class BootScene extends Phaser.Scene {
    constructor(){
        super('boot-scene');
    }

    preload(){
        this.loadImages();
        this.loadSpriteSheets();
        this.loadAudio();
    }

    create(){
        this.scene.start('title-scene');

        /// TODO: Trabajando directamente en el juego, descomentar la linea anterior para iniciar desde el titulo.
        // this.scene.start('game-scene');
    }

    //// Metodos para la carga
        // Cargar imagenes
    loadImages(){
        this.load.image('button1', 'assets/images/ui/blue_button01.png');
        this.load.image('button2', 'assets/images/ui/blue_button02.png');

    }
        // Cargar hojas de sprites
    loadSpriteSheets(){
        this.load.spritesheet('items', 'assets/images/items.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('characters', 'assets/images/characters.png', { frameWidth: 32, frameHeight: 32 });

    }
        // Cargar sonidos
    loadAudio(){
        this.load.audio('goldSound', ['assets/audio/Pickup.wav']);
        this.load.audio('buttonHoverSound', ['assets/audio/menu/Menu_Sounds_Hover.wav']);
        this.load.audio('buttonClick', ['assets/audio/menu/Menu_Sounds_Forward.wav']);
    }
}