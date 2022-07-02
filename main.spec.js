 
import * as myModule from './main.js'
 
 


describe('Main Service', () => {
 
      test ('post outages data successful',async()=>{
        const resp=await myModule.init()
        expect(resp).toStrictEqual(200); //posted data successfully
       
       })
       
       
       test('post outages data bad request', async () => {
          const mocksitInfoResponse=[
           {
             "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
             "name": "Battery 1",
             "begin": "2022-05-23T12:21:27.377Z",
             "end": "2022-11-13T02:16:38.905Z"
           },
           {
             "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
             "name": "Battery 1",
             "begin": "2022-12-04T09:59:33.628Z",
             "end": "2022-12-12T22:35:13.815Z"
           },
           {
             "id": "086b0d53-b311-4441-aaf3-935646f03d4d",
             "name": "Battery 2",
             "begin": "2022-07-12T16:31:47.254Z",
             "end": "2022-10-13T04:05:10.044Z"
           }
         ]
           try {
               await myModule.postOutagestoSiteId(mocksitInfoResponse);
           } catch (err) {
               expect(err.response.status).toStrictEqual(400);
           }
       });

 

 
 
})


 
