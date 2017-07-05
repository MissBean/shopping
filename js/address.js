new Vue({
  el: '.container',
  data: {
    limitNum:3,
    currentIndex: 0,
    shoppingMethods:1,
    addressList:[],
    confirmEdit:false,
    confirmDel:false,
    addEdit:'',
    addDel:''
  },
  mounted: function(){
    this.$nextTick(function(){
      this.getAddressList();
      
    });
  },
  computed: {
    filterAddress: function(){
      return this.addressList.slice(0,this.limitNum);
    }
  },
  methods:{
    getAddressList: function(){
      var _this = this;
      this.$http.get('data/address.json').then(function(res){
        
        if(res.data.status == 0){ // 请求成功
          _this.addressList = res.data.result;
          
        }

      })

    },
    getMore: function(){
      var Num = this.limitNum;
      if(this.limitNum != this.addressList.length){
        this.limitNum = this.addressList.length;
      }else {
        this.limitNum = Num;
      }
    },
    setDefault: function(addressId){
      //var _this = this;
      // this.addressList.forEach(function(item,index){
      //   if(_this.addressList[_this.currentIndex].addressId == item.addressId){
      //     item.isDefault = true;
      //   }else{
      //     item.isDefault = false;
      //   }
      this.addressList.forEach(function(item,index){
        if(item.addressId == addressId){
          item.isDefault = true;
        }else{
          item.isDefault = false;
        }
      })
    },
    editconfirm: function(item){
      this.confirmEdit = true;
      this.addEdit = item;
      console.log(this.addEdit);
    },
    editAddress: function(){
      // var index = this.addressList.indexof(this.addEdit);
      // this.addressList.splice(index,1,);
      // console.log(this.addressList);
      this.confirmEdit = false;
    },
    delConfirm: function(item){
      this.confirmDel = true;
      this.addDel = item;
    },
    delAddress: function(){
      var index = this.addressList.indexOf(this.addDel);
      this.addressList.splice(index,1);
      this.confirmDel = false;
    }
  }
})