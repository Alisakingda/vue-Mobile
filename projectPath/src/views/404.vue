<template>
  <div class="notFound">
    not found
    <div class="ty">
      <!-- 直接使用animated中的动画class名，注意：必须使用animated这个class名，否则动画会无效 -->
      <div class="box animated bounceInDown">not found</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "notFound",
  components: {},
  props: {},
  data() {
    return {
      show: true
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang="less" scoped>
</style>