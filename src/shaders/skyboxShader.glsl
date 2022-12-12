
#ifdef VERTEX_SHADER
// ------------------------------------------------------//
// ----------------- VERTEX SHADER ----------------------//
// ------------------------------------------------------//

//Position of vertex
attribute vec4 a_position;
varying vec4 v_position;

void main() {
    
    //Sets vertex position
    //NOTE: No transformations needed, skybox should already be in clip space
    v_position = a_position;
    gl_Position = a_position;

    //z=1 ensures we have the furthest depth
    gl_Position.z = 1.0;
}

#endif
#ifdef FRAGMENT_SHADER
// ------------------------------------------------------//
// ----------------- Fragment SHADER --------------------//
// ------------------------------------------------------//

precision highp float; //float precision settings

varying vec4 v_position;

uniform mat4 u_invViewProjMatrix;
uniform samplerCube u_skyboxTex;


void main(void){

    vec4 projectedPosition = u_invViewProjMatrix * v_position;
    gl_FragColor = textureCube(u_skyboxTex, normalize(projectedPosition.xyz / projectedPosition.w));
}

#endif
