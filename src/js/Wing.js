import {config} from './Config';
import {wingBulletStrategy, playerBulletStrategy} from './Strategy';
import Plane from './Plane';
export default class Wing extends Plane {
  constructor(left){
    super();
    this.width = config.wingWidth;
    this.height = config.wingHeight;
    this.x = left?(-5 - config.wingWidth):(config.playerWidth + 5);
    this.y = 30;
    this.playerIndex = 0; //图片显示index
    this.weaponLevel = 0; //武器等级
    this.dieFlag = false; //死亡flag
    this.dieLen = config.dieImgNum.player; //死亡图片数
  }

  render(ui,player){
    let {canvas} = ui;
    let {frame} = ui.controller;
    let {canvasHeight, canvasWidth} = config;
    //没死
    if(!this.dieFlag){
      //画飞机
      ui.drawImg(`wing${this.playerIndex}.png`, player.x + this.x, player.y + this.y);
      if(frame.counter % 5 === 0){
        this.playerIndex = Number(!this.playerIndex);
      }
    }else{
      if(this.countDown === 0){
        player.wings = player.wings.filter((x)=> {
            return x.dieFlag ? null : x
        })
        console.log(player.wings)
      }else{
        let dieIndex = Math.floor(this.dieLen - this.countDown / 10);      
        ui.drawImg(`wing_die${dieIndex}.png`, player.x + this.x, player.y + this.y);
      }
      this.countDown--;
    }
  }

  //发射子弹
  sendBullet(frame, bulletArr, player){
    let {bulletSpeed, bulletInterval} = config;
    if(frame.counter % bulletInterval === 0){
      wingBulletStrategy[`Lv.${this.weaponLevel}`](this, player, bulletSpeed, bulletArr);
    }
  };

  //被攻击
  attacked(soundPlay){
    this.dieFlag = true;
    this.countDown = this.dieLen * config.dieInterval;
    soundPlay('player_bomb.mp3');
  }
}