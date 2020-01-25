const fs = require('fs');
const path = require('path');

hexo.extend.helper.register('post_images', function(post){
  const page_path = post.full_source
  const page_dir = path.join(path.dirname(page_path), path.basename(page_path, '.md'));
  return fs.readdirSync(page_dir).filter(function(f){
    return /(jpg|jpeg|bmp|gif|png)$/.test(f);
  }).filter(function(f){
    return !/(min|thumb|medium|w600|w1000)\./.test(f);
  }).sort().map(function(f){
    const photo_path = path.join(post.path, f);
    const basename = path.basename(f, path.extname(f));
    const w1000 = path.join(page_dir, basename + '_w1000' + path.extname(f));
    try {
      fs.accessSync(w1000, fs.F_OK);
      
      return {
        path: photo_path,
        path_w1000: path.join(post.path,  basename + '_w1000' + path.extname(f)),
        path_w600: path.join(post.path,  basename + '_w600' + path.extname(f))
      };
    } catch (e) {
      return {
        path: photo_path,
        path_w1000: photo_path,
        path_w600: photo_path,
      };
    }
    
  });
});