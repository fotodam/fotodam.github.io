#!/usr/bin/env node

'use strict';

const lwip = require('lwip');
const path = require('path');
const glob = require('glob');
const async = require('async');

glob('source/_posts/**/*.+(jpg|jpeg|bmp|png|gif)',{nodir: true}, function(err, files){
    const sourceFiles = files.filter(f => !/(thumb|min)/.test(f))
    async.forEach(sourceFiles, function(file, next){
        const ext = path.extname(file);
        const basename = path.basename(file, ext)
        const thumb_file = path.join(path.dirname(file), basename + "_thumb" + ext);
        lwip.open(file, function(err, image){
            image.batch()
                .cover(300, 300)
                .writeFile(thumb_file, function(err){
                    console.log('Generated thumbnail file', thumb_file, err ? erro : 'OK')
                    next();
                })
        });
    }, function(err){
        if(err){
            console.error('Failed async foreach', err);
        }
    });
});
