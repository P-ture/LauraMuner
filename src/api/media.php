<?php

$path = "../images/media";
$metaFile = 'meta.json';

$read = function($path) use ($metaFile) {

    return array_values(array_filter(scandir($path), function($file) use ($metaFile) {
        return $file != '.' && $file != '..' && $file != $metaFile;
    }));

};

$append = function ($slug) use ($path) {

    return function($file) use ($path, $slug) {
        return join(DIRECTORY_SEPARATOR, array(str_replace('../', '', $path), $slug, $file));
    };

};

$files = array_map(function($slug) use ($append, $path, $read, $metaFile) {

    $dir  = join(DIRECTORY_SEPARATOR, array($path, $slug));
    $meta = json_decode(file_get_contents(join(DIRECTORY_SEPARATOR, array($path, $slug, $metaFile))));


    return array_merge((array) $meta, [
        'slug'  => $slug,
        'media' => array_map($append($slug), $read($dir)),
        'meta'  => $meta
    ]);

}, $read($path));

header('content-type: text/json');
echo json_encode(array_values($files), JSON_UNESCAPED_SLASHES);
