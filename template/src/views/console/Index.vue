<template>
  <div style="padding: 10px 20px;">

    <h1> /console </h1>

    <h3>语种切换</h3>
    <Select v-model="lang" @on-change="changeLang" style="width: 200px;">
      <Option value="zh-CN">zh-CH</Option>
      <Option value="en-US">en-US</Option>
    </Select>
    <br>
    <br>

    <h3>按钮文本</h3>
    <Button>{{ $t("common.form.btn.search") }}</Button>
    <Button>{{ $t("common.form.btn.reset") }}</Button>
    <br>
    <br>
    
    <h3>日历组件</h3>
    <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
    <br>
    <br>

    <h3>分页组件</h3>
    <pagination></pagination>

  </div>
</template>

<script>
import Lang from "@/utils/lang"
import Pagination from "@/components/pagination"
export default {

  components: { Pagination },

  data() {
    return {
      lang: Lang.getLang(),
      select: 1
    }
  },

  methods: {
    changeLang(lang) {
      Lang.setLang(lang);
      window.location.reload();
    }
  }

};
</script>

