"use strict";

class DirectionalAndPointRenderer extends Renderer {

    setVertexAttributeArrays(model){
        super.setVertexAttributeArrays(model);

        //Set normals
        gl.bindBuffer(gl.ARRAY_BUFFER, model.mesh.normalBuffer);
        let normAttribLoc = gl.getAttribLocation(this.program, "a_normal");
        gl.enableVertexAttribArray(normAttribLoc);
        gl.vertexAttribPointer(normAttribLoc,3,gl.FLOAT,false,0,0);

        //Texture data
        gl.bindBuffer(gl.ARRAY_BUFFER, model.mesh.texcoordBuffer);
        let texcoordAttribLoc = gl.getAttribLocation(this.program, "a_texcoord");
        gl.enableVertexAttribArray(texcoordAttribLoc);
        gl.vertexAttribPointer(texcoordAttribLoc,2,gl.FLOAT,false,0,0);
    }

    /**
    * Sets ALL uniforms for the vertex and fragment shader of this renderers shader program before drawing.
    * @param {ModelTransform} model the model to draw.
    * @param {Object} shaderData whatever other data the Shader needs for drawing.
    */
    setUniformData(model, camera, shaderData){
        super.setUniformData(model, camera, shaderData);

        //Transform data for lighting
        let matrixInvLoc = gl.getUniformLocation(this.program, "u_matrixInvTransM");
        gl.uniformMatrix3fv(matrixInvLoc, false, M4.inverseTranspose3x3(model.modelMatrix).toFloat32());

        //Lighting data
        let directionalLight = shaderData.lightingData.directionalLight;
        let directionalColor = shaderData.lightingData.directionalColor;
        let pointPosition = shaderData.lightingData.pointPosition;
        let pointColor = shaderData.lightingData.pointColor;
        let ambientColor = shaderData.lightingData.ambientColor;

        //Point lighting
        let pointPosLoc = gl.getUniformLocation(this.program, "u_pointLight");
        gl.uniform3fv(pointPosLoc, pointPosition.toFloat32());

        let pointColorLoc = gl.getUniformLocation(this.program, "u_pointColor");
        gl.uniform3fv(pointColorLoc, pointColor.toFloat32());

        //Directional lighting
        let dirLightLoc = gl.getUniformLocation(this.program, "u_directionalLight");
        gl.uniform3fv(dirLightLoc, directionalLight.toFloat32());

        let dirColorLoc = gl.getUniformLocation(this.program, "u_directionalColor");
        gl.uniform3fv(dirColorLoc, directionalColor.toFloat32());
        
        let ambientColorLoc = gl.getUniformLocation(this.program, "u_ambientColor");
        gl.uniform3fv(ambientColorLoc, ambientColor.toFloat32());
        
        let cameraPositionLoc = gl.getUniformLocation(this.program, "u_cameraPosition");
        gl.uniform3fv(cameraPositionLoc, camera.getPosition().toFloat32());

        let shininessLoc = gl.getUniformLocation(this.program, "u_shininess");
        gl.uniform1f(shininessLoc, model.material.shininess);

        let specularIntLoc = gl.getUniformLocation(this.program, "u_specularIntensity");
        gl.uniform1f(specularIntLoc, model.material.specularIntensity);

        //Texture data
        gl.activeTexture(gl.TEXTURE0);
        let mainTexture = TextureCache[model.material.mainTexture];
        gl.bindTexture(gl.TEXTURE_2D, mainTexture);
        let mainTextureLoc = gl.getUniformLocation(this.program, "u_mainTex");
        gl.uniform1i(mainTextureLoc, 0);

    }
}
