<template>
  <hero-error code="500" :locale="locale"></hero-error>
</template>

<script>
import Lang from "@/utils/lang";

export default {
  name: "error-500",

  data() {
    return {
      locale: Lang.getLang()
    };
  }
};
</script>

