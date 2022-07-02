
export const BASE_URL="https://api.krakenflex.systems/interview-tests-mock-api/v1/"
import axios from 'axios';
const SITE_ID='norwich-pear-tree'
const d='2022-01-01T00:00:00.000Z'
const headers=  {
  'x-api-key': 'EltgJ5G8m44IzwE6UN2Y4B4NjPW77Zk6FJK3lL23'
}



// init function for posting outages to respective siteId.
export async function init() {
try{
const outages = await getOutages()
const siteOutages=await extractSiteInfo(outages)
console.log(siteOutages) //  filteree site outages.
if(siteOutages.length>0)
{
const resp= await postOutagestoSiteId(siteOutages)
console.log(resp.status)
return resp.status
}
else{
  throw("no matching outages")
}

}
catch(error){
    console.log(error)
}
}


/*
1. Retrieves all outages from the `GET /outages` endpoint.
*/
export async function getOutages() {
    try{
    return await axios.get(BASE_URL + "outages", {
        headers: headers
    });
}  
catch(error){
    console.log("error in getOutages")
    throw(error)
   }
}

/*
2. Retrieves information from the `GET /site-info/{siteId}` endpoint for the site with the ID `norwich-pear-tree`.
@param outages
*/  
export async function extractSiteInfo(outages) {
    try {
        const site_info = await  axios.get(BASE_URL + "site-info/" + SITE_ID, {
            headers: headers
          })
          if (site_info.data && site_info.data.devices) {
            /*
            3. Filters out any outages that began before `2022-01-01T00:00:00.000Z` or don't have an ID that is in the list of
               devices in the site information
            4. For the remaining outages, it should attach the display name of the device in the site information to each appropriate outage
            */
            const output = outages.data.reduce((newo, co) => {
              const matched = site_info.data.devices.find(device => (device.id === co.id && new Date(co.begin).getTime() >= new Date(d).getTime()));
              if (matched)
                newo.push({ ...co, name: matched.name });
              return newo;
            }, []);
           return output
          }
          throw ("no site info")
    } catch (err) {
        // Handle Error Here
        console.error("error in extractSiteInfo::",err);
        throw(err)
    }
 
}

 /*
  5. Sends this list of outages to `POST /site-outages/{siteId}` for the site with the ID `norwich-pear-tree`
  @param output
  */
export async function postOutagestoSiteId(output) {
    try{
        return await  axios.post(BASE_URL + "site-outages/" + SITE_ID, output, {
        headers: headers
      })
    }

    catch(error){
     console.log("error in postOutagestoSiteId:: ",error)
     throw(error)
    }
 
}

/*
Application initial function.
*/
(async ()=>{
await init()
})()
 

 