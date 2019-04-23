const MixinLayoutTree = {
  data() {
    return {
      doNotUse: {
        treeHeight: 0,
        tableHeight: 0
      },
    }
  },

  computed: {
    $_layout() {
      return {
        treeStyle: {
          maxHeight: `${this.doNotUse.treeHeight}px`,
          overflowY: "auto"
        },
        tableHeight: this.doNotUse.tableHeight
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.updateElsHeight()

      window.addEventListener("resize", this.updateElsHeight, { "passive": true })

      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("resize", this.updateElsHeight)
      })
    })
  },

  methods: {
    updateElsHeight() {
      const minHeight = 400

      const clientHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

      const header = this.getElHeight(".gvt-header")

      const treeToolWrapper = this.getElHeight(".tree-tool-wrapper")
      // .gvt-content padding top & bottom => 10px * 2
      // .gvt-content .main padding top & bottom => 20px * 2
      const treeHeight = clientHeight - header - treeToolWrapper - 10 * 2 - 20 * 2
      // 计算 .left-container 中的 tree 高度
      this.doNotUse.treeHeight = treeHeight > minHeight ? treeHeight : minHeight

      const formWrapper = this.getElHeight(".form-wrapper")
      const toolWrapper = this.getElHeight(".tool-wrapper")
      const pageWrapper = this.getElHeight(".page-wrapper")
      // .gvt-content padding top & bottom => 10px * 2
      // .gvt-content .main padding top & bottom => 20px * 2
      const tableHeight = clientHeight - (header + formWrapper + toolWrapper + pageWrapper) - 10 * 2 - 20 * 2
      // 计算 .right-container 中的 table 高度
      this.doNotUse.tableHeight = tableHeight > minHeight ? tableHeight : minHeight;
    },

    getElHeight(el) {
      let height = 0
      try {
        height = document.querySelector(el).offsetHeight
      } catch (e) {
        // 请勿使用 trow new Error()
        // 这样会导致 updateTableHeight() 结束运行
        console.warn(`Can not find element: ${el}`)
      }
      return height
    }
  },

}

export default MixinLayoutTree
