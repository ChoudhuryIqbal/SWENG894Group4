import axios from 'axios'  
import Vue from 'vue'  
  
const SERVER_URL = 'http://localhost:9000';  
  
const instance = axios.create({  
  baseURL: SERVER_URL,  
  timeout: 5000  
});  
  
export default {  
    async execute(method, resource, data, config) {  
        let accessToken = await Vue.prototype.$auth.getAccessToken()  
        return instance({  
          method:method,  
          url: resource,  
          data,  
          headers: {  
                Authorization: `Bearer ${accessToken}`  
          },  
          ...config  
        })  
      }, 
  // (C)reate  
  createNew: (id, email, type, fName, lName, age, race, ethnicity, gender, address, city, state, zip, userName) => 
  instance.post('/user/addProfile/'+type, {id: id, email: email, first_name: fName, last_name: lName, age: age, race: race, ethnicity: ethnicity
    ,gender: gender, address: address, city: city, state: state, zip: zip, profile_complete: 1, user_name: userName, transformResponse: [function (data) {  
      return data? JSON.parse(data) : data;  }]}),  
  // (R)ead  
  getUser: (id) => instance.get('/user/'+id, {  
    transformResponse: [function (data) {  
      return data? JSON.parse(data) : data;  
    }]  
  }),  

  getUsers: () => instance.get('/user', {  
    transformResponse: [function (data) {  
      return data? JSON.parse(data) : data;  
    }]  
  }), 
  // (U)pdate  
  modifyUser: (ID, email, type, fName, lName, age, race, ethnicity, gender, address, city, state, zip, userName) => 
  instance.put('/user/modifyProfile/'+ID, {id: ID, email: email, type: type, first_name: fName, last_name: lName, age: age, race: race, ethnicity: ethnicity
    ,gender: gender, address: address, city: city, state: state, zip: zip, profile_complete: 1, user_name: userName}), 

    addAdmin: (ID, type,) => 
    instance.put('/user/addAdmin/'+ID+'/'+type, {type: type,   
      transformResponse: [function (data) {  
        return data? JSON.parse(data) : data;  
      }]  
    }), 
 
 // updateForId: (id, text, completed) => instance.put('todos/'+id, {title: text, completed: completed}),  
  // (D)elete  
  //removeForId: (id) => instance.delete('todos/'+id)  
}