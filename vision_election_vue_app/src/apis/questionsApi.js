import axios from 'axios'  
import Vue from 'vue'  
  
const SERVER_URL = 'http://localhost:5000';  
  
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
  

    //get questions by candidate
    getQuestions: (cId) => instance.get('/question/viewQuestions/'+cId, {  
        transformResponse: [function (data) {  
          return data? JSON.parse(data) : data;  
        }]  
      }),  

    //ask a question

  

    }