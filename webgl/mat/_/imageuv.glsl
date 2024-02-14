/*
    Resize image to Cover
    uv : uv coord
    size : image size
    resolution : plane resolution | screen resolution
*/

vec2 imageUv(vec2 uv, vec2 size, vec2 resolution) {
    vec2 ratio = vec2(
        min((resolution.x / resolution.y) / (size.x / size.y), 1.0),
        min((resolution.y / resolution.x) / (size.y / size.x), 1.0)
    );

    return vec2(
        uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
}

vec2 imageUv(vec2 uv, vec2 size, vec2 resolution, float scale) {
    vec2 scaledSize = size * scale;
    vec2 ratio = vec2(
      min((resolution.x / resolution.y) / (scaledSize.x / scaledSize.y), 1.0),
      min((resolution.y / resolution.x) / (scaledSize.y / scaledSize.x), 1.0)
    );

    vec2 centeredUV = (uv - 0.5) * scale + 0.5;

    return vec2(
      centeredUV.x * ratio.x + (1.0 - ratio.x) * 0.5,
      centeredUV.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
}