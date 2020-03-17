<template>
	<drag-guide :imgWidth=dragImgW :imgHeight=dragImgH :row=dragRow  :scrollH=scrollH  :scrollW=scrollW />
</template>

<script>
	import dragGuide from '../../components/dragGuide/dragGuide.vue'
	
	export default{
		components:{
			dragGuide
		},
		data() {
			return {
				dragImgW:200,
				dragImgH:200,
				dragRow:3,
				scrollH:'100%',
				scrollW:'100%'
			}
		}
	}
</script>

<style>
	
</style>
