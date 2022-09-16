document.addEventListener('DOMContentLoaded',()=>{
    const canvas= document.getElementById('canvas')
    const cc= canvas.getContext('2d')
    canvas.width=1024
    canvas.height=576
    cc.fillStyle='white'
    cc.fillRect(0,0,canvas.width,canvas.height)
   let gravity = 0.5
    let right = false
    let left = false
    let jump = false;
    let newJump = true;
    let lust = 1
    let atach = false
    let stop = false
    let leftEnemy= false
    let rightEnemy= false
    let  enemyLust = 0 
    let enemyAtach= false
    let count = 0
    let enemyCount = 0

                    class MainHero{
                        constructor(){
                            this.pos={
                                x: 40,
                                y: canvas.height/3*2-60
                            }
                            this.h = 50
                            this.w= 60
                            this.health=10
                            this.velocity={
                                x:4,
                                y:0
                            }
                            this.frame = 0;

                        }
                        drawMainHero1(){
                                const hero = new Image()
                                hero.src = 'image/right-PhotoRoom.png'
                                cc.drawImage(hero,this.frame*64+3,2,54,50,this.pos.x,this.pos.y,this.w,this.h)
                                this.pos.y += this.velocity.y
                        }

                        drawMainHero0(){
                            const hero = new Image()
                            hero.src = 'image/left.png'
                            cc.drawImage(hero,this.frame*64+3,3,54,50,this.pos.x,this.pos.y,this.w,this.h)
                            this.pos.y += this.velocity.y
                    }

                        drawMainHeroAtach0(){
                            const hero = new Image()
                            hero.src = 'image/left-atach.png'
                            cc.drawImage(hero,this.frame*60-13,0,64,50,this.pos.x-15,this.pos.y,this.w+10,this.h)
                            this.pos.y += this.velocity.y
                    }
                        drawMainHeroAtach1(){
                            const hero = new Image()
                            hero.src = 'image/right-atach.png'
                            cc.drawImage(hero,this.frame*60+7,0,64,50,this.pos.x+10,this.pos.y,this.w+10,this.h)
                            this.pos.y += this.velocity.y
                    }


                        update1(){
                            this.drawMainHero1()  
                        }

                        update0(){
                            this.drawMainHero0()  
                        }
                        update10(){
                            this.drawMainHeroAtach0()
                        }
                        update11(){
                            this.drawMainHeroAtach1()
                        }

                        drawHealth(){
                            cc.fillStyle='green'
                            cc.fillRect(50,50,hero.health*8,10)

                            cc.fillText('Health',50,40)
                            cc.font= "16px Verdana";
                        }
                        
                        
                }

                    class Back{
                        constructor(){
                            this.pos={
                                x: 0,
                                y: 0
                            }
                            this.h = canvas.height
                            this.w= canvas.width
                            this.velocity={
                                x:12,
                            }

                        }
                        drawImageBack(){
                            const back = new Image()
                            back.src = 'image/1.png'
                            cc.drawImage(back,0,this.pos.y,this.w,this.w/3)
                        }

                        drawImageBack1(){
                            const back1 = new Image()
                            back1.src = 'image/2.png'
                            cc.drawImage(back1,this.pos.x,this.h/4,this.w,this.w/3)
                            cc.drawImage(back1,this.pos.x+1024,this.h/4,this.w,this.w/3)
                        }

                        update(){
                        this.drawImageBack()
                        this.drawImageBack1()
                        }

                    }

                    class FrontBack{
                        constructor(){
                            this.pos={
                                x: 0,
                                y: 0
                            }
                            this.h = canvas.height
                            this.w= canvas.width
                            this.velocity={
                                x:12,
                            }

                        }

                        drawImageBack1(img,x,y,w,h){
                            const back1 = new Image()
                            back1.src = img
                            cc.drawImage(back1,x,y,w,h)
                            cc.drawImage(back1,x+1024,y,w,h)
                        }

                        update(img,x,y,w,h){
                        this.drawImageBack1(img,x,y,w,h)
                        }

                    }


                class Train{
                    constructor(){
                        this.pos={
                            x: 10,
                            y: canvas.height/3*2
                        }
                        this.h = canvas.height/3
                        this.w= canvas.width-150
                        this.velocity={
                            x:6,
                        }

                    }
                    drawImage(){
                        const train  = new Image()
                        train.src = 'image/train.png'
                        cc.drawImage(train,this.pos.x,this.pos.y, this.w,this.h+50)
                    }

                    update(){
                    this.drawImage()
                    
                    }
                }


                class Enemy{
                    constructor(x,y,width,height){
                        this.pos={
                            x:x,
                            y:y
                        }
                        this.health=10
                        this.width=width
                        this.height=height
                        this.frame = 0;
                        this.velocity={
                            x:4,
                            y:1
                        }
                    }                    
                    drawEnemyRight (img,sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
                        const enemy= new Image ()
                        enemy.src=img
                        cc.drawImage(enemy,sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
                    }
                    drawEnemyLeft (img,sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
                        const enemy= new Image ()
                        enemy.src=img
                        cc.drawImage(enemy,sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
                    }
                    drawEnemyLeftAtach (img,sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
                        const enemy= new Image ()
                        enemy.src=img
                        cc.drawImage(enemy,sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
                    }
                    drawEnemyRightAtach (img,sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
                        const enemy= new Image ()
                        enemy.src=img
                        cc.drawImage(enemy,sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
                    }
                    drawEnemyHealth(){

                        cc.fillStyle="red"
                        cc.fillRect(this.pos.x-18,this.pos.y-20,enemy.health*8,10)
                    }
                }


                class Heal{
                    constructor(x,y){
                        this.pos={
                            x: x,
                            y: y
                        }
                        this.h = 30
                        this.w= 30
                        this.velocity={
                            y:5,
                        }

                    }
                    drawImageH(){
                        const heal  = new Image()
                        heal.src = 'image/health.png'
                        cc.drawImage(heal,this.pos.x,this.pos.y, this.w,this.h)
                    }

                }




            const hero = new MainHero()
            const back= new Back()
            const frontback= new FrontBack()
            const frontback1= new FrontBack()
            const frontback2= new FrontBack()
            const train = new Train()
            const enemy = new Enemy(600,310,60,60)
            const healing = new Heal(150+Math.random()*train.w,-50)




    function animate(){
        let anim = requestAnimationFrame(animate)
        cc.clearRect(0,0,canvas.width,canvas.height)
        cc.fillStyle='white'
        cc.fillRect(0,0,canvas.width,canvas.height)
        back.update()
        frontback.update('image/3.png',frontback.pos.x,frontback.h/3.0,frontback.w,frontback.w/4)
        frontback1.update('image/4.png',frontback1.pos.x,frontback1.h/2.1,frontback1.w,frontback1.w/4)
        frontback2.update('image/5.png',frontback2.pos.x,frontback2.h/1.8,frontback2.w,frontback2.w/4)
        train.update()
        enemy.pos.y +=enemy.velocity.y
        back.pos.x -= 0.5
        frontback.pos.x -= 3.5
        frontback1.pos.x -= 8.5
        frontback2.pos.x -= 15
        hero.drawHealth()
        enemy.drawEnemyHealth()

       if(hero.health<3){
        healing.drawImageH()
        healing.pos.y+=healing.velocity.y
        if(healing.pos.y>3000){
            healing.pos.y=-50
            healing.pos.x = Math.random()*train.w+train.pos.x
        }
       }

       if(hero.pos.x+hero.w>healing.pos.x && healing.pos.x + healing.w > hero.pos.x && hero.pos.y<healing.pos.y+ healing.h && hero.pos.y + hero.h > healing.pos.y){
        hero.health=10
        healing.pos.y=-50
        healing.pos.x = Math.random()*train.w+train.pos.x
       }


        //enemy
        enemyCount++
        if(enemyCount>99){
            enemyCount=0
        }

        if(enemyLust==0 && !enemyAtach){
            enemy.drawEnemyRight('image/enemyLeft.png',enemy.frame*64+10,0,enemy.width,enemy.height,enemy.pos.x,enemy.pos.y-5,enemy.width+20,enemy.height+20)
        }else if (enemyLust==1 && !enemyAtach){
            enemy.drawEnemyRight('image/rightEnemy.png',enemy.frame*64+10,0,enemy.width,enemy.height,enemy.pos.x,enemy.pos.y-5,enemy.width+20,enemy.height+20)
        }else if(enemyLust==1 && enemyAtach){
            enemy.drawEnemyRightAtach('image/rightEnemyAtach.png',enemy.frame*64+10,0,enemy.width,enemy.height,enemy.pos.x,enemy.pos.y-5,enemy.width+20,enemy.height+20)
        }
        else if(enemyLust==0 && enemyAtach){
            enemy.drawEnemyRightAtach('image/leftEnemyAtach.png',enemy.frame*64,0,enemy.width,enemy.height,enemy.pos.x,enemy.pos.y-10,enemy.width+20,enemy.height+20)
        }


        //hero
        if(right || left || atach){
            count ++;
            if(count>99){
                count=0
            }
        }

        if(((atach && enemy.pos.x-hero.pos.x<60 && enemy.pos.x>hero.pos.x)||(atach && hero.pos.x-enemy.pos.x<60 && hero.pos.x>enemy.pos.x))){
            enemy.health-=0.1
            if (enemy.health<=0){
                enemy.health=0
            }
        }



        //game
        if(stop ==true){
            cancelAnimationFrame(anim)
        }
 
        //hero
        if(lust==1 && !atach ){
        hero.update1()}
        else if(lust==0 && !atach){
            hero.update0()
        }else if(lust==0 && atach){
            hero.update10()
        }else if(lust==1 && atach){
            hero.update11()
        }

        
        //hero,enemy,train
        if(right &&  hero.pos.x>=390){
            train.pos.x-=train.velocity.x
            enemy.pos.x-=train.velocity.x
            healing.pos.x-=train.velocity.x
        }else if(left &&  hero.pos.x<=101){
            train.pos.x+=train.velocity.x
            enemy.pos.x+=train.velocity.x
            healing.pos.x+=train.velocity.x
        }
        //back
        if(back.pos.x<-1024){
            back.pos.x+=1024
        }
        if(frontback.pos.x<-1024){
            frontback.pos.x+=1024
        }
        if(frontback1.pos.x<-1024){
            frontback1.pos.x+=1024
        }
        if(frontback2.pos.x<-1024){
            frontback2.pos.x+=1024
        }
        
        //hero
        if(!right && !left && !atach){
            hero.frame=0
        }



        //hero
        if(count%3==0){
        if(right && !atach){ 
            hero.frame++;
            if(hero.frame>=9 ){
                hero.frame=0
            }
        }else if(left && lust == 0 && !atach){
            hero.frame++;
            if(hero.frame>8 ){
                hero.frame=0
            }
        } else if(lust == 0 && atach){
            hero.frame++;
            if(hero.frame>5 ){
                atach=false
            }
        }
        else if(lust == 1 && atach){
            hero.frame++;
            if(hero.frame>5 ){
                atach=false
            }
        }
        }

        
        //hero
        if(right &&  hero.pos.x<=400){
            hero.pos.x +=hero.velocity.x


        }else if(left &&  hero.pos.x>100){
            hero.pos.x -=hero.velocity.x
        }
    

        //enemy gravitation
        if(enemy.pos.y + enemy.height + enemy.velocity.y >= train.pos.y && enemy.pos.y + enemy.height + enemy.velocity.y <= train.pos.y+10
            && 
            enemy.pos.x + enemy.width -20 > train.pos.x 
           && 
            enemy.pos.x +20 < train.pos.x + train.w && enemy.health>0){
            enemy.velocity.y=0
        }     else{
            enemy.velocity.y += gravity
        }
        
        //enemy and hero action
        if(enemy.pos.x-hero.pos.x<=200 &&enemy.pos.x-hero.pos.x>=40 &&  hero.pos.x<enemy.pos.x){
            enemy.pos.x-=2
            leftEnemy = true
            rightEnemy = false
            enemyLust = 0 
            enemyAtach=false
        }else if(hero.pos.x-enemy.pos.x<=200 && hero.pos.x-enemy.pos.x>=40  && hero.pos.x>enemy.pos.x){
            enemy.pos.x+=2
            leftEnemy = false
            rightEnemy = true
            enemyLust = 1
            enemyAtach=false
        }else if(hero.pos.x-enemy.pos.x<40 && hero.pos.x>enemy.pos.x){
            enemyLust=1
            leftEnemy = false
            rightEnemy = false
            enemyAtach=true
        }
        else if(enemy.pos.x-hero.pos.x<40  &&  hero.pos.x<enemy.pos.x){
            enemyLust=0
            leftEnemy = false
            rightEnemy = false
            enemyAtach=true

        }
        else{
            leftEnemy = false
            rightEnemy = false
            enemyAtach=false
        }


        //enemy

        if(enemyCount%3==0)
        if(leftEnemy || rightEnemy){       
             enemy.frame++;
            if(enemy.frame>8){
                enemy.frame=0
            }
        }else if(enemyAtach) {
            enemy.frame++;
            if(enemy.frame>5){
                enemy.frame=0
            }
        }
        else {
            enemy.frame=0
        }

        

        //hero gravitation 
        if(hero.pos.y + hero.h + hero.velocity.y >= train.pos.y && hero.pos.y + hero.h + hero.velocity.y <= train.pos.y+10
            && 
            hero.pos.x + hero.w -20 > train.pos.x 
           && 
            hero.pos.x +20 < train.pos.x + train.w  && hero.health>0){
            hero.velocity.y=0
        }
        else if(hero.pos.y + hero.w + hero.velocity.y > canvas.height ){
            cc.fillStyle='red'

            cc.font= "36px Verdana";
            cc.fillText('LOSE',canvas.width/2-60,canvas.height/2)
            train.pos.x+=15
            enemy.pos.x+=15
            back.pos.x += 0.5
            frontback.pos.x += 3
            frontback1.pos.x += 7.5
            frontback2.pos.x += 13
            setTimeout(stopAnim,3000)
            function stopAnim(){
             return  stop=true             
            }
        }else {
            hero.velocity.y += gravity
        }

        //enemy atach

        if(enemyAtach && enemy.velocity.y==0){
            hero.health-=0.02
            if(hero.health<0){
                hero.health=0
            }
        }


        if(enemy.pos.y>=10000){
            enemy.velocity.y = 0
            enemy.pos.y=train.pos.y-200
            enemy.pos.x = train.pos.x+700
            enemy.health = 10
            
        }


        //hero
        if(jump && newJump) {
            hero.velocity.y-=8
            jump=false
            setTimeout((()=>(newJump = true)),600)
            newJump = false
        }
        
        //hero action
        document.addEventListener('keydown',function({keyCode}){
            switch (keyCode){
                case(68): left=false;
                right = true
                lust = 1
                break;
                case(65): left=true;
                right = false
                lust = 0
                break;
                case(32):jump = true;
                break;
            }
        })

        //hero action
        document.addEventListener('keyup',function({keyCode}){
            switch (keyCode){
                case(68): left=false;
                right = false
                lust = 1
                break;
                case(65): left=false;
                right = false
                lust = 0
                break;
            }
        })
        //hero action
        document.addEventListener('click',function(){
            atach = true
        })




    }



    
    animate()

    
})