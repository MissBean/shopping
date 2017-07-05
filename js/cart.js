var vm = new Vue({
  el: "#app",
  data:{
    totalMoney: 0,
    productList:[],
    checkAllFlag: false,
    delFlag: false,
    curProduct:""
  },
  filters:{
    formatMoney:function(val,text){
      if(text){
         return val.toFixed(2)+text;
       }else{
         return val.toFixed(2);
       }
     
    }
  },
  mounted: function(){
    // this.$nextTick(function(){
    //   this.cartView();
    // }) 这样时下面的this可以替换为vm  所有this都是vm
    this.cartView();
  },
  methods: {
    cartView: function(){
      var _this = this;
      this.$http.get("data/cartData.json",{"id":123}).then(function(res){
        _this.productList = res.data.result.list;
        // _this.totalMoney = res.data.result.totalMoney;
      })
    },
    numChange:function(product,way){
      if(way>0){
        product.productQuantity ++;
      }else{
        product.productQuantity --;
        if(product.productQuantity<1){
          product.productQuantity =1;
        }
      }
      this.totalPrice();
    },
    selectProduct: function(item){
      if(typeof item.checked == 'undefined'){
        //Vue.set(item,checked,true);
        
        this.$set(item,'checked',true);
      }else {
        item.checked = !item.checked;
      }
      this.totalPrice();
    },
    checkAll: function(flag){
      this.checkAllFlag = flag;
      var _this = this;
      this.productList.forEach(function(item,index){
        if(typeof item.checked == 'undefined'){
          _this.$set(item,'checked', _this.checkAllFlag);
        }else {
          item.checked = _this.checkAllFlag;
        }
      });
      this.totalPrice();
    },
    totalPrice: function(){
      this.totalMoney = 0;
      var _this = this;
      this.productList.forEach(function(item,index){
        if(item.checked){
          _this.totalMoney += item.productPrice * item.productQuantity;
        }
      });
    },
    delConfirm:function(item){
      this.delFlag = true;
      this.curProduct = item;
    },
    delProduct:function(){
      var index = this.productList.indexOf(this.curProduct);
      this.productList.splice(index,1);
      this.delFlag = false;
    }
  }
})