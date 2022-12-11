"use strict";

class GrassRenderer extends DirectionalAndPointRenderer {

    setVertexAttributeArrays(model){
        super.setVertexAttributeArrays(model);

    }

    /**
    * Sets ALL uniforms for the vertex and fragment shader of this renderers shader program before drawing.
    * @param {ModelTransform} model the model to draw.
    * @param {Object} shaderData whatever other data the Shader needs for drawing.
    */
    setUniformData(model, camera, shaderData){
        super.setUniformData(model, camera, shaderData);

        //Grass data
        let heightLoc = gl.getUniformLocation(this.program, "u_height");
        gl.uniform1f(heightLoc, shaderData.height);

        let grassBottomLoc = gl.getUniformLocation(this.program, "u_grassBottom");
        gl.uniform1f(grassBottomLoc, shaderData.grassBottom);
        
        let waveDistanceLoc = gl.getUniformLocation(this.program, "u_waveDistance");
        gl.uniform1f(waveDistanceLoc, shaderData.waveDistance);
        
        let waveSpeedLoc = gl.getUniformLocation(this.program, "u_waveSpeed");
        gl.uniform1f(waveSpeedLoc, shaderData.waveSpeed);

        let timeLoc = gl.getUniformLocation(this.program, "u_time");
        gl.uniform1f(timeLoc, shaderData.time);
        
        let uvLoc = gl.getUniformLocation(this.program, "u_uv");
        gl.uniform2fv(uvLoc, shaderData.uv);

    }
}
