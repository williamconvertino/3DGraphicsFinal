
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

void main() {
    
    v_texCoord = (vec4 (a_position, 1)).xyz;
    gl_Position =  vec4(a_position, 1.0);
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
    gl_FragColor = textureCube(u_skyboxTex, v_texCoord);
}

#endif
