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
  createNew: () => 
  instance.post('/election/addElection', {transformResponse: [function (data) {  
    return data? JSON.parse(data) : data;  
  }]  
}),  
  // (R)ead  ("/election/{electionId}"
  getElection: (eID) => instance.get('/election/'+eID, {
    transformResponse: [function (data) {  
      return data? JSON.parse(data) : data;  
    }]  
  }),  
  // (U)pdate  
  updateElection: (electionTitle, electionDescription, id)=> instance.put('/election/modifyElection/'+id, {title: electionTitle,  
    transformResponse: [function (data) {  
      return data? JSON.parse(data) : data;  
    }]  
  }),
  //get all elections "/election"
  getElections: ()=> instance.get("/election", { 
    transformResponse: [function (data) {  
      return data? JSON.parse(data) : data;  
    }]  
  }),


 // updateForId: (id, text, completed) => instance.put('todos/'+id, {title: text, completed: completed}),  
  // (D)elete  
  removeElection: (id) => instance.delete("/elections/remove/"+id, {transformResponse: [function (data) {  
    return data? JSON.parse(data) : data; 
  }]
})
}