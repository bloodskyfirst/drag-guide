<template>
	<view class="body">
		<view class="page-bd">
		<view class="module-box" v-for="(item, m) in module" :key="m">
			<text>{{item.name}}</text>
			<view :class="{special:d!=(item.detail.length-1),module:true}" v-for="(detail,d) in item.detail" :key="d">
					<image  :src="moduleImg(detail.img)" mode="widthFix" />
					<view >
						<text>{{detail.title}}</text>
						<text>{{detail.detail}}</text>
					</view>
					<view class="select-box" @tap="select(detail.selected,m,d)">
						<image src="../../static/selected_03.png" mode="widthFix"  v-show="detail.selected"/>
						<view v-show="!detail.selected"/>
					</view>
			</view>
		</view>
		</view>
		<view class="btn-box">
			<button type="button"  @tap="addModule">添加</button>
		</view>
	</view>
</template>

<script>
export default {
	name:'addModule',
	data() {
		return {
			matchArray:[],
			module: [
				{
					name: '我的',
					detail: [
						{
							title: '我的订单',
							detail: '我向上级提交的全部订单',
							img: 'goods',
							selected:false
						},
						{
							title: '我要进货',
							detail: '我向上级代理商进货的入口',
							img: 'mycart',
							selected:false
						},
						{
							title: '邀请代理',
							detail: '向下级代理发出邀请',
							img: 'invite',
							selected:false
						},
						{
							title: '充值货款',
							detail: '向下级代理发出邀请',
							img: 'pay',
							selected:false
						},
						{
							title: '我要提货',
							detail: '向下级代理发出邀请',
							img: 'extra/withdraw' ,
							selected:false
						},
						{
							title: '我的库存',
							detail: '向下级代理发出邀请',
							img: 'store',
							selected:false
						},
						{
							title: '升级记录',
							detail: '向下级代理发出邀请',
							img:  'levelupdetail',
							selected:false
						},
						{
							title: '申请升级',
							detail: '向下级代理发出邀请',
							img: 'levelup',
							selected:false
						},
						{
							title: '我的授权',
							detail: '向下级代理发出邀请',
							img: 'extra/permission',
							selected:false
						},
						{
							title: '我的钱包',
							detail: '向下级代理发出邀请',
							img: 'wallet',
							selected:false
						},
						{
							title: '我的业绩',
							detail: '向下级代理发出邀请',
							img: 'record',
							selected:false
						}
					]
				},
				{
					name: '团队',
					detail: [
						{
							title: '我的上级',
							detail: '我向上级提交的全部订单',
							img:  'extra/parent' ,
							selected:false
						},
						{
							title: '下级订单',
							detail: '我向上级提交的全部订单',
							img:  'extra/childcart',
							selected:false
						},
						{
							title: '我的团队',
							detail: '我向上级提交的全部订单',
							img: 'extra/myterm' ,
							selected:false
						},
						{
							title: '新代理审核',
							detail: '我向上级提交的全部订单',
							img:  'extra/invitereview'  ,
							selected:false
						},
						{
							title: '升级审核',
							detail: '我向上级提交的全部订单',
							img: 'extra/levelupreview'  ,
							selected:false
						},
						{
							title: '充值审核',
							detail: '我向上级提交的全部订单',
							img: 'extra/payreview',
							selected:false
						}
					]
				},
				{               
					name: '其他',
					detail: [
						{
							title: '素材中心',
							detail: '我向上级提交的全部订单',
							img: 'extra/source',
							selected:false
						},
						{
							title: '维权举报',
							detail: '我向上级提交的全部订单',
							img: 'extra/safeguard',
							selected:false
						},
						{
							title: '授权查询',
							detail: '我向上级提交的全部订单',
							img:  'extra/permissionsearch',
							selected:false
						},
						{
							title: '意见反馈',
							detail: '我向上级提交的全部订单',
							img: 'extra/advice',
							selected:false
						},
						{
							title: '积分商城',
							detail: '我向上级提交的全部订单',
							img:'extra/pointsmall',
							selected:false
						}
					]
				}
			]
		};
	},
	created() {
		uni.getStorage({
			key:"newModule",
			success:(res)=>{
				this.matchArray=res.data
				for(const m in this.matchArray){
					this.module.forEach((value,index)=>{
						for(const d of value.detail){
							if(d.img===this.matchArray[m].img){
								d.selected=true
							}
						}
					})
				}
			}
		})
	},
	methods: {
		moduleImg(path) {
			return '../../static/all/' + path + '.png';
		},
		select(state,m,d){
			this.module[m].detail[d].selected=!this.module[m].detail[d].selected
		},
		addModule(){
			const all=[]
			this.module.forEach( value=>{
				for(const d of value.detail){
					if(d.selected){
						const obj={
							img:d.img,
						}
						all.push(obj)
					}
				}
			})
			uni.setStorage({
				key:'newModule',
				data:all,
				success: () => {
					uni.showToast({
						title:'添加成功',
						icon:'success',
						duration:1200
					})
					setTimeout(()=>{
						uni.reLaunch({
							url:"/pages/index/index"
						})
					},1200)
				}
			})
		}
	}
	
};
</script>

<style>
.body{
	background:rgba(255,255,255,1);
	font-family: PingFang SC;
	overflow:auto;
}

.page-bd{
	padding-bottom:100rpx;
}

.module-box{
	width: 100%;
}

.module-box>text{
	width:100%;
	height: 60rpx;
	line-height: 60rpx;
	background:#F7F7F7;
	box-sizing: border-box;
	padding-left:34rpx;
	display: block;
	font-size:24rpx;
	font-weight:500;
	color:rgba(74,74,74,1);
}

.module{
	widhth:100%;
	display:flex;
	align-content:center;
	box-sizing: border-box;
	background-color: #fff;
	padding: 16rpx 34rpx 0 34rpx;
	position: relative;
}

.special{
	border-bottom: 1rpx solid #EDEDED;
}

.module>image{
	margin-right:33rpx;
	width:114rpx;
	height:114rpx;
	background:rgba(245,247,249,1);
	border-radius:50%;
}

.select-box{
	width: 100rpx;
	height:100rpx;
	position: absolute;
	right: 25rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.select-box>view, .select-box>image{
	width:36rpx;
	height:36rpx;
	border-radius:50%;
	z-index: 2;
}

.select-box>view{
	border: 1rpx solid rgba(141,141,141,1);
}

.module>view text{
	font-size:30rpx;
	font-weight:bold;
	color:rgba(34,34,34,1);
	display: block;
	margin-top:23rpx;
}

.module>view text+text{
	font-size:24rpx;
	font-weight:500;
	color:rgba(141,141,141,1);
	margin-top:11rpx;
}

.btn-box{
	width: 100%;
	box-sizing: border-box;
	position:fixed;
	bottom: 0;
	z-index: 2;
	padding: 14rpx  50rpx;
	background-color: #fff;
}

.btn-box>button{
	line-height: 70rpx;
	padding: 0;
	height:70rpx;
	width: 650rpx;
	background:rgba(83,146,243,1);
	border-radius:35rpx;
	color:rgba(255,255,255,1);
	font-size: 32rpx;
	align-self: center;
}
</style>
