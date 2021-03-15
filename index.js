const app = new Vue({
  el: '#app',
  data: {
    data: {},
    pagination: {
      totalResult: 0, //總筆數
      currentPage: 1, //當前頁數
      pageTotal: 0, //總頁數
      perPage: 5 //一頁幾筆資料
    },
  },
  created() {
    this.getData();
  },
  methods: {
    getData () {
        const api= 'http://www.json-generator.com/api/json/get/bTLZcsoUGG?indent=2'
        axios.get(api).then (response => {
          let filter = response.data
          filter.forEach(element => {            
              if ( typeof element.UnitPrice === 'string' ) {
                let arr = element.UnitPrice.split("/")
                arr.splice(1,1)
                let str = JSON.stringify(arr)
                let newStr = str.substring(2,7)
                element.UnitPrice = newStr
              } 
          })
        // let metersIndex;
        // let meters;
        // filter.forEach(item => {
        //   if (typeof item.UnitPrice === 'string') {
        //     let arr = item.UnitPrice.split('/')
        //     arr.forEach(item => {
        //       if (item.indexOf('萬') > -1) {
        //           metersIndex = item.indexOf('萬')
        //           meters = item.substring(0, metersIndex).split('萬');
        //       }             
        //     })
        //     item.UnitPrice = Number(meters)
        //   }
        // })
          this.pagination.totalResult = filter.length
          this.pagination.pageTotal = Math.ceil(filter.length / this.pagination.perPage)
          let pageData = {}
          for(let i = 0; i < this.pagination.pageTotal; i++){
            if (filter.length > this.pagination.perPage) {
              let perPageData =filter.slice(0, this.pagination.perPage)
              pageData['page' + (i + 1)] = perPageData
              filter.splice(0, this.pagination.perPage)
            } else {
              let perPageData =filter.slice(0, filter.length)
              pageData['page' + (i + 1)] = perPageData
              filter.splice(0, filter.length)
            }
          }
          this.data = pageData
        })
    },
    selectedPre () {
      if (this.pagination.currentPage > 1) {
        this.pagination.currentPage--
        console.log(this.pagination.currentPage);
      }
    },
    selectedNext () {
      if (this.pagination.currentPage < this.pagination.pageTotal) {
        this.pagination.currentPage++
        console.log(this.pagination.currentPage);
      }
    }
  },
})