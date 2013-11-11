#! /usr/bin/env node
/* vim: set syntax=JavaScript : */

var read = require('read')
  , exec = require('child_process').exec;

var blocks = []
  , groups = ['progress', 'plan', 'problems', 'people'];

require('copy-paste');

function lines(cb) {
  var out = []
    , options = { prompt: '- ' };  

  function line(err, result) {
    if(err) throw err;    
    if(result === '') return cb(out);
    out.push("  - "+ result);
    read(options, line);
  }
  read(options, line);
}

function next() {
  var group = groups.shift();
  if(group == null) return copy(blocks.join("\n\n"));

  // write heading
  process.stdout.write(group +":\n");
  lines(function(lns) {
    if(lns.length) blocks.push( group +"\n"+ lns.join("\n") );
    next();
  });
}

next();
