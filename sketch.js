var t_rex,dino;
var suelo,piso;
var suelo_invisible;
var nube,nube2;
var c1,c2,c3,c4,c5,c6;
var cactus;
var puntaje=0;
var salto;
var muerte;
var nivel;
var gameover;
var findejuego;
var reset;
var reiniciar;
var gruponubes;
var grupocactus;
var tipo;
var etapa="inicio";
var trex_fin,trex_f;
var puntajefinal=0;

function preload(){
t_rex=loadAnimation ("l0_trex1.png","trex3.png");
  suelo=loadImage("ground2.png");
  nube2=loadImage("cloud.png");
  c1=loadImage("obstacle1.png");
  c2=loadImage("obstacle2.png");
  c3=loadImage("obstacle3.png");
  c4=loadImage("obstacle4.png");
  c5=loadImage("obstacle5.png");
  c6=loadImage("obstacle6.png");
  trex_f=loadImage("trex_collided.png");
  salto=loadSound("jump.mp3");
  muerte=loadSound("die.mp3");
  nivel=loadSound("checkPoint.mp3");
  gameover=loadImage("gameOver.png");
  reiniciar=loadImage("restart.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
gruponubes=new Group();
  grupocactus=new Group();
  
 piso=createSprite(width/2,height-100);
piso.addImage("correr",suelo)
  piso.scale=1
  piso.velocityX=-4
  suelo_invisible=createSprite(40,height-80,50,6);
  suelo_invisible.visible=false 
  
 dino=createSprite(50,height-100);
  dino.addAnimation("corriendo",t_rex)
  dino.scale=0.7
 // dino.setCollider("rectangle",0,0,75,80)
  dino.setCollider("circle",0,0,40)
  dino.debug=false
  
  trex_fin=createSprite(50,height-110);
  trex_fin.addImage("choque",trex_f)
  trex_fin.scale=0.7
  trex_fin.visible=false
  
  findejuego=createSprite(width/2,height/3);
findejuego.addImage("finalizar",gameover)
 findejuego.scale=0.6
 findejuego.visible=false
  
  reset=createSprite(width/2,height/2);
reset.addImage("reinicio",reiniciar)
 reset.scale=0.6
 reset.visible=false
  
  
}

function draw() {
  background("white");
  if (etapa=="inicio"){
  nubes();
  obstaculos();
  marcador();
    
if (piso.x<0){
   piso.x=width
 }
  if (dino.collide(suelo_invisible)){
  if ( keyDown("space") || touches.lenght>0 ) {
    dino.velocityY=-15
    touches=[]
    salto.play();
  }
  }
  dino.velocityY=dino.velocityY+0.6
  
    if (grupocactus.isTouching(dino)){
      muerte.play();
      puntajefinal=puntaje;
      etapa="final";
    }
  }      //aqui termina etapa de inicio
  
  if(etapa=="final"){
    piso.velocityX=0
    dino.velocityY=0
    trex_fin.y=dino.y
   dino.visible=false
  trex_fin.visible=true
    gruponubes.setVelocityXEach(0)
    grupocactus.setVelocityXEach(0)
    gruponubes.setLifetimeEach(-1)
    grupocactus.setLifetimeEach(-1)
      text("puntuacion:"+puntajefinal,width-100,40)
  text("Douglas",width-100,20)
    findejuego.visible=true
    reset.visible=true
    
    if(mousePressedOver(reset) || touches.lenght>0 ){
       touches=[]
      dino.visible=true
      piso.velocityX=-4
      trex_fin.visible=false
      findejuego.visible=false
      reset.visible=false
      gruponubes.destroyEach();
      grupocactus.destroyEach();
      puntaje=0
      etapa="inicio"
      
    }
       
       
  }
  
  
  dino.collide(suelo_invisible)
 // console.log(piso.velocityX)
drawSprites();
  
} //es la etapa final de funcion draw

function nubes(){
  if (frameCount % 170==0){
  nube=createSprite(width,Math.round(random(20,height/3)));
nube.addImage("volando",nube2)
  nube.velocityX=-5
    nube.lifetime=500;
    gruponubes.add(nube);
    }
}

function obstaculos(){
  tipo=Math.round(random(1,6))
  if (frameCount % 170==0){
  cactus=createSprite(width,Math.round(random(height-120,height-100)));
//cactus.addImage("estorbar",c1)
  cactus.velocityX=-(4+puntaje/100);
    piso.velocityX=cactus.velocityX;
    switch(tipo){
      case 1:
      cactus.addImage("estorbar",c1)
        cactus.scale=1
      break;
      case 2:
      cactus.addImage("estorbar",c2)
        cactus.scale=1
      break;
      case 3:
      cactus.addImage("estorbar",c3)
        cactus.scale=1
      break;
      case 4:
      cactus.addImage("estorbar",c4)
        cactus.scale=0.8
      break;
      case 5:
      cactus.addImage("estorbar",c5)
        cactus.scale=0.8
      break;
      case 6:
      cactus.addImage("estorbar",c6)
        cactus.scale=0.8
      break;
    }
    cactus.lifetime=500;
    grupocactus.add(cactus)
    
    }
}

function marcador(){
  puntaje = puntaje + Math.round(getFrameRate() / 60 );
  text("puntuacion:"+puntaje,width-100,40)
  text("Douglas",width-100,20)
  if (puntaje%100==0 && puntaje>0){
    nivel.play();
  }
}