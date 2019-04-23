<template>
  <div class="LayoutList">
    <div class="form-wrapper" v-show="$slots['form']">
      <slot name="form"></slot>
    </div>

    <div class="tool-wrapper" v-show="!disTool">
      <Row>
        <Col span="12" class-name="tool-left" v-show="$slots['tool-left']">
          <slot name="tool-left"></slot>
        </Col>
        <Col span="12" :offset="$slots['tool-left'] ? 0 : 12" class-name="tool-right" v-show="$slots['tool-right']">
          <slot name="tool-right"></slot>
        </Col>
      </Row>
    </div>

    <div class="table-wrapper" v-show="$slots['table']">
        <slot name="table"></slot>
    </div>

    <div class="page-wrapper" v-show="$slots['page']">
      <slot name="page"></slot>
    </div>

    <slot></slot>
  </div>
</template>

<script>

export default {
  name: "Layout",

  props: {
    disTool: Boolean
  },
};
</script>

