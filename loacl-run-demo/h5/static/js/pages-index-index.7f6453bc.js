(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"10de":function(t,i,e){"use strict";e.r(i);var o=e("6104"),n=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(i,t,function(){return o[t]})}(a);i["default"]=n.a},"10ef":function(t,i,e){"use strict";var o=e("288e");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n=o(e("c4cf")),a={components:{dragGuide:n.default},data:function(){return{dragImgW:200,dragImgH:200,dragRow:3,scrollH:"100%",scrollW:"100%"}}};i.default=a},"328a":function(t,i,e){"use strict";e.r(i);var o=e("ae2b"),n=e("5dc4");for(var a in n)"default"!==a&&function(t){e.d(i,t,function(){return n[t]})}(a);var r,s=e("f0c5"),l=Object(s["a"])(n["default"],o["b"],o["c"],!1,null,"0ba60568",null,!1,o["a"],r);i["default"]=l.exports},"5dc4":function(t,i,e){"use strict";e.r(i);var o=e("10ef"),n=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(i,t,function(){return o[t]})}(a);i["default"]=n.a},6104:function(t,i,e){"use strict";var o=e("288e");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n=o(e("e814"));e("c5f6");var a={name:"dragGuide",props:{imgHeight:{type:Number,default:200},imgWidth:{type:Number,default:200},row:{type:Number,default:3},scrollW:{type:String,default:"100%"},scrollH:{typef:String,default:"100%"}},data:function(){return{openAlter:!1,showTip:!0,alted:!1,leave:NaN,column:NaN,moveLimit:{column:[],row:[]},cellW:NaN,cellH:NaN,itemBox:{width:0,height:0,top:0,left:0},moving:!1,movingClass:NaN,move:{beforeX:0,beforeY:0,movingX:"",movingY:"",tarIndex:""},image:[{img:"goods"},{img:"invite"},{img:"levelup"},{img:"pay"},{img:"levelupdetail"},{img:"mycart"},{img:"record"},{img:"store"},{img:"wallet"}]}},created:function(){var t=this;uni.getStorage({key:"newModule",success:function(i){t.image=i.data},complete:function(){t.imgInit()}})},mounted:function(){this.image.length&&this.init()},beforeDestroy:function(){uni.setStorage({key:"newModule",data:this.image})},methods:{imghandle:function(t){return"../../static/all/"+t+".png"},imgInit:function(){for(var t=0,i=this.image;t<=this.image.length-1;t++)i[t].order=t+1,i[t].moving=!1,i[t].url="地址"+(t+1);this.updateArr(this.image.length)},init:function(){var t=this,i=uni.createSelectorQuery().in(this).select(".item-box");i.boundingClientRect(function(i){t.itemBox.width=i.width,t.itemBox.height=i.height,t.itemBox.top=i.top,t.itemBox.left=i.left,t.updateLimit()}).exec()},distX:function(t){return this.image[t].moving?this.move.movingX:0},distY:function(t){return this.image[t].moving?this.move.movingY:0},go:function(t){this.openAlter||uni.showToast({duration:2e3,title:"跳转到"+t+"页",icon:"none"})},updateArr:function(t){this.leave=t%this.row,this.column=this.leave?(0,n.default)(t/this.row+1):t/this.row},updateLimit:function(){this.moveLimit.column=[],this.moveLimit.row=[];for(var t=0;t<this.column;t++){var i={};i.top=0-this.itemBox.height/this.column*t,i.bottom=this.itemBox.height-this.itemBox.height*(t+1)/this.column,this.moveLimit.column.push(i)}for(var e=0;e<this.row;e++){var o={};o.left=0-this.itemBox.width/this.row*e,o.right=this.itemBox.width-this.itemBox.width*(e+1)/this.row,this.moveLimit.row.push(o)}this.cellW=this.itemBox.width/this.row,this.cellH=this.itemBox.height/this.column,this.alted=!1},del:function(t){if(this.moving)return!1;this.image.splice(t,1),this.updateArr(this.image.length),this.init()},updateImg:function(t){t===this.alted&&(this.init(),this.updateLimit())},addModule:function(){uni.reLaunch({url:"/pages/add/add"})},getPosi:function(t){var i={};if(t<this.row)i.column=0,i.row=t-1;else{var e=t%this.row;e?(i.column=(0,n.default)(t/this.row),i.row=e-1):(i.column=t/this.row-1,i.row=this.row-1)}return i},getTar:function(t,i,e){var o,n,a=this.cellW,r=this.cellH;t<0&&t<=this.moveLimit.row[e.row].left||t>0&&t>=this.moveLimit.row[e.row].right?t<0?(t=0,o=(this.moveLimit.row[e.row].left/a).toFixed()):(t=this.moveLimit.row[e.row].right,o=(this.moveLimit.row[e.row].right/a).toFixed()):o=-.5<t/a&&t/a<=0?0:(t/a).toFixed(),i<0&&i<=this.moveLimit.column[e.column].top||i>0&&i>=this.moveLimit.column[e.column].bottom?i<0?(i=this.moveLimit.column[e.column].top,n=this.moveLimit.column[e.column].top/r.toFixed()):(i=this.moveLimit.column[e.column].bottom,n=this.moveLimit.column[e.column].bottom/r.toFixed()):n=-.5<i/r&&i/r<=0?0:(i/r).toFixed(),o=Number(o),n=Number(n);var s=n?e.column+n:e.column,l=o?e.row+o:e.row,h=s?s*this.row+l:l;return{x:t,y:i,tarX:o,tarY:n,tar:h}},exchangePosi:function(t,i,e,o,n){var a,r,s,l,h={};""!==this.move.tarIndex?(s=this.move.tarIndex,this.image[s].moving=!1):(s=o,this.image[o].moving=!1),l=!(this.image[n]instanceof Object)&&n,this.move.tarIndex=l?this.image.length-1:n,h.img=this.image[s].img,h.url=this.image[s].url,h.order=this.image[s].order,r=Math.abs(this.move.tarIndex-s)+1,a=s<this.move.tarIndex?1:-1;for(var c=1,m=s;c<=r;c++)c===r?(this.image[m].img=h.img,this.image[m].url=h.url,this.image[m].order=h.order):(this.image[m].img=this.image[m+a].img,this.image[m].url=this.image[m+a].url,this.image[m].order=this.image[m+a].order,m+=a);return this.move.beforeX+=t*this.cellW,this.move.beforeY+=i*this.cellH,l&&(this.move.beforeX-=(l-(this.image.length-1))*this.cellW),!!l&&l-(this.image.length-1)},itemTap:function(t,i){if(this.openAlter){if(this.moving)return!1;this.moving=!0,this.image[i].moving=!this.image[i].moving,this.movingClass=i,this.move.beforeX=t.touches[0].clientX,this.move.beforeY=t.touches[0].clientY}},itemMove:function(t,i){if(this.openAlter){var e=""!==this.move.tarIndex?this.getPosi(this.move.tarIndex+1):this.getPosi(i+1),o=this.getTar(t.changedTouches[0].clientX-this.move.beforeX,t.changedTouches[0].clientY-this.move.beforeY,e),n=o.x,a=o.y,r=o.tarX,s=o.tarY,l=o.tar,h=""!==this.move.tarIndex?this.move.tarIndex:i;if((r||s)&&(!this.leave||h!==this.image.length-1||this.image[l]instanceof Object)){var c=this.exchangePosi(r,s,e,i,l);this.move.movingX=c?n:n-r*this.cellW,this.move.movingY=a-s*this.cellH,this.movingClass=this.move.tarIndex,this.image[this.move.tarIndex].moving=!0}else this.move.movingX=n,this.move.movingY=a}},stopMove:function(t,i){if(this.openAlter)for(var e in""!==this.move.tarIndex?this.image[this.move.tarIndex].moving=!1:this.image[i].moving=!1,this.move.tarIndex="",this.movingClass=NaN,this.moving=!1,console.log("最终距离",this.move.movingX,this.move.movingY),this.move)this.move[e]=""}}};i.default=a},8923:function(t,i,e){"use strict";var o,n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"body"},[e("v-uni-scroll-view",{style:{width:t.scrollW,height:t.scrollH},attrs:{"scroll-y":"true"}},[e("v-uni-view",{staticClass:"item-box"},t._l(t.image,function(i,o){return e("v-uni-view",{key:o,class:{moving:t.movingClass===o},style:{transform:"translate("+t.distX(o)+"px,"+t.distY(o)+"px)",width:"calc(100% / "+t.row+")",position:"relative"},on:{touchstart:function(i){i.stopPropagation(),arguments[0]=i=t.$handleEvent(i),t.itemTap(i,o)},touchmove:function(i){i.stopPropagation(),i.preventDefault(),arguments[0]=i=t.$handleEvent(i),t.itemMove(i,o)},touchend:function(i){i.stopPropagation(),arguments[0]=i=t.$handleEvent(i),t.stopMove(i,o)}}},[e("v-uni-image",{style:{width:t.imgWidth+"rpx",height:t.imgHeight+"rpx"},attrs:{src:t.imghandle(i.img)},on:{touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t.go(i.url)},load:function(i){arguments[0]=i=t.$handleEvent(i),t.updateImg(o)}}}),e("v-uni-image",{directives:[{name:"show",rawName:"v-show",value:t.openAlter,expression:"openAlter"}],staticClass:"del",attrs:{src:"../../static/del.png",mode:"widthFix"},on:{touchstart:function(i){i.stopPropagation(),arguments[0]=i=t.$handleEvent(i),t.del(o)},touchmove:function(i){i.stopPropagation(),arguments[0]=i=t.$handleEvent(i)},touchend:function(i){i.stopPropagation(),arguments[0]=i=t.$handleEvent(i)}}})],1)}),1),e("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.openAlter&&t.showTip,expression:"openAlter && showTip"}],staticClass:"tip-box"},[e("v-uni-image",{attrs:{src:"../../static/light.png",mode:"widthFix"}}),e("v-uni-text",[t._v("点此添加功能,拖动功能可以调整排序")]),e("v-uni-text",{on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.showTip=!t.showTip}}},[t._v("X")]),e("v-uni-view")],1),e("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.openAlter,expression:"openAlter"}],staticClass:"detail-box"},[e("v-uni-image",{staticClass:"module-img",attrs:{src:"/static/add.png",mode:"widthFix"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.addModule.apply(void 0,arguments)}}}),e("v-uni-text",[t._v("添加板块")])],1),e("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:!t.openAlter,expression:"!openAlter"}],staticClass:"space"}),e("v-uni-view",{staticClass:"control-btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.openAlter=!t.openAlter}}}),e("v-uni-text",{class:{"hide-btn":t.openAlter}},[t._v("管理版面")]),e("v-uni-text",{class:{"hide-btn":!t.openAlter}},[t._v("保存")])],1)],1)},a=[];e.d(i,"b",function(){return n}),e.d(i,"c",function(){return a}),e.d(i,"a",function(){return o})},ac48:function(t,i,e){"use strict";var o=e("fbca"),n=e.n(o);n.a},ae2b:function(t,i,e){"use strict";var o,n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("drag-guide",{attrs:{imgWidth:t.dragImgW,imgHeight:t.dragImgH,row:t.dragRow,scrollH:t.scrollH,scrollW:t.scrollW}})},a=[];e.d(i,"b",function(){return n}),e.d(i,"c",function(){return a}),e.d(i,"a",function(){return o})},c4cf:function(t,i,e){"use strict";e.r(i);var o=e("8923"),n=e("10de");for(var a in n)"default"!==a&&function(t){e.d(i,t,function(){return n[t]})}(a);e("ac48");var r,s=e("f0c5"),l=Object(s["a"])(n["default"],o["b"],o["c"],!1,null,"4ef49cb0",null,!1,o["a"],r);i["default"]=l.exports},fab23:function(t,i,e){i=t.exports=e("2350")(!1),i.push([t.i,".body[data-v-4ef49cb0]{width:100%;overflow:hidden}.item-box[data-v-4ef49cb0]{width:100%;height:auto;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row wrap;flex-flow:row wrap;position:relative}.item-box>uni-view[data-v-4ef49cb0]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-align-content:center;align-content:center}.moving[data-v-4ef49cb0]{z-index:3}.del[data-v-4ef49cb0]{width:%?50?%;height:%?50?%;position:absolute!important;right:%?10?%;top:%?10?%;z-index:2}.item-box uni-image[data-v-4ef49cb0]{border-radius:%?100?%}.tip-box[data-v-4ef49cb0]{display:-webkit-box;display:-webkit-flex;display:flex;background:#e5f0ff;border-radius:%?22?%;margin:%?20?% auto;position:relative}.tip-box uni-image[data-v-4ef49cb0]{width:%?22?%;height:%?24?%;margin:auto %?5?% auto %?19?%}.tip-box uni-text[data-v-4ef49cb0]{font-size:%?22?%;line-height:%?44?%;font-weight:500;color:#5392f3;display:inline-block;-webkit-box-flex:7;-webkit-flex:7;flex:7}.tip-box uni-text+uni-text[data-v-4ef49cb0]{font-size:%?15?%;line-height:%?44?%;display:inline-block;-webkit-box-flex:1;-webkit-flex:1;flex:1}.tip-box>uni-view[data-v-4ef49cb0]{margin-left:%?24?%;float:left;width:0;height:0;border-width:%?13?%;border-style:solid;border-color:#e5f0ff transparent transparent transparent;position:absolute;left:%?77?%;bottom:%?-13?%}.control-btn[data-v-4ef49cb0]{width:%?121?%;height:%?101?%;background:#5392f3;opacity:.1;border:%?1?% solid #000;border-radius:%?100?% 0 0;right:0;bottom:%?0?%;position:absolute;z-index:999}.control-btn+uni-text[data-v-4ef49cb0]{display:block;right:%?18?%;bottom:%?30?%;width:%?60?%;height:%?50?%;font-size:%?24?%;font-weight:500;color:#5392f3;text-align:center;position:absolute}.control-btn+uni-text+uni-text[data-v-4ef49cb0]{right:%?18?%;display:block;bottom:%?30?%;width:%?60?%;font-size:%?24?%;font-weight:500;color:#5392f3;text-align:center;position:absolute}.hide-btn[data-v-4ef49cb0]{display:none!important}.space[data-v-4ef49cb0]{width:100%;height:%?100?%}.detail-box[data-v-4ef49cb0]{margin-top:%?63?%;height:%?168?%;width:%?250?%;text-align:center}.detail-box uni-text[data-v-4ef49cb0]{height:%?30?%;display:block;font-size:%?25?%;font-weight:500;color:#222}.detail-box uni-image[data-v-4ef49cb0]{width:%?114?%;height:%?114?%;background:#f5f7f9;border-radius:50%;display:block;margin:0 auto %?24?% auto}",""])},fbca:function(t,i,e){var o=e("fab23");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var n=e("4f06").default;n("598fd8e1",o,!0,{sourceMap:!1,shadowMode:!1})}}]);