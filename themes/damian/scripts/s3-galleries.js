const S3 = require("aws-sdk/clients/s3");
const { kebabCase } = require("lodash/string");
const s3 = new S3({
    region: 'eu-central-1'
});


const bucket = 'fotomadeksza';

hexo.extend.helper.register('s3galleryPhotoUrl', function s3galleryPhotoUrl(photo) {
    return `https://${bucket}.s3.amazonaws.com/${encodeURIComponent(photo.Key)}`
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

        const objects = objectsInGallery.Contents;
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

