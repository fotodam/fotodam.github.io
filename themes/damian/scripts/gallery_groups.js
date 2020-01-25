const _ = require('lodash');
hexo.extend.helper.register('gallery_groups', function(posts, size){
    let galleries =   _.sortBy(posts.data, 'path').filter(p => p.layout == 'gallery');
    let groups = _.chunk(galleries, 4);
    console.log(groups);  
    return groups;
});