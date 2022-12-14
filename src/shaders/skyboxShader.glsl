
#ifdef VERTEX_SHADER
// ------------------------------------------------------//
// ----------------- VERTEX SHADER ----------------------//
// ------------------------------------------------------//

//Position of vertex
attribute vec3 a_position;
varying vec3 v_texCoord;

uniform mat4 u_matrixV; 
uniform mat4 u_matrixP;
uniform mat4 u_matrixM;

uniform mat4 u_invMatrixV; 
uniform mat4 u_invMatrixP;
uniform mat4 u_invMatrixM;

uniform mat4 u_skyboxMatrix;

uniform vec3 u_cameraPos;

uniform float u_time;

void main() {
    
    v_texCoord = a_position;
    gl_Position = u_matrixP * u_matrixV * vec4(a_position + u_cameraPos, 1.0) + clamp((0.5 * sin(u_time/50.0)), -1.0, 1.0) ;//+ vec4(u_cameraPos, 1.0);
}

#endif
#ifdef FRAGMENT_SHADER
// ------------------------------------------------------//
// ----------------- Fragment SHADER --------------------//
// ------------------------------------------------------//

precision highp float; //float precision settings


varying vec3 v_texCoord;
uniform samplerCube u_skyboxTex;

void main(){
    gl_FragColor = textureCube(u_skyboxTex, (v_texCoord));
}

#endif
