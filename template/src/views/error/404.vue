<template>
  <hero-error :locale="locale"></hero-error>
</template>

<script>
import Lang from "@/utils/lang";

export default {
  name: "error-404",

  data() {
    return {
      locale: Lang.getLang()
    };
  }
};
</script>

