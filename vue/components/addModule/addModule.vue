<template>
	<div class="body">
		<div class="page-bd">
		<div class="module-box" v-for="(item, m) in module" :key="m">
			<p>{{item.name}}</p>
			<div :class="{special:d!=(item.detail.length-1),module:true}" v-for="(detail,d) in item.detail" :key="d">
					<img  :src="moduleImg(detail.img)"  />
					<div >
						<p>{{detail.title}}</p>
						<p>{{detail.detail}}</p>
					</div>
					<div class="select-box" @tap="select(detail.selected,m,d)">
						<img src="../../static/selected_03.png"   v-show="detail.selected"/>
						<div v-show="!detail.selected"/>
					</div>
			</div>
		</div>
		</div>
		<div class="btn-box">
			<button type="button"  @tap="addModule">添加</button>
		</div>
	</div>
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
		//按需使用
		//获取vuex里 image 并根据匹配的模块 添加选中的样式 
			// success:(res)=>{
			// 	this.matchArray=res.data
			// 	for(const m in this.matchArray){
			// 		this.module.forEach((value,index)=>{
			// 			for(const d of value.detail){
			// 				if(d.img===this.matchArray[m].img){
			// 					d.selected=true  
			// 				}
			// 			}
			// 		})
			// 	}
			// }
	},
	methods: {
		moduleImg(path) {
			return '../../static/all/' + path + '.png';
		},
		select(state,m,d){
			this.module[m].detail[d].selected=!this.module[m].detail[d].selected
		},
		addModule(){
			// 按需使用 把此时所有all的数据放入vuex 替换原image  并跳转回 拖拽模块页 路由
			// const all=[]
			// this.module.forEach( value=>{
			// 	for(const d of value.detail){
			// 		if(d.selected){
			// 			const obj={
			// 				img:d.img,
			// 			}
			// 			all.push(obj)
			// 		}
			// 	}
			// })
			// this.$route.push()
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
	padding-bottom:50px;
}

.module-box{
	width: 100%;
}

.module-box>p{
	width:100%;
	height: 30px;
	line-height: 30px;
	background:#F7F7F7;
	box-sizing: border-box;
	padding-left:17px;
	display: block;
	font-size:12px;
	font-weight:500;
	color:rgba(74,74,74,1);
}

.module{
	widhth:100%;
	display:flex;
	align-content:center;
	box-sizing: border-box;
	background-color: #fff;
	padding: 8px 17px 0 17px;
	position: relative;
}

.special{
	border-bottom: 1px solid #EDEDED;
}

.module>img{
	margin-right:16.5px;
	width:57px;
	height:57px;
	background:rgba(245,247,249,1);
	border-radius:50%;
}

.select-box{
	width: 50px;
	height:50px;
	position: absolute;
	right: 12.5px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.select-box>div, .select-box>img{
	width:18px;
	height:18px;
	border-radius:50%;
	z-index: 2;
}

.select-box>div{
	border: 1px solid rgba(141,141,141,1);
}

.module>div p{
	font-size:15px;
	font-weight:bold;
	color:rgba(34,34,34,1);
	margin-top:11.5px;
}

.module>div p+p{
	font-size:12px;
	font-weight:500;
	color:rgba(141,141,141,1);
	margin-top:6.5px;
}

.btn-box{
	width: 100%;
	box-sizing: border-box;
	position:fixed;
	bottom: 0;
	z-index: 2;
	padding: 7px  25px;
	background-color: #fff;
}

.btn-box>button{
	line-height: 35px;
	padding: 0;
	height:35px;
	width: 325px;
	background:rgba(83,146,243,1);
	border-radius:17.5px;
	color:rgba(255,255,255,1);
	font-size: 16px;
	align-self: center;
}
</style>
