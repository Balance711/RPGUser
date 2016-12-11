//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    private onResourceLoadError(event: RES.ResourceEvent): void {

        console.warn("Group:" + event.groupName + " has failed to load");

        this.onResourceLoadComplete(event);
    }
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene(): void {
        var pet = new Pet(100, 10);

        var user = new User(2048, 15, pet);

        var hero1 = new Hero(true, HeroQuality.SR, StarQuality.FIFE,//
            AttributeQuality.S, AttributeQuality.B, AttributeQuality.B, AttributeQuality.S, AttributeQuality.S, 32);

        var hero2 = new Hero(false, HeroQuality.SR, StarQuality.FOUR,//
            AttributeQuality.S, AttributeQuality.B, AttributeQuality.B, AttributeQuality.A, AttributeQuality.A, 30);

        var hero3 = new Hero(true, HeroQuality.SSR, StarQuality.FOUR,//
            AttributeQuality.B, AttributeQuality.S, AttributeQuality.C, AttributeQuality.S, AttributeQuality.B, 26);

        var hero4 = new Hero(false, HeroQuality.R, StarQuality.THREE,//
            AttributeQuality.A, AttributeQuality.B, AttributeQuality.B, AttributeQuality.S, AttributeQuality.A, 20);

        user.AddHero(hero1);
        user.AddHero(hero2);
        user.AddHero(hero3);
        user.AddHero(hero4);

        var sword = new Equipment(3, 15);
        hero1.AddEquipment(sword);
        var shoe = new Equipment(1, 10);
        hero2.AddEquipment(shoe);
        var greenjewel = new Jewel(1, 10);
        sword.Addjewel(greenjewel);

        console.log("User_FightPower:" + user.FightPower);
        
    }
    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    private startAnimation(result: Array<any>): void {
        var self: any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr: Array<Array<egret.ITextElement>> = [];
        for (var i: number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change: Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield: egret.TextField, textFlow: Array<egret.ITextElement>): void {
        textfield.textFlow = textFlow;
    }
}

//Cache
var Cache: MethodDecorator = (target: any, propertyName, desc: PropertyDescriptor) => {
    const getter = desc.get;
    desc.get = function () {
        console.log("cache");
        return getter.apply(this);
    }
    return desc;
}