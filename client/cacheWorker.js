const isTargetURL = (url) => {
  return url.includes('carto.streets/v1')
}

const cacheName = 'tileCache'

self.addEventListener('fetch', async function (event) {

  const url = event.request.url

  if (isTargetURL(url)){

    event.respondWith(caches.open(cacheName).then((c)=>{
      return c.match(url).then(cResponse=>{
        if(cResponse){
          return cResponse
        }
        return fetch(event.request).then(resp =>{
          c.put(event.request, resp.clone())
          return resp
        })


      })
    }))
  }else{
    return
  }

});