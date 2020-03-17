<template>
	<view class="body" >
		<scroll-view scroll-y="true" :style="{width:scrollW,height:scrollH,position:'relative'}">
			
			<view class="item-box">
				<view 
					v-for="(item,index) in image"  
					:key=index 
					:class="{'moving':movingClass===index}" 
					:style="{transform:'translate('+distX(index)+'px'+','+distY(index)+'px)',width: 'calc(100% / '+row+')' , }"
					@touchstart="itemTap($event,index)" 
					@touchmove.stop="itemMove($event,index)" 
					@touchend="stopMove($event,index)">
					<image 
						:src="imghandle(item.img)" 
						mode="widthFix"  
						@tap="go(item.url)" 
						@load="updateImg(index)"
						:style="{width:imgWidth+'rpx',height:imgHeight+'rpx'}"
						/>
				</view>
			</view>
			
			<view class="tip-box" v-show="openAlter && showTip">
				<image src="../../static/light.png" mode="widthFix" />
				<text>点此添加功能,拖动功能可以调整排序</text>
				<text @tap="showTip=!showTip">X</text>
				<view></view>
			</view>
			
			<view class="detail-box" v-show="openAlter">
				<image class="module-img" src="../../static/add.png" mode="widthFix" @tap="addModule" />
				<text>添加板块</text>
			</view>
			<view class="space" v-show="!openAlter"></view>
			<view class="control-btn" @tap="openAlter=!openAlter"></view>
			<text :class="{ 'hide-btn': openAlter }">管理版面</text>
			<text :class="{ 'hide-btn': !openAlter }">保存</text>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"dragGuide",
		props: {
			imgHeight: {
				type: Number,
				default: 200
			},
			imgWidth:{
				type:Number,
				default: 200
			},
			row:{
				type:Number, // 每行3个=列数
				default:3
			},
			scrollW:{
				type:String,
				default:'100%'
			},
			scrollH:{
				typef:String,
				default:'100%'
			}
		},
		data() {
			return {
				openAlter:false,
				showTip:true,
				alted:false,
				leave: NaN,    //取余多余的数量
				column: NaN,  //行数  有多少个横行
				moveLimit: {    //所有图片的移动总区域
					column: [],
					row: []
				},
				cellW:NaN,     //每一个图片格子的宽度
				cellH:NaN,    //每一个图片格子的高度
				itemBox: {     
					width: 0,
					height: 0,
					top: 0,
					left: 0
				},
				movingClass: NaN, 
				move: {
					beforeX: 0,
					beforeY: 0,
					movingX: '',
					movingY: '',
					tarIndex: '',
				},
				image: [           
					{img: "goods"},
					{img: "invite"},
					{img: "levelup"},
					{img: "pay"},
					{img: "levelupdetail"},
					{img: "mycart"},
					{img: "record"},
					{img: "store"},
					{img: "wallet"}
				]
			}
		},
		created() {
			uni.getStorage({
				key:"newModule",
				success: (res) => {
					this.image=res.data
				},
				complete: () =>{
					this.imgInit()
				}
			})
		},
		mounted() {
			if (this.image.length) {
				this.init()
			}
		},
		beforeDestroy() {
			uni.setStorage({
				key:"newModule",
				data:this.image
			})
		},
		methods: {
			imghandle(url) {
				return "../../static/all/" + url + ".png" 
			},
			imgInit(){
				for(let i=0,img=this.image;i<=this.image.length-1;i++){
					img[i].order=i+1 //从小到大排列
					img[i].moving=false
					img[i].url='地址'+(i+1)
				}
				this.updateArr(this.image.length);
			},
			init() { 
				// 设置拖拽区域信息
				let itemBox = uni.createSelectorQuery().in(this).select('.item-box')
				itemBox.boundingClientRect(data => {
					this.itemBox.width = data.width // 设置拖拽范围的总宽度
					this.itemBox.height = data.height // 设置拖拽范围的总高度
					this.itemBox.top = data.top // 设置拖拽范围的上边界坐标
					this.itemBox.left = data.left // 设置拖拽范围的左边界坐标
					this.updateLimit()
				}).exec()
			},
			test(){
				selectorQuery.selectViewport()
			},
			distX(i) {	// 移动函数
				return this.image[i].moving ? this.move.movingX : 0
			},
			distY(i) {
				return this.image[i].moving ? this.move.movingY : 0
			},
			go(url){
				if(!this.openAlter){
					uni.showToast({
						duration:2000,
						title:'跳转到'+url+'页',
						icon:'none'
					})
				}
			},
			updateArr(len){
				//  根据图片数量生成几行几列
				this.leave = (len % this.row)
				this.column = this.leave ? parseInt(len / this.row + 1) : (len / this.row)
			},
			updateLimit(){
				this.moveLimit.column=[];
				this.moveLimit.row=[];
				//根据行的数量来进行遍历 计算top bottom
				for (let i = 0; i < this.column; i++) {
					let c = {};
					c.top = 0 - this.itemBox.height / this.column * i
					c.bottom = this.itemBox.height - this.itemBox.height * (i + 1) / this.column
					this.moveLimit.column.push(c)
				}
				//根据列的数量进行遍历 计算left right
				for (let i = 0; i < this.row; i++) {
					let r = {};
					r.left = 0 - this.itemBox.width / this.row * i
					r.right = this.itemBox.width - this.itemBox.width * (i + 1) / this.row
					this.moveLimit.row.push(r)
				}
				//每行的宽高
				this.cellW = this.itemBox.width / this.row
				this.cellH = this.itemBox.height / this.column
				this.alted = false
			},
			updateImg(index){
				if(index===this.alted){
					this.init()
					this.updateLimit()
				}
			},
			addModule(){
				uni.reLaunch({
					url:"/pages/add/add"
				})
			},
			getPosi(num) { 
				let index = {}
				if (num < this.row) {
					index.column = 0
					index.row = num-1
					//第一行以外的
				} else {       
					let leave = num % this.row;
					if (leave) {
						//非整除 
						index.column = parseInt(num / this.row)
						index.row = leave - 1
					} else {
						index.column = (num / this.row) - 1
						index.row = this.row - 1
					}
				}
				return index 
			},
			getTar(x,y,index){
				let tarX,tarY,width=this.cellW;let height=this.cellH;
				//	左右移动	判断边界
				if ((x < 0 && x <= this.moveLimit.row[index.row].left) || (x > 0 && x >= this.moveLimit.row[index.row].right)){
						if(x<0){  //左移动
							x = 0
							tarX = (this.moveLimit.row[index.row].left / width) .toFixed()   
						}else{   //右移动
							x = this.moveLimit.row[index.row].right
							tarX = (this.moveLimit.row[index.row].right / width) .toFixed()
						}
				//正常移动未到边界
				} else {
						tarX = (-0.5 < x / width && x / width <= 0) ? 0 : (x / width).toFixed() //特殊
				}
				//	上下移动	是否达到上下边界
				if( (y < 0 && y <= this.moveLimit.column[index.column].top) || (y > 0 && y >= this.moveLimit.column[index.column].bottom)){
						if(y<0){  //上移动
							y = this.moveLimit.column[index.column].top
							tarY = this.moveLimit.column[index.column].top / height.toFixed()
						}else{   //下移动
							y = this.moveLimit.column[index.column].bottom
							tarY = this.moveLimit.column[index.column].bottom / height.toFixed()
						}
				//正常移动未到边界
				} else {
						tarY = (-0.5 < y / height && y / height <= 0) ? 0 : (y / height).toFixed()
				}
				tarX = Number(tarX)
				tarY = Number(tarY)
				let column = tarY ? index.column + tarY : index.column,
					row = tarX ? index.row + tarX : index.row,
					tar = column ? column * this.row + row : row; //第一行 0 or not
				return {x,y,tarX,tarY,tar}
			},
			exchangePosi(tarX,tarY,index,i,tar){
				let sort,
					time,
					ready,	
					space,
					save={};	
				if(this.move.tarIndex!==''){		
					ready=this.move.tarIndex
					this.image[ready].moving=false
				}else{
					ready=i
					this.image[i].moving=false
				}
				space = this.image[tar] instanceof Object ? false : tar 
				this.move.tarIndex = space ? this.image.length-1 : tar
				// 改变图片和位置
				save.img=this.image[ready].img,save.url=this.image[ready].url,save.order=this.image[ready].order; 
				time=Math.abs(this.move.tarIndex-ready)+1 	
				sort=ready < this.move.tarIndex ? 1 : -1 
				for(let start=1,r=ready;start<=time;start++){
					if(start===time){
						this.image[r].img=save.img
						this.image[r].url=save.url
						this.image[r].order=save.order
					}else{
						this.image[r].img=this.image[r+sort].img
						this.image[r].url=this.image[r+sort].url
						this.image[r].order=this.image[r+sort].order
						r+=sort
					}
				}
					this.move.beforeX+=tarX*this.cellW	//原点变化
					this.move.beforeY+=tarY*this.cellH
				if(space){ //末位差别
					this.move.beforeX-=(space-(this.image.length-1))*this.cellW
				}
				return space ? space-(this.image.length-1) : false
			},
			itemTap(e, i) {	
				if(this.openAlter){
					this.image[i].moving = !this.image[i].moving	
					this.movingClass = i
					this.move.beforeX = e.touches[0].clientX	
					this.move.beforeY = e.touches[0].clientY
				}
			},
			itemMove(e, i) {
				if(this.openAlter){
					let index = this.move.tarIndex!=='' ? this.getPosi(this.move.tarIndex+1) :this.getPosi(i+1)
					let {x,y,tarX,tarY,tar} =this.getTar(e.changedTouches[0].clientX - this.move.beforeX,e.changedTouches[0].clientY - this.move.beforeY,index)
					let now = this.move.tarIndex!=='' ? this.move.tarIndex : i
					if( (tarX || tarY) && !(this.leave && now===this.image.length-1 && !(this.image[tar] instanceof Object) ) ){
						let space=this.exchangePosi(tarX,tarY,index,i,tar)
						this.move.movingX= space ? x : x-tarX*this.cellW //特殊处理
						this.move.movingY= y-tarY*this.cellH
						this.movingClass=this.move.tarIndex
						this.image[this.move.tarIndex].moving=true
					}else{
						this.move.movingX=x
						this.move.movingY=y
					}
				}

			},
			stopMove(e, i) {
				if(this.openAlter){
					this.move.tarIndex!=='' ? this.image[this.move.tarIndex].moving=false : this.image[i].moving=false
					this.move.tarIndex=''
					this.movingClass = NaN
					console.log('最终距离', this.move.movingX, this.move.movingY)
					for (let value in this.move) { // 重置位置
						this.move[value] =''
					}
				}
			}
		}
	}
</script>

<style>
	.body {
		width: 100%;
		overflow: hidden;
	}

	.item-box {
		width: 100%;
		height: auto;
		display: flex;
		flex-flow: row wrap;
		position: relative;
	}

	.moving {
		z-index: 2;
	}

	.item-box image {
		margin: 0 auto;
		display: block;
		border-radius: 100rpx;
	}

	.tip-box {
		display: flex;
		background: #e5f0ff;
		border-radius: 22rpx;
		margin: 20rpx auto;
		position: relative;
	}
	.tip-box image {
		width: 22rpx;
		height: 24rpx;
		margin: auto 5rpx auto 19rpx;
	}
	
	.tip-box text {
		font-size: 22rpx;
		line-height: 44rpx;
		font-weight: 500;
		color: rgba(83, 146, 243, 1);
		display: inline-block;
		flex: 7;
	}
	
	.tip-box text+text {
		font-size: 15rpx;
		line-height: 44rpx;
		display: inline-block;
		flex: 1;
	}
	
	.tip-box>view {
		margin-left: 24rpx;
		float: left;
		width: 0;
		height: 0;
		border-width: 13rpx;
		border-style: solid;
		border-color: #e5f0ff transparent transparent transparent;
		position: absolute;
		left: 77rpx;
		bottom: -13rpx;
	}
	
	.control-btn {
		width: 121rpx;
		height: 101rpx;
		background: rgba(83, 146, 243, 1);
		opacity: 0.1;
		border: 1rpx solid black;
		border-radius: 100rpx 0 0;
		right: 0;
		bottom: 0rpx;
		position: absolute;
		z-index: 999;
	}
	
	.control-btn+text {
		display: block;
		right: 18rpx;
		bottom: 30rpx;
		width: 60rpx;
		height: 50rpx;
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(83, 146, 243, 1);
		text-align: center;
		position: absolute;
	}

	.control-btn+text+text {
		right: 18rpx;
		display: block;
		bottom: 30rpx;
		width: 60rpx;
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(83, 146, 243, 1);
		text-align: center;
		position: absolute;
	}
	
	.hide-btn {
		display: none !important;
	}
	
	.space{
		width: 100%;
		height: 100rpx;
	}
	
	.detail-box {
		margin-top: 63rpx;
		height: 168rpx;
		width: 250rpx;
		text-align: center;
	}
	
	.detail-box text {
		height: 30rpx;
		display: block;
		font-size: 25rpx;
		font-weight: 500;
		color: rgba(34, 34, 34, 1);
	}
	
	.detail-box image {
		width: 114rpx;
		height: 114rpx;
		
		background: rgba(245, 247, 249, 1);
		border-radius: 50%;
		display: block;
		margin: 0 auto 24rpx auto;
	}
</style>
