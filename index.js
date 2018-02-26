exports.registerPlugin = (cli, options)=>{
  if(Object.keys(options).length == 0){
    cli.log.info("No forward config")
    return
  }
  let queue = []
  for(let key in options){
    queue.push({
      reg: new RegExp(key),
      path: options[key]
    })
  }
  cli.registerHook(['route:forward','preview:forward'], (req, crossData, cb)=>{
    let pathname = req.path;
    if(options[pathname]){
      crossData.realPath = options[pathname]
      return cb(null)
    }
    for(let i = 0, length = queue.length; i < length; i++){
      if(queue[i].reg.test(pathname)){
        crossData.realPath = queue[i].path
        return cb(null)
      }
    }
    cb(null)
  })
}