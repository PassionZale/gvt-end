<template>
  <hero-error code="403" :locale="locale"></hero-error>
</template>

<script>
import Lang from "@/utils/lang";

export default {
  name: "error-403",

  data() {
    return {
      locale: Lang.getLang()
    };
  }
};
</script>

