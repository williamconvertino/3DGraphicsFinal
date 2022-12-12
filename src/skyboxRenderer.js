"use strict";

class SkyboxRenderer extends Renderer {

    setVertexAttributeArrays(model){
        //super.setVertexAttributeArrays(model);
        let skyboxCoords = new Float32Array(
            [
                -1, -1, 
                1, -1, 
                -1,  1, 
                -1,  1,
                1, -1,
                1,  1,
            ]);

        let positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, skyboxCoords, gl.STATIC_DRAW)

        let posAttribLoc = gl.getAttribLocation(this.program, "a_position");
        gl.enableVertexAttribArray(posAttribLoc);

        gl.vertexAttribPointer(posAttribLoc,2,gl.FLOAT,false,0,0);
    }

    /**
    * Sets ALL uniforms for the vertex and fragment shader of this renderers shader program before drawing.
    * @param {ModelTransform} model the model to draw.
    * @param {Object} shaderData whatever other data the Shader needs for drawing.
    */
    setUniformData(model, camera, shaderData){

        let viewMatrix = camera.viewMatrix;
        let projectionMatrix = camera.projectionMatrix;

        // // set model, view and projection matrices in the vertex shader
        // let modelMatrixLoc = gl.getUniformLocation(this.program, "u_matrixM");
        // gl.uniformMatrix4fv(modelMatrixLoc, false, model.modelMatrix.toFloat32());
        // let viewMatrixLoc = gl.getUniformLocation(this.program, "u_matrixV");
        // gl.uniformMatrix4fv(viewMatrixLoc, false, viewMatrix.toFloat32());
        // let projMatrixLoc = gl.getUniformLocation(this.program, "u_matrixP");
        // gl.uniformMatrix4fv(projMatrixLoc, false, projectionMatrix.toFloat32());

        
        // // set model, view and projection matrices in the vertex shader
        // let modelMatrixLocInv = gl.getUniformLocation(this.program, "u_invMatrixM");
        // gl.uniformMatrix4fv(modelMatrixLocInv, false, M4.invert(model.modelMatrix).toFloat32());
        // let viewMatrixLocInv = gl.getUniformLocation(this.program, "u_invMatrixV");
        // gl.uniformMatrix4fv(viewMatrixLocInv, false, M4.invert(viewMatrix).toFloat32());
        // let projMatrixLocInv = gl.getUniformLocation(this.program, "u_invMatrixP");
        // gl.uniformMatrix4fv(projMatrixLocInv, false, M4.invert(projectionMatrix).toFloat32());
        
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
        //super.drawModel(model, camera, shaderData);
        
        
        gl.useProgram(this.program);

        // set the arrtibute arrays and uniform data for this programs vertex and
        // fragment shader based on the models buffer data and material
        this.setVertexAttributeArrays(model);
        this.setUniformData(model, camera, shaderData);

        // draw call using index based triangle assembly (elements)
        //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.mesh.bufIndex);
        //gl.drawElements(model.mesh.drawMode, model.mesh.indexCount, gl.UNSIGNED_SHORT, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 1 * 6);
        
        gl.enable(gl.DEPTH_TEST);
        return this;
    }
}
