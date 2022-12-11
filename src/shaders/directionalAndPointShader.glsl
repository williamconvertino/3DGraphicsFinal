
#ifdef VERTEX_SHADER
// ------------------------------------------------------//
// ----------------- VERTEX SHADER ----------------------//
// ------------------------------------------------------//

//Position of vertex
attribute vec3 a_position;

//Normal vector info
attribute vec3 a_normal;
varying vec3 v_normal;

//Tranformation data
uniform mat4 u_matrixM; 
uniform mat4 u_matrixV; 
uniform mat4 u_matrixP; 
uniform mat3 u_matrixInvTransM;

//Lighting info
uniform vec3 u_pointLight;
uniform vec3 u_cameraPosition;
varying vec3 v_surfaceToView;
varying vec3 v_surfaceToLight;

//Texture info
attribute vec2 a_texcoord;
varying vec2 v_texcoord;

void main() {
    
    //Lighting setup
    v_normal = normalize(u_matrixInvTransM * a_normal);

    vec3 surfaceWorldPos = (u_matrixM * vec4 (a_position, 1)).xyz;
    v_surfaceToView = u_cameraPosition - surfaceWorldPos;
    v_surfaceToLight = u_pointLight - surfaceWorldPos;

    //Texture setup
    v_texcoord = a_texcoord;

    //Calculate vertex position
    gl_Position = u_matrixP * u_matrixV * u_matrixM * vec4 (a_position, 1);
}

#endif
#ifdef FRAGMENT_SHADER
// ------------------------------------------------------//
// ----------------- Fragment SHADER --------------------//
// ------------------------------------------------------//

precision highp float; //float precision settings

uniform vec3 u_tint;

//Lighting settings
uniform float u_shininess;
uniform float u_specularIntensity;

//Directional light
uniform vec3 u_directionalLight;
uniform vec3 u_directionalColor;
uniform vec3 u_pointColor;
uniform vec3 u_ambientColor;

//Point light
varying vec3 v_normal;
varying vec3 v_surfaceToView;
varying vec3 v_surfaceToLight;

//Texture info
uniform sampler2D u_mainTex;
varying vec2 v_texcoord;

void main(void){

    //Directional
    vec3 normal = normalize(v_normal);

    vec3 surfaceToLightDir = -normalize(u_directionalLight);
    vec3 surfaceToViewDir = normalize(v_surfaceToView);
    vec3 halfVector = normalize(surfaceToLightDir + surfaceToViewDir);

    float dIntensity = max(0.0, dot(normal, -u_directionalLight));
    vec3 dColor = u_directionalColor * dIntensity;

    vec3 finalColor = clamp(u_ambientColor + dColor, vec3(0.0,0.0,0.0), vec3(1.0,1.0,1.0));

    float specular = 0.0;
    if (dIntensity > 0.0) {
        specular = pow(dot(normal, halfVector), u_shininess);
    }

    //Point
    
    vec3 pointSurfaceToLightDir = normalize(v_surfaceToLight);
    vec3 pointSurfaceToViewDir = normalize(v_surfaceToView);
    vec3 pointHalfVector = normalize(pointSurfaceToLightDir + pointSurfaceToViewDir);

    float pointdIntensity = max(0.0, dot(normal, v_surfaceToLight));
    vec3 pointdColor = u_pointColor * pointdIntensity;
    finalColor += clamp(u_ambientColor + pointdColor, vec3(0.0,0.0,0.0), vec3(1.0,1.0,1.0));
    finalColor *= u_tint.rgb * texture2D(u_mainTex, v_texcoord).rgb;

    float pointspecular = 0.0;
    if (pointdIntensity > 0.0) {
        pointspecular = pow(dot(normal, pointHalfVector), u_shininess);
    }
    if (dColor.rgb != vec3(0.0,0.0,0.0)) {
        finalColor.rgb += specular * u_specularIntensity;
    }
    if (pointdColor.rgb != vec3(0.0,0.0,0.0)) {
        finalColor.rgb += pointspecular * u_specularIntensity;
    }
    gl_FragColor = vec4(finalColor, 1);
}

#endif
