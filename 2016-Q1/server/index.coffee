koa = require "koa"
fs = require "fs"
serve = require "koa-static"

app = koa()

# app.use (next) ->
# 	yield next
# 	this.body = "3456 Hello dacy,I'm coffeescript with koa.js and watch..."
app.use serve(__dirname)


app.use (next) ->
  if 'POST' != this.method
    return yield next;

  parts = parse(this);
  
  while part = yield parts
    stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()))
    typeof(part)
    part.pipe(stream)
    console.log('uploading %s -> %s', part.filename, stream.path)

  this.redirect('/');


app.listen 3000