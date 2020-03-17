<template>
	<drag-guide 
	:imgWidth=dragImgW :imgHeight=dragImgH :row=dragRow
	/>
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
				dragRow:3
			}
		},
	}
</script>

<style>
	
</style>
