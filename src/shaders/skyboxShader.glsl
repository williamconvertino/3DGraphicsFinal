
#ifdef VERTEX_SHADER
// ------------------------------------------------------//
// ----------------- VERTEX SHADER ----------------------//
// ------------------------------------------------------//

//Position of vertex
attribute vec4 a_position;
varying vec4 v_texCoord;

void main() {
    v_texCoord = a_position;
    gl_Position = a_position;
    gl_Position.z =  1.0;
}

#endif
#ifdef FRAGMENT_SHADER
// ------------------------------------------------------//
// ----------------- Fragment SHADER --------------------//
// ------------------------------------------------------//

precision highp float; //float precision settings


varying vec4 v_texCoord;
uniform samplerCube u_skyboxTex;

uniform mat4 u_skyboxMatrix;

void main(){
    vec4 t = u_skyboxMatrix * v_texCoord;
    gl_FragColor = textureCube(u_skyboxTex, normalize(t.xyz / t.w));
}

#endif
