var express = require('express');
var app = express();
app.use(express.static(__dirname + '/'));

app.get('*', function (req, res) {
  const index = path.join(__dirname, 'build', 'index.html');
  res.sendFile(index);
});

app.listen(process.env.PORT || 8080);