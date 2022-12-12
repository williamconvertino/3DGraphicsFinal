"use strict";

class SkyboxRenderer extends Renderer {

    setVertexAttributeArrays(model){

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

        // Set projection matrices
        let viewProjMatLoc = gl.getUniformLocation(this.program, "u_invViewProjMatrix");
        gl.uniformMatrix4fv(viewProjMatLoc, false, projectionMatrix.toFloat32());
        
        //Set skybox texture
        gl.activeTexture(gl.TEXTURE0);
        let mainTexture = TextureCache["skybox"];
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, mainTexture);

        let skyboxTexLocation = gl.getUniformLocation(this.program, "u_skyboxTex");
        gl.uniform1i(skyboxTexLocation, 0);
    }

    drawModel(model, camera, shaderData){
        gl.useProgram(this.program);

        // set the arrtibute arrays and uniform data for this programs vertex and
        // fragment shader based on the models buffer data and material
        this.setVertexAttributeArrays(model);
        this.setUniformData(model, camera, shaderData);

        // draw call using index based triangle assembly (elements)
        //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.mesh.bufIndex);
        //gl.drawElements(model.mesh.drawMode, model.mesh.indexCount, gl.UNSIGNED_SHORT, 0);
        
        gl.drawArrays(gl.TRIANGLES, 0, 1 * 6);

        return this;
    }
}
