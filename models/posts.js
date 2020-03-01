let connection = require('./configdb')

class Posts{
  
  static getList(id, pageNumber = 1, cb){
    let sql = `SELECT p.Post_ID AS id, p.Post_Name AS name, p.Post_Slug AS slug 
               FROM tPost AS p 
               JOIN linkCatPost AS lcp ON lcp.Post_ID = p.Post_ID
               JOIN tCategory AS ca ON ca.Cat_ID = lcp.Cat_ID
               WHERE ca.Cat_ID = ? OR ca.Cat_Slug = ?
               GROUP BY p.Post_ID`
    
    connection.query(sql, [id, id], (err, res) => {
      if(err) throw err
      cb(res)
    })
  }

  static getPost(postId){ //id or slug

  }

  static async getAll(){
    let sql = `SELECT p.Post_Name AS name, p.Post_Content AS content, p.Post_Date AS date, p.Post_ID as id, p.Post_Slug AS slug,
                      u.User_Name AS username, count(co.Com_ID) AS Com_Number
               FROM tPost AS p 
               JOIN tUser AS u ON p.User_ID = u.User_ID 
               LEFT JOIN tComment AS co ON co.Post_ID = p.Post_ID 
               GROUP BY p.Post_ID`
    
    return await connection.query(sql)           
  }

  static async getPopular(cb){
    let sql = `SELECT p.Post_Name AS name, p.Post_Slug AS slug, count(co.Com_ID) AS Com_Number
               FROM tPost AS p 
               JOIN tComment AS co ON co.Post_ID = p.Post_ID
               GROUP BY co.Post_ID 
               ORDER BY Com_Number 
               DESC LIMIT 0, 5`

    return await connection.query(sql)
  }

  static add(name, content, userId, categories){

  }

  static delete(id){

  }

  static edit(postId, name, content, userId){

  }
}

module.exports = Posts