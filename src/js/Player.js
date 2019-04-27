import {config} from './Config';
import {playerBulletStrategy} from './Strategy';
import BossBullet from './BossBullet';
import Plane from './Plane';
import UI from './UI';
export default class Player extends Plane {
  constructor(){
    super();
    this.width = config.playerWidth;
    this.height = config.playerHeight;
    this.x = (config.canvasWidth - this.width)/2;
    this.y = config.canvasHeight - this.height - 100;
    this.playerIndex = 0; //图片显示index
    this.bomb = 0; //炸弹数量
    this.score = 0; //分数
    this.isFullFirepower = false; //火力全开状态
    this.weaponLevel = 0; //武器等级
    this.shieldStatus = 0; //盾牌状态  0没有，1快消失，2有
    this.shieldTimer = null;   //盾牌状态计时器
    this.dieFlag = false; //死亡flag
    this.dieLen = config.dieImgNum.player; //死亡图片数
  }

  render(ui){
    let {canvas} = ui;
    let {frame} = ui.controller;
    let {canvasHeight, canvasWidth} = config;
    //没死
    if(!this.dieFlag){
      //画飞机
      ui.drawImg(`player${this.playerIndex}.png`, this.x, this.y);
      //根据盾状态，画盾      
      switch(this.shieldStatus){
        case 2:
          ui.drawImg(`prop_shield.png`, this.x - 12, this.y);
          break;
        case 1:
          let r = Math.random();
          if(r < 0.5){
            ui.drawImg(`prop_shield.png`, this.x - 12, this.y);
          }
          break;
        case 0:
          break;
      } 
      if(frame.counter % 5 === 0){
        this.playerIndex = Number(!this.playerIndex);
      }
    }else{
      if(this.countDown === 0){
        ui.controller.trigger('gameover', ui);
        return true;
      }else{
        let dieIndex = Math.floor(this.dieLen - this.countDown / 10);      
        ui.drawImg(`player_die${dieIndex}.png`, this.x, this.y);
      }
      this.countDown--;
    }
  }

  sendBullet(frame, bulletArr, soundPlay){
    let {bulletSpeed, bulletInterval} = config;
    if(frame.counter % bulletInterval === 0){
      playerBulletStrategy[`Lv.${this.weaponLevel}`](this, bulletSpeed, bulletArr);
      soundPlay('biubiubiu.mp3');
    }
  };

  //被工具
  attacked(soundPlay){
    switch(this.shieldStatus){
      case 2:
        //如果有盾，击中，盾变虚弱状态
        this.shieldStatus = 1;
        clearTimeout(this.shieldTimer)
        this.shieldTimer = setTimeout(() => {
          this.shieldStatus = 0;
        }, config.shieldWeakTime);
        break;
      case 1:
        break;
      case 0:
      default:
        //没有防护罩，被击中，凉凉
        this.dieFlag = true;
        this.countDown = this.dieLen * config.dieInterval;
        soundPlay('player_bomb.mp3');
        break;
    }
  }

  //绑定移动事件
  bindTouchEvent(dom){
    let planeBoundaryMinX = 0;
    let planeBoundaryMaxX = config.canvasWidth -  config.playerWidth;
    let planeBoundaryMinY = 0;
    let planeBoundaryMaxY = config.canvasHeight - config.playerHeight;
    let ratio = UI.getRatio();
    let ratioX = ratio.x;   
    let ratioY = ratio.y;
    dom.addEventListener('touchstart', (e) => {
      let oldTouchX = e.touches[0].clientX / ratioX;
      let oldTouchY = e.touches[0].clientY / ratioY;
      let oldPlaneX = this.x;
      let oldPlaneY = this.y;
      dom.addEventListener('touchmove', (e) => {
        let newTouchX = e.touches[0].clientX / ratioX;
        let newTouchY = e.touches[0].clientY / ratioY;
        let newPlaneX = oldPlaneX + newTouchX - oldTouchX;
        let newPlaneY = oldPlaneY + newTouchY - oldTouchY;
        if(newPlaneX < planeBoundaryMinX){
          newPlaneX = planeBoundaryMinX;
        }
        if(newPlaneX > planeBoundaryMaxX){
          newPlaneX = planeBoundaryMaxX;
        }
        if(newPlaneY < planeBoundaryMinY){
          newPlaneY = planeBoundaryMinY;
        }
        if(newPlaneY > planeBoundaryMaxY){
          newPlaneY = planeBoundaryMaxY;
        }
        this.x = newPlaneX;
        this.y = newPlaneY;
      });
    });
  }

  //使用炸弹
  bindBombEvent(dom, srcBuffer, enemyArr, dieArr, ctrler){ //绑定爆炸事件
    dom.addEventListener('touchend', (e) => {
      if(this.bomb){
        this.bomb--;
        for(let i = enemyArr.length - 1, enemy; enemy = enemyArr[i--];){
          enemy.blood = 0;
          let dieEnemy = enemyArr.splice(i, 1)[0];
          let dieLen = config.dieImgNum[dieEnemy.type];
          dieEnemy.dieLen = dieLen;
          dieEnemy.countDown = dieLen * config.dieInterval;
          dieArr.push(dieEnemy);
          this.score += config.killScore[dieEnemy.type];
          srcBuffer.soundPlay('use_bomb.mp3');
        }
        let {boss} = ctrler;
        if(boss && boss.state !== 'Appear'){
          let damage = 200 + this.weaponLevel * 50;
          boss.attacked(damage, ctrler);
          for(let i = boss.bullets.length - 1, bullet; bullet = boss.bullets[i--];){
            BossBullet.recoverBullet(bullet);
          }
          boss.bullets = [];
        }
      }
    });
  }
}