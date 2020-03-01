class Data {
  
  constructor(pageType, title){
    this.pageType = pageType
    this.toCreate = {
      title : title,
      catList : [],
      session : {
        userName : '',
        isAdmin : false 
      },
      content : '',
      popularList : [], 
      pageType : pageType
    }
  }
  
  async getData(){
    let Categories = require('../models/categories')
    let Posts = require('../models/posts')
    await Categories.getAll().then((result) => this.toCreate.catList = result )
    await Posts.getPopular().then((result) => this.toCreate.popularList = result )
    
    if(this.pageType == 'post'){
      await Posts.getAll().then((result) => this.toCreate.content = result )
    }
    return this.toCreate
  }
}

module.exports = Data