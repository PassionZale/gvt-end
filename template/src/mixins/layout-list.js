const MixinLayoutList = {
  data() {
    return {
      doNotUse: 0
    }
  },

  computed: {
    $_layout() {
      return {
        tableHeight: this.doNotUse
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.updateTableHeight()

      window.addEventListener("resize", this.updateTableHeight, { "passive": true })

      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("resize", this.updateTableHeight)
      })
    })
  },

  methods: {
    updateTableHeight() {
      const minHeight = 400

      const clientHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

      const header = this.getElHeight(".gvt-header")

      const formWrapper = this.getElHeight(".form-wrapper")
      const toolWrapper = this.getElHeight(".tool-wrapper")

      const pageWrapper = this.getElHeight(".page-wrapper")


      // .gvt-content padding top & bottom => 10px * 2
      // .gvt-content .main padding top & bottom => 20px * 2
      const tableHeight = clientHeight - (header + formWrapper + toolWrapper + pageWrapper) - 10 * 2 - 20 * 2

      this.doNotUse = tableHeight > minHeight ? tableHeight : minHeight
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

export default MixinLayoutList
