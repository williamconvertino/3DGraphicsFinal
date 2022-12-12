"use strict";

class SkyboxRenderer extends Renderer {

    setVertexAttributeArrays(model){
        super.setVertexAttributeArrays(model);
    }

    /**
    * Sets ALL uniforms for the vertex and fragment shader of this renderers shader program before drawing.
    * @param {ModelTransform} model the model to draw.
    * @param {Object} shaderData whatever other data the Shader needs for drawing.
    */
    setUniformData(model, camera, shaderData){

        let viewMatrix = camera.viewMatrix;
        let projectionMatrix = camera.projectionMatrix;

        // set model, view and projection matrices in the vertex shader
        let modelMatrixLoc = gl.getUniformLocation(this.program, "u_matrixM");
        gl.uniformMatrix4fv(modelMatrixLoc, false, model.modelMatrix.toFloat32());
        let viewMatrixLoc = gl.getUniformLocation(this.program, "u_matrixV");
        gl.uniformMatrix4fv(viewMatrixLoc, false, viewMatrix.toFloat32());
        let projMatrixLoc = gl.getUniformLocation(this.program, "u_matrixP");
        gl.uniformMatrix4fv(projMatrixLoc, false, projectionMatrix.toFloat32());

        
        // set model, view and projection matrices in the vertex shader
        let modelMatrixLocInv = gl.getUniformLocation(this.program, "u_invMatrixM");
        gl.uniformMatrix4fv(modelMatrixLocInv, false, M4.invert(model.modelMatrix).toFloat32());
        let viewMatrixLocInv = gl.getUniformLocation(this.program, "u_invMatrixV");
        gl.uniformMatrix4fv(viewMatrixLocInv, false, M4.invert(viewMatrix).toFloat32());
        let projMatrixLocInv = gl.getUniformLocation(this.program, "u_invMatrixP");
        gl.uniformMatrix4fv(projMatrixLocInv, false, M4.invert(projectionMatrix).toFloat32());
        
        let skyboxMatrixLoc = gl.getUniformLocation(this.program, "u_skyboxMatrix");
        gl.uniformMatrix4fv(skyboxMatrixLoc, false, M4.invert(M4.multM4( projectionMatrix, viewMatrix)).toFloat32());

        //Set skybox texture
        gl.activeTexture(gl.TEXTURE0);
        let mainTexture = TextureCache["skybox"];
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, mainTexture);

        let skyboxTexLocation = gl.getUniformLocation(this.program, "u_skyboxTex");
        gl.uniform1i(skyboxTexLocation, 0);
    }
    drawModel(model, camera, shaderData){
        gl.disable(gl.DEPTH_TEST);
        super.drawModel(model, camera, shaderData);
        gl.enable(gl.DEPTH_TEST);
        return this;
    }
}
