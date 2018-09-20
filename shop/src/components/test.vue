<template>
	<div class="a">
   <div class="upload-file">
        <input type="file" class="input-file" multiple="true"> 
        <span class="tip">点击上传图片</span>
      </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				selected: "1",
				flag: true
			}
		},
		created() {}
	}
</script>

<style scoped>
	@import url("../static/css/test.css");
</style>