<template>
  <div class="LayoutTree">
    <div class="left-container">
      <div class="tree-tool-wrapper" v-show="$slots['tree-tool']">
        <slot name="tree-tool"></slot>
      </div>
      <div class="tree-wrapper" v-show="$slots['tree']">
        <slot name="tree"></slot>
      </div>
    </div>

    <div class="distance-wrapper"></div>

    <div class="right-container">
      <div class="form-wrapper" v-show="$slots['form']">
        <slot name="form"></slot>
      </div>

      <div class="tool-wrapper" v-show="!disTool">
        <div class="tool-left" v-show="$slots['tool-left']">
          <slot name="tool-left"></slot>
        </div>
        <div class="tool-right" v-show="$slots['tool-right']">
          <slot name="tool-right"></slot>
        </div>
      </div>

      <div class="table-wrapper" v-show="$slots['table']">
        <slot name="table"></slot>
      </div>

      <div class="page-wrapper" v-show="$slots['page']">
        <slot name="page"></slot>
      </div>
    </div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "LayoutTree",

  props: {
    disTool: Boolean
  }
};
</script>

