class UiButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, hoverKey, text, targetCallBack, textColor = '#fff', hoverAudio = 'buttonHoverSound', clickAudio = 'buttonClick') {
        super(scene, x, y);
        this.scene = scene;                     // La escena donde se encuentra el contenedor
        this.x = x;                             // La posicion de X del contenedor 
        this.y = y;                             // La posicion de Y del contenedor
        this.key = key;                         // Fondo del contenedor/btn
        this.hoverKey = hoverKey;               // Fondo que se mostrara cuando la persona este sobre el contenedor
        this.text = text;                       // Texto que se mostrara en el boton
        this.targetCallBack = targetCallBack;   // Accion que llamara cuando se de click
        this.textColor = textColor;             // Color del texto

        //  Ya esta definida la escena, por lo tanto se añade el audio que se pase por el parametro o se use el de defecto.
        this.soundButtonHover = this.scene.sound.add(hoverAudio);
        this.soundButtonClick = this.scene.sound.add(clickAudio);

        // Llama el metodo que inicializa un botton
        this.createButton();

        // Referencia a la escena donde la clase esta siendo llamada.
        this.scene.add.existing(this);
    };


    createButton(){
        // Extiende de Phaser.GameObjects.Container
        this.button = this.scene.add.image(0,0, 'button1');                                                 // Crea la imagen a la escena actual, no es necesario colocar X y Y ya que se encuentran dentro del contenedor
        this.button.setInteractive();                                                                       // Convierte al boton en interactivo.
        this.button.setScale(1.4);                                                                          // Escala del boton
        
        this.buttonText = this.scene.add.text(0,0, this.text, { fontSize: '26px', fill: this.textColor });  // El texto del boton.
        Phaser.Display.Align.In.Center(this.buttonText, this.button);                                       // Inserta el texto y lo alinea con el boton.
        
        this.add(this.button);                                                                              // Llama al boton y lo inserta al contenedor.
        this.add(this.buttonText);                                                                          // Lo mismo, pero al texto
    
        // Event Listeners del boton.
        this.button.on('pointerdown', () =>{
            this.targetCallBack();
            this.soundButtonClick.play();
        });
        
        this.button.on('pointerover', () =>{
            this.button.setTexture(this.hoverKey);
            this.soundButtonHover.play();
        });
        
        this.button.on('pointerout', () =>{
            this.button.setTexture(this.key);
        });
    }
}
