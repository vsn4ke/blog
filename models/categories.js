let connection = require('./configdb')

class Categories {

  static async getAll(postId = null){
    let sql = `SELECT ca.Cat_ID AS id, ca.Cat_Name AS name, ca.Cat_Slug AS slug, count(lcp.Cat_ID) AS postCount 
               FROM tCategory AS ca 
               LEFT JOIN linkCatPost AS lcp ON lcp.Cat_ID = ca.Cat_ID 
               LEFT JOIN tPost AS p ON p.Post_ID = lcp.Post_ID 
               :where 
               GROUP BY ca.Cat_ID`
    
    if(postId == null){
      return await connection.query(sql.replace(':where', ''))
    }else{
      return await connection.query(sql.replace(':where', ' WHERE p.Post_ID = ? '), [postId])
    }
  }

  static getCategory(id, cb){ // param id or slug
    let sql = `SELECT ca.Cat_Name AS name, ca.Cat_Slug AS slug
               FROM tCategory AS ca
               WHERE ca.Cat_ID = ? OR ca.Cat_Slug = ?`
    
    connection.query(sql, [id, id], (err, res) => {
      if(err) throw err

      cb(res)
    })
  }

  static getCount(){

  }

  static isLast(cb){
    let sql = 'SELECT Cat_ID FROM tCategory'
    connection.query(sql, (err, res) => {
      if(err) throw err

      last = false

      if(res.length <= 1){
        last = true
      }

      cb(last)
    })
  }

  static delete(id){

  }

  static edit(id, name){

  }

  static add(name){

  }
}

module.exports = Categories