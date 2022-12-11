
#ifdef VERTEX_SHADER
// ------------------------------------------------------//
// ----------------- VERTEX SHADER ----------------------//
// ------------------------------------------------------//

//Position of vertex
attribute vec3 a_position;


//Tranformation data
uniform mat4 u_matrixM; 
uniform mat4 u_matrixV; 
uniform mat4 u_matrixP; 
uniform mat3 u_matrixInvTransM;

//Texture info
attribute vec2 a_texcoord;
varying vec2 v_texcoord;

//Grass UV
uniform vec2 u_uv;

//Grass info
uniform float u_height;
uniform float u_grassBottom;
uniform float u_waveDistance;
uniform float u_waveSpeed;
uniform float u_time;


void main() {
    
    //Texture setup
    v_texcoord = a_texcoord;

    vec3 finalPosition = a_position;
    float relativeHeight = a_position.y - u_grassBottom;
    float centerHeight = u_height / 2.0;
    if (relativeHeight > centerHeight) {
        //finalPosition.x += sin((u_time / 500.0) + (u_uv.x * u_waveDistance)) * (relativeHeight - centerHeight);
        finalPosition.x += sin(pow(u_time * u_waveSpeed, 0.8) + (u_uv.x * u_uv.y)) * u_waveDistance * ((relativeHeight - centerHeight)/u_height);
    }

    //Calculate vertex position
    gl_Position = u_matrixP * u_matrixV * u_matrixM * vec4 (finalPosition, 1);
}

#endif
#ifdef FRAGMENT_SHADER
// ------------------------------------------------------//
// ----------------- Fragment SHADER --------------------//
// ------------------------------------------------------//

precision highp float; //float precision settings

uniform vec3 u_tint;

//Texture info
uniform sampler2D u_mainTex;
varying vec2 v_texcoord;

void main(void){

    vec3 baseColor = texture2D(u_mainTex, v_texcoord).rgb;
    vec3 finalColor = baseColor * u_tint;
    gl_FragColor = vec4(finalColor, 1);
}

#endif
