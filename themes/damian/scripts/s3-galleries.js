const S3 = require("aws-sdk/clients/s3");
const { kebabCase } = require("lodash/string");
const s3 = new S3({
    region: 'eu-central-1'
});

const bucket = 'fotomadeksza';


const s3directAccessPhotoUrl = function (photo) {
    return `https://${bucket}.s3.amazonaws.com/${encodeURIComponent(photo.Key)}`
};

const cloudfrontResizedAccessPhotoUrl = function (photo, resizeOpts = {}) {
    const resizeParamsAsBase64 = Buffer.from(JSON.stringify({
        bucket: bucket,
        key: photo.Key,
        edits: resizeOpts
    })).toString('base64');
    return `https://doilzw5gpjurq.cloudfront.net/${resizeParamsAsBase64}`;
};

const s3galleryPhotoUrl = cloudfrontResizedAccessPhotoUrl;
hexo.extend.helper.register('s3galleryPhotoUrl', s3galleryPhotoUrl);
hexo.extend.helper.register('responsivePhoto', function (photo, attributes = {}) {
    const attrs = Object.keys(attributes).reduce((acc, cur) => acc.concat(`${cur}="${attributes[cur]}"`), []).join(' ');
    return `<img loading="lazy" srcset="${s3galleryPhotoUrl(photo, { resize: { width: 1000 } })} 1000w,
        ${s3galleryPhotoUrl(photo, { resize: { width: 800 } })} 800w,
        ${s3galleryPhotoUrl(photo, { resize: { width: 600 } })} 600w"
    src="${s3galleryPhotoUrl(photo)}"
    ${attrs}>
`
});

hexo.extend.generator.register('s3galleries', async function s3galleriesGenerator(locals) {
    const topLevelPrefixes = await s3.listObjectsV2({
        Bucket: bucket,
        Delimiter: '/'
    }).promise();

    const galleriesRoutes = await Promise.all(topLevelPrefixes.CommonPrefixes.map(async commonPrefix => {
        const objectsInGallery = await s3.listObjectsV2({
            Bucket: bucket,
            Prefix: commonPrefix.Prefix
        }).promise();

        const galleryName = commonPrefix.Prefix.replace(/^\d+\.?/g, '')
            .replace(/\/$/, '');

        const isNotFolder = obj => !/\/$/.test(obj.Key);
        const objects = objectsInGallery.Contents.filter(isNotFolder);
        const startObject = objects.find(o => /startowa/i.test(o.Key)) || objects[0];
        const galleryPath = `gallery/${kebabCase(galleryName)}/`;

        console.log('Generated gallery', galleryPath);
        return {
            path: galleryPath,
            data: {
                // avoid naming conflicts
                gallery: {
                    startPhoto: startObject,
                    photos: objects,
                    galleryName: galleryName
                }
            },
            layout: 'gallery'
        }
    }));

    locals.data.galleries = galleriesRoutes;

    return galleriesRoutes;
});

