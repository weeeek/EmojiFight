import {config} from './Config';
import {randomNum} from './Utils';
import Enemy from './Enemy';
import PlayerBullet from './PlayerBullet';
import WingBullet from './WingBullet';
import BossBullet from './BossBullet';
import Wing from './Wing'

/******** 玩家僚机弹幕策略对象 ********/
let offset = -4;

let wingBulletStrategy = {
  'Lv.0': function(wing, player, bulletSpeed, bulletArr){
    let newBullet = WingBullet.getBullet(player.x + wing.x + wing.width/2 + offset, player.y + wing.y, 0, -bulletSpeed, 'normal', 1);
    bulletArr.push(newBullet);
  },
  'Lv.1': function(wing, player, bulletSpeed, bulletArr){
    let newBullet = WingBullet.getBullet(player.x + wing.x + wing.width/2 + offset, player.y + wing.y, 0, -bulletSpeed, 'strength', 1);
    bulletArr.push(newBullet);
  },
  'Lv.2': function(wing, player, bulletSpeed, bulletArr){
    let newBullet = WingBullet.getBullet(player.x + wing.x + wing.width/2 + offset, player.y + wing.y, 0, -bulletSpeed, 'super', 1);
    bulletArr.push(newBullet);
  }
};

/******** 玩家弹幕策略对象 ********/
let playerBulletStrategy = {
  'Lv.0': function(player, bulletSpeed, bulletArr){
    let newBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset, player.y, 0, -bulletSpeed, 'normal', 1);
    bulletArr.push(newBullet);
  },
  'Lv.1': function(player, bulletSpeed, bulletArr){
    let newLeftBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset - 15, player.y, 0, -bulletSpeed,  'normal', 1);
    let newRightBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset + 15, player.y, 0, -bulletSpeed,  'normal', 1);
    bulletArr.push(newLeftBullet, newRightBullet);
  },
  'Lv.2': function(player, bulletSpeed, bulletArr){
    let newLeftBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset - 30, player.y + 16, -bulletSpeed/3, -bulletSpeed,  'strength', 1);
    let newMidBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset, player.y, 0, -bulletSpeed,  'normal', 1);
    let newRightBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset + 30, player.y + 16, bulletSpeed/3, -bulletSpeed,  'strength', 1);
    bulletArr.push(newLeftBullet, newMidBullet, newRightBullet);
  },
  'Lv.3': function(player, bulletSpeed, bulletArr){
    let newLeftBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset - 30, player.y + 16, -bulletSpeed/3, -bulletSpeed,  'strength', 1);
    let newMidLeftBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset - 15, player.y, 0, -bulletSpeed,  'normal', 1);
    let newMidRightBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset + 15, player.y, 0, -bulletSpeed,  'normal', 1);
    let newRightBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset + 30, player.y + 16, bulletSpeed/3, -bulletSpeed,  'strength', 1);
    bulletArr.push(newLeftBullet, newMidLeftBullet, newMidRightBullet, newRightBullet);
  },
  'Lv.4': function(player, bulletSpeed, bulletArr){
    let newLeftBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset - 30, player.y + 16, -bulletSpeed/3, -bulletSpeed,  'strength', 1);
    let newMidLeftBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset - 15, player.y, -bulletSpeed/4, -bulletSpeed,  'normal', 1);
    let newMidBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset, player.y, 0, -bulletSpeed,  'super', 2);
    let newMidRightBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset + 15, player.y, bulletSpeed/4, -bulletSpeed,  'normal', 1);
    let newRightBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset + 30, player.y + 16, bulletSpeed/3, -bulletSpeed,  'strength', 1);
    bulletArr.push(newLeftBullet, newMidLeftBullet, newMidBullet, newMidRightBullet, newRightBullet);
  },
  'Lv.5': function(player, bulletSpeed, bulletArr){
    let newLeftBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset - 30, player.y + 16, -bulletSpeed/3, -bulletSpeed,  'strength', 1);
    let newMidLeftBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset - 15, player.y, -bulletSpeed/4, -bulletSpeed,  'normal', 1);    
    let newSuperLeftBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset - 5, player.y, 0, -bulletSpeed,  'super', 1);
    let newSuperRightBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset + 5, player.y, 0, -bulletSpeed,  'super', 1);
    let newMidRightBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset + 15, player.y, bulletSpeed/4, -bulletSpeed,  'normal', 1);
    let newRightBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset + 30, player.y + 16, bulletSpeed/3, -bulletSpeed,  'strength', 1);
    bulletArr.push(newLeftBullet, newMidLeftBullet, newSuperLeftBullet, newSuperRightBullet, newMidRightBullet, newRightBullet);
  },
  'Lv.6': function(player, bulletSpeed, bulletArr){
    let newLeftBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset - 30, player.y + 16, -bulletSpeed/3, -bulletSpeed,  'strength', 1);
    let newMidLeftBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset - 15, player.y, -bulletSpeed/4, -bulletSpeed,  'strength', 1);    
    let newSuperLeftBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset - 5, player.y, 0, -bulletSpeed,  'super', 1);
    let newSuperRightBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset + 5, player.y, 0, -bulletSpeed,  'super', 1);
    let newMidRightBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset + 15, player.y, bulletSpeed/4, -bulletSpeed,  'strength', 1);
    let newRightBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset + 30, player.y + 16, bulletSpeed/3, -bulletSpeed,  'strength', 1);
    bulletArr.push(newLeftBullet, newMidLeftBullet, newSuperLeftBullet, newSuperRightBullet, newMidRightBullet, newRightBullet);
  },
  'Lv.7': function(player, bulletSpeed, bulletArr){
    let newLeftBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset - 30, player.y + 16, -bulletSpeed/3, -bulletSpeed,  'super', 1);
    let newMidLeftBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset - 15, player.y, -bulletSpeed/4, -bulletSpeed,  'strength', 1);    
    let newSuperLeftBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset - 5, player.y, 0, -bulletSpeed,  'super', 1);
    let newSuperRightBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset + 5, player.y, 0, -bulletSpeed,  'super', 1);
    let newMidRightBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset + 15, player.y, bulletSpeed/4, -bulletSpeed,  'strength', 1);
    let newRightBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset + 30, player.y + 16, bulletSpeed/3, -bulletSpeed,  'super', 1);
    bulletArr.push(newLeftBullet, newMidLeftBullet, newSuperLeftBullet, newSuperRightBullet, newMidRightBullet, newRightBullet);
  },
  'Lv.8': function(player, bulletSpeed, bulletArr){
    let newLeftBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset - 30, player.y + 16, -bulletSpeed/3, -bulletSpeed,  'super', 1);
    let newMidLeftBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset - 15, player.y, -bulletSpeed/4, -bulletSpeed,  'super', 1);    
    let newSuperLeftBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset - 5, player.y, 0, -bulletSpeed,  'super', 1);
    let newSuperRightBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset + 5, player.y, 0, -bulletSpeed,  'super', 1);
    let newMidRightBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset + 15, player.y, bulletSpeed/4, -bulletSpeed,  'super', 1);
    let newRightBullet = PlayerBullet.getBullet(player.x + player.width/2 + offset + 30, player.y + 16, bulletSpeed/3, -bulletSpeed,  'super', 1);
    bulletArr.push(newLeftBullet, newMidLeftBullet, newSuperLeftBullet, newSuperRightBullet, newMidRightBullet, newRightBullet);
  }
};

/******** 道具策略对象 ********/
//可扩展：僚机、副武器、防护罩
let propStrategy = {
  'shield': function(player){
    player.shieldStatus = 2
    //清除旧盾牌时间计时器
    clearTimeout(player.shieldTimer)
    //更新计时器，15秒的满能量盾，3秒的没能里昂的盾
    player.shieldTimer = setTimeout(function(){        
      player.shieldStatus = 1;
      player.shieldTimer = setTimeout(function(){
        player.shieldStatus = 0;          
      }, config.shieldWeakTime);
    }, config.shieldTime);
  },
  'bomb': function(player){
    let bombNum = player.bomb;
    if(bombNum < config.bombMax){
      player.bomb = bombNum + 1;      
    }
  },
  'wing': function(player){
    if(player.wings.length < 2){      
      player.wings.push(new Wing(player.wings.length==0))
    }
    else{
      player.wings.forEach(wing => {
        if(wing.weaponLevel < Object.keys(wingBulletStrategy).length - 1)
          ++wing.weaponLevel;
      });
    }      
  },
  'weapon': (function(){
    let upperLimit = Object.keys(playerBulletStrategy).length;
    return function(player){
      let {weaponLevel} = player;
      if(weaponLevel < upperLimit - 1){
        player.weaponLevel = weaponLevel + 1;
      }
      // if(!player.isFullFirepower){
      //   player.isFullFirepower = true;
      // }else{
      //   clearTimeout(player.firepowerTimer);
      // }
      // player.firepowerTimer = setTimeout(function(){
      //   player.isFullFirepower = false;
      //   player.weaponLevel = 0;
      // }, config.firepowerTime);
    }
  })()
};

/******** 智能AI策略对象 ********/
let AIStrategy = {
  'AI-I': function(ctrler){ //横飞智能机
    let {smallPlaneHeight, canvasHeight, canvasWidth} = config;
    let {gameLevel, enemyArr} = ctrler;
    let randomY = randomNum(100, canvasHeight - config['smallPlaneWidth'] - 100);
    let cnt = 0;
    ctrler.AITimer = setInterval(() => {
      if(cnt === 8 + gameLevel){
        clearInterval(ctrler.AITimer);
      }
      let newEnemy1 = Enemy.getEnemy(
        -smallPlaneHeight, 
        randomY - 80,
        'smallPlane',
        4 + 0.2*gameLevel,
        0,
        true,
        'right'
      );
      let newEnemy2 = Enemy.getEnemy(
        canvasWidth, 
        randomY,
        'smallPlane',
        -4 - 0.2*gameLevel,
        0,
        true,
        'left'
      );
      let newEnemy3 = Enemy.getEnemy(
        -smallPlaneHeight, 
        randomY + 80,
        'smallPlane',
        4 + 0.2*gameLevel,
        0,
        true,
        'right'
      );
      enemyArr.push(newEnemy1, newEnemy2, newEnemy3);
      cnt++;
    }, 300);
  },
  'AI-II': function(ctrler){ //锁敌智能机
    let {smallPlaneWidth, smallPlaneHeight, canvasWidth} = config;
    let {gameLevel, enemyArr, player} = ctrler;
    let cnt = 0;
    ctrler.AITimer = setInterval(() => {
      if(cnt === 8 + gameLevel){
        clearInterval(ctrler.AITimer);
      }
      let newEnemy1 = Enemy.getEnemy(
        -smallPlaneWidth,
        -smallPlaneHeight,
        'smallPlane',
        (player.x + player.width/2) / 90,
        (player.y + player.height/2) / 90,
        true
      );
      let newEnemy2 = Enemy.getEnemy(
        canvasWidth,
        -smallPlaneHeight,
        'smallPlane',
        (player.width/2 -(canvasWidth - player.x)) / 90,
        (player.y + player.height/2) / 90,
        true
      );
      enemyArr.push(newEnemy1, newEnemy2);
      cnt++;
    }, 300);
  },
  'AI-III': function(ctrler){ //并飞智能机
    let {mediumPlaneWidth, mediumPlaneHeight, canvasWidth} = config;
    let {gameLevel, enemyArr} = ctrler;
    let cnt = 0;
    let randomX = randomNum(0, canvasWidth/2 - mediumPlaneWidth);
    ctrler.AITimer = setInterval(() => {
      if(cnt === 7 + gameLevel){
        clearInterval(ctrler.AITimer);
      }
      let newEnemy1 = Enemy.getEnemy(
        randomX,
        -mediumPlaneHeight,
        'mediumPlane',
        0,
        3 + 0.2*gameLevel,
        true
      );
      let newEnemy2 = Enemy.getEnemy(
        canvasWidth - randomX - mediumPlaneWidth,
        -mediumPlaneHeight,
        'mediumPlane',
        0,
        3 + 0.2*gameLevel,
        true
      );
      enemyArr.push(newEnemy1, newEnemy2);
      cnt++;
    }, 500);
  }
};

/******** Boss弹幕策略对象 ********/
let bossBulletStrategy = {
  '1': function(boss, fireX, fireY, gameLevel, ratio){ //直线弹幕
    if(boss.showTime % 10 === 0){
      let newBullet = BossBullet.getBullet(fireX, fireY, 0, 7 + 0.5*gameLevel);
      boss.bullets.push(newBullet);
    }
  },
  '2': function(boss, fireX, fireY, gameLevel, ratio){ //锁定弹幕
    if(boss.showTime % 25 === 0){
      let newBullet = BossBullet.getBullet(fireX, fireY, (6 + 0.2*gameLevel) * ratio, 6 + 0.2*gameLevel);
      boss.bullets.push(newBullet);
    }
  },
  '3': function(boss, fireX, fireY, gameLevel, ratio){ //散弹弹幕
    if(boss.showTime % 20 === 0){
      let newBullet = BossBullet.getBullet(fireX, fireY, 0, 8 + 0.2*gameLevel);
      let newLeftBullet = BossBullet.getBullet(fireX, fireY, -4, 6 + 0.2*gameLevel);
      let newRightBullet = BossBullet.getBullet(fireX, fireY, 4, 6 + 0.2*gameLevel);
      boss.bullets.push(newBullet, newLeftBullet, newRightBullet);
    }
  },
  '4': function(boss, fireX, fireY, gameLevel, ratio){ //横弹幕
    if(boss.showTime % 33 === 0){
      let newBullet = BossBullet.getBullet(fireX - 60, fireY, 3 * ratio, 3);
      let newLeftBullet = BossBullet.getBullet(fireX, fireY, 3 * ratio, 3);
      let newRightBullet = BossBullet.getBullet(fireX + 60, fireY, 3 * ratio, 3);
      boss.bullets.push(newBullet, newLeftBullet, newRightBullet);
    }
  },
  '5': function(boss, fireX, fireY, gameLevel, ratio){ //加速弹幕
    if(boss.showTime % 33 === 0){
      let newBullet = BossBullet.getBullet(fireX - 120, fireY - 30, -1, 1, 0, 0.3 + 0.01*gameLevel);
      let newLeftBullet = BossBullet.getBullet(fireX, fireY, 0, 1, 0, 0.3 + 0.01*gameLevel);
      let newRightBullet = BossBullet.getBullet(fireX + offset + 150, fireY - 30, 1, 1, 0, 0.3 + 0.01*gameLevel);
      boss.bullets.push(newBullet, newLeftBullet, newRightBullet);
    }
  }
}

export {
  wingBulletStrategy,
  playerBulletStrategy,
  propStrategy,
  AIStrategy,
  bossBulletStrategy
}