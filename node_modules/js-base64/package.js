Package.describe({
    summary: "Yet another Base64 transcoder"
})

Package.on_use(function(api){
    api.export('Base64');

    api.add_files(['base64.js'], 'server');
});