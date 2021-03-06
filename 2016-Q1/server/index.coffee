koa = require "koa"
fs = require "fs"
serve = require "koa-static"
router = require "koa-router"
co = require "co"
views = require "co-views"
parse = require "co-busboy"
path = require "path"
os = require "os"
Promise = require "bluebird"
thunkify = require "thunkify"
_ = require "underscore"
# fs.readdir = Promise.promisify fs.readdir

route = router()
app = koa()
render = views(__dirname+"/views",map: { html: 'swig' });

file_path = __dirname+"/upload"

app.use serve(__dirname+"/views")

route.post "/upload",(next)->
  parts = parse(this);  
  while part = yield parts
    stream = fs.createWriteStream(path.join(file_path, part.filename))
    typeof(part)
    part.pipe(stream)
    console.log('uploading %s -> %s', part.filename, stream.path)
    this.redirect('/file_list');  

route.get "/",(next)->
  console.log "get / "
  this.body = 'Hello World for test watch with new gulpfile,i hope!';

route.get "/upload_file",(next)->
  this.body = yield render("uploade_file.html");
  
route.get "/file_list",(next)->
  fake1 = 
    name:"a",
    upload_time:1,
    size:2,
    md5:"3"
  fake2 = 
    name:"a",
    upload_time:1,
    size:2,
    md5:"3"  
  readdir = thunkify(fs.readdir) 
  file_list = yield readdir(file_path)
  console.log "file_list ",file_list
  file_map = _.map file_list,(file)->
    return {name:file}
  # file_map = _.indexBy(file_list,_.constant("name"))
  console.log "file_map ",file_map
  this.body = yield render("file_list.jade",{file_list:file_map})

app.use (route.routes())
app.use (route.allowedMethods())

app.listen 4000